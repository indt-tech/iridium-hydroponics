import { z } from "protolib/base";
import { Schema } from 'protolib/base'
import { AutoModel } from 'protolib/base'

export const DeviceDefinitionSchema = Schema.object({
  name: z.string().hint("Protofy screen controller...").static().id(),
  board: z.string().hidden(),
  sdk: z.string().hidden(),
  subsystems: z.record(z.string(), z.any()).optional().hidden(),
  config: z.record(z.string(), z.any()),
})
export type DeviceDefinitionType = z.infer<typeof DeviceDefinitionSchema>;
export const DeviceDefinitionModel = AutoModel.createDerived<DeviceDefinitionType>("DeviceDefinitionModel", DeviceDefinitionSchema); 