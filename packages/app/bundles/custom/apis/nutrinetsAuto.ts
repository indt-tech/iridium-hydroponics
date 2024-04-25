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
      const ml = 1;
      const minEc = 0.5;
      const maxEc = 1.5;
      const nutrients = [
        {
          peristaltic: "producta",
          name: "BLOOM",
          npkRatio: [0, 5, 4],
          ratio: 3,
        },

        {
          peristaltic: "productb",
          name: "MICRO",
          npkRatio: [5, 0, 1],
          ratio: 1,
        },

        {
          peristaltic: "productc",
          name: "K",
          npkRatio: [0, 0, 20],
          ratio: 0.5,
        },
      ];
      const msPerMl = 10000 / 2.1;
      const convertMlToMs = (ml) => {
        return ml * msPerMl;
      };
      let ratioSum = 0;
      nutrients.forEach((nutrient) => {
        ratioSum += nutrient.ratio;
      });
      context.deviceSub(
        "firstgarden1712826191339",
        "phectemp",
        "EC",
        async (message, topic) =>
          context.sensorRangeEnforcer(
            "firstgarden1712826191339",
            "phectemp",
            "EC",
            context,
            "0.8",
            "0.2",
            async (delta) =>
              await context.deviceAction(
                "firstgarden1712826191339",
                "freshwater",
                "pulsed_on",
                "1000"
              ),
            async (delta) => {
              nutrients.map(async (nutrient) => {
                const result = Number(
                  ((ml * nutrient.ratio) / ratioSum).toFixed(2)
                );
                const duration = result ? convertMlToMs(result) : 1000;
                await context.deviceAction(
                  "firstgarden1712826191339",
                  nutrient.peristaltic,
                  "pulsed_on",
                  duration
                );
              });
            },
            null
          )
      );
    },
    "NutrinetsAuto"
  );
});
