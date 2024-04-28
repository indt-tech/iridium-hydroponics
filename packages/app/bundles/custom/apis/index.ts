import {Protofy} from 'protolib/base';
import lightAutoApi from "./lightAuto";
import buoyAutoApi from "./buoyAuto";
import phAutoApi from "./phAuto";
import nutrinetsAutoApi from "./nutrinetsAuto";
import FilltankApi from "./filltank";
import PhotoperiodApi from "./photoperiod";
const autoApis = Protofy("apis", {
    Filltank: FilltankApi,
    Photoperiod: PhotoperiodApi
})

export default (app, context) => {
    Object.keys(autoApis).forEach((k) => {
        autoApis[k](app, context)
    })
}