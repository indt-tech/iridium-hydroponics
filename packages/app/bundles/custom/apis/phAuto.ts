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
  //PUT YOUR API HERE
  //context.devicePub function allows to communicate with devices via mqtt
  //context.deviceSub allows to receive notifications from devices via mqtt
  //app is a normal expressjs object
  //context.mqtt is a mqttclient connection
  context.automation(
    app,
    async (params) => {
      const minPh = 5;
      const maxPh = 7;
      context.deviceSub(
        "firstgarden1712826191339",
        "phectemp",
        "Ph",
        async (message, topic) => {
          context.sensorRangeEnforcer(
            "",
            "",
            "",
            context,
            "6.3",
            "0.7",
            async (delta) =>
              await context.deviceAction(
                "firstgarden1712826191339",
                "phminus",
                "pulsed_on",
                "1000"
              ),
            async (delta) =>
              await context.deviceAction(
                "firstgarden1712826191339",
                "phplus",
                "pulsed_on",
                "1000"
              ),
            null
          );
        }
      );
    },
    "PhAuto"
  );
  app.get("/api/v1/off", async (req, res) => {
    await context.deviceAction(
      "mysecondplantation1712595061179",
      "phplus",
      "off"
    );
    await context.deviceAction(
      "mysecondplantation1712595061179",
      "phminus",
      "off"
    );
    res.send("OK");
  });
});
