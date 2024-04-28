import { getServiceToken } from 'protolib/api/lib/serviceToken'
import { API } from "protolib/base";
import {getLogger } from 'protolib/base';

const logger = getLogger()

export const automationResponse = (res, data) => {
    res.send({result: data})
}

export const automation = (app, cb, name, disableAutoResponse?)=>{
    if(!name) {
        console.error("Automation name is required, doing nothing")
        return
    }

    if(!cb) {
        console.error("Automation callback is required, doing nothing")
        return
    }

    const url = "/api/v1/automations/"+name;

    app.get(url, async (req,res)=>{
        logger.info({name, params: req.query}, "Automation executed: "+name)
        await cb(req.query, res)
        if(!disableAutoResponse) {
            automationResponse(res, "Automation executed")
        }
    })
}

export const fetch = async (method, url, data={}, cb, errorCb, hasSarviceToken=false)=>{
    var urlEnch = url
    if(hasSarviceToken) {
        urlEnch = url.includes("?")? `${url}&token=${getServiceToken()}`: `${url}?token=${getServiceToken()}`
    }
    
    let result
    if(method == "get") {
        result = await API.get(urlEnch)
    } else {
        result = await API.post(urlEnch, data)
    }

    if(result.isError) {
        if(errorCb) errorCb(result.error)
        throw result.error
    }

    if(cb) cb(result.data)
    return result.data
}

export const deviceMonitor = async (device, subsystem, monitor) => {
    const url = `/adminapi/v1/devices/${device}/subsystems/${subsystem}/monitors/${monitor}?token=${getServiceToken()}`
    let result = await API.get(url)
    if (result.isError) {
        throw result.error
    }
    return result.data?.value ?? result.data
}

export {deviceAction} from './DeviceAction'