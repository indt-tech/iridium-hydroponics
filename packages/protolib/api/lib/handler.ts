
import type {Request, RequestHandler, Response} from 'express';
import {ZodError} from "protolib/base";
import {createSession, SessionDataType} from './session';
import {verifyToken} from './crypt';
import { getLogger } from '../../base';

const logger = getLogger()

type Handler = (
    fn: (req: Request, res: Response, session: SessionDataType, next: any) => Promise<void> | void
) => RequestHandler;

export const handler: Handler = fn => async (req:any, res:any, next:any) => {
    //try to recover identify from token
    let decoded;
    let session;
    try {
        session = JSON.parse(req.cookies.session)
    } catch(e) {
        session = null
    }

    var token = '';
    if(req.query.token || (session && session.token)) {
        token = req.query.token ? req.query.token : session.token
        try {
            decoded = createSession(verifyToken(token))
        } catch(error) {
            logger.error({ error }, "Error reading token")
            decoded = createSession()
        }
    } else {
        createSession()
    }
    try {
        await fn(req, res, {...decoded, token: token}, next);
    } catch (e:any) {
        if (e instanceof ZodError) {
            const err = e.flatten()
            res.status(500).send(err)
            return;
        }
        if(e.toString() == 'E_PERM') {
            res.status(403).send({error: e.toString()})
        } else if(e.toString() == 'E_AUTH') {
            res.status(401).send({error: e.toString()})
        } else {
            res.status(500).send({error: e.toString()})
        }
    }
};