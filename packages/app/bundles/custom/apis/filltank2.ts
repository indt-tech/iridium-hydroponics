/*

app is an express object, you can use app.get/app.post to create new endpoints
you can define newendpoints like:

app.get('/api/v1/testapi', (req, res) => {
    //you code goes here
    //reply with res.send(...)
})

the session argument is a session object, with the following shape:
{
    user: { admin: boolean, id: string, type: string },
    token: string,
    loggedIn: boolean
}

use the chat if in doubt
*/

import { getAuth } from "protolib/api";
import { Protofy, API } from "protolib/base";
import { getLogger } from "protolib/base";
import { Application } from "express";
import fs from "fs";
import path from "path";

const root = path.join(process.cwd(), "..", "..");
const logger = getLogger();

Protofy("type", "CustomAPI");

export default Protofy("code", async (app: Application, context) => {
  context.deviceSub(
    "mydevice",
    "floatswitch",
    "status",
    async (message, topic, done) =>
      context.flow.switch(
        message,
        "ON",
        "equals",
        async () => await context.deviceAction("mydevice", "growingleds", "on"),
        async () =>
          await context.deviceAction("mydevice", "growingleds", "off"),
        null
      )
  );
});
