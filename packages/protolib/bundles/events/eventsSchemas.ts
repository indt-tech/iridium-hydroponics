import { z } from "protolib/base";
import { Protofy } from 'protolib/base'
import { Schema, BaseSchema } from 'protolib/base'
import moment from "moment";
import { AutoModel } from 'protolib/base'
import { SessionDataType } from "../../api";
import { ProtoModel } from "../../base";
import { DatabaseEntryModel, DatabaseEntrySchema } from "../databases";

export const BaseEventSchema = z.object(Protofy("schema", {
    path: z.string().search(), //event type: / separated event category: files/create/file, files/create/dir, devices/device/online
    from: z.string().search(), // system entity where the event was generated (next, api, cmd...)
    user: z.string().generate((obj) => 'me').search(), // the original user that generates the action, 'system' if the event originated in the system itself
    payload: z.record(z.string(), z.any()).search(), // event payload, event-specific data
    created: z.string().generate((obj) => moment().toISOString()).search(), // event date (iso)
}))

export const EventSchema = z.object({
    ...BaseSchema.shape,
    ...BaseEventSchema.shape
});

export type EventType = z.infer<typeof EventSchema>;
export class EventModel extends ProtoModel<EventModel> {
    constructor(data: EventType, session?: SessionDataType) {
        super(data, EventSchema, session, "Event");
    }

	list(search?, session?, extraData?, params?): any {
        if(params) {
            const {itemsPerPage, page, orderBy, orderDirection, search, ...filters} = params

            const allFiltersMatch = Object.keys(filters).every(key => {
                return this.data && this.data[key] == filters[key];
            });

            if(!allFiltersMatch) return
        }
        if(search) {
			if(JSON.stringify(this.data).toLowerCase().includes(search.toLowerCase())) {
				return this.read()
			}
        } else {
            return this.read();
        }
    }

    protected static _newInstance(data: any, session?: SessionDataType): EventModel {
        return new EventModel(data, session);
    }
}
