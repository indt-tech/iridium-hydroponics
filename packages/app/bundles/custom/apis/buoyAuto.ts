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
      context.onEvent(
        context,
        async (event) => {
          if (event.payload.message == "OFF") {
            await context.deviceAction(
              "mysecondplantation1712595061179",
              "freshwater",
              "on"
            );
          } else {
            await context.deviceAction(
              "mysecondplantation1712595061179",
              "freshwater",
              "off"
            );
          }
        },
        "binary_sensor/buoy/state",
        "device"
      );
      let monitorValue = await context.deviceMonitor(
        "mysecondplantation1712595061179",
        "buoy",
        "status"
      );
      if (monitorValue.value == "OFF") {
        await context.deviceAction(
          "mysecondplantation1712595061179",
          "freshwater",
          "on"
        );
      }

      logger.info({ monitorValue }, "papupi");
    },
    "BuoyAuto"
  );
  app.get("/api/v1/off", async (req, res) => {
    await context.deviceAction(
      "mysecondplantation1712595061179",
      "freshwater",
      "off"
    );
    res.send("OK");
  });
});
