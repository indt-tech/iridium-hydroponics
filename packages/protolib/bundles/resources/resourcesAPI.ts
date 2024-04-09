import { ResourceModel } from "./";
import { AutoAPI } from '../../api'

export const ResourcesAPI = AutoAPI({
    modelName: 'resources',
    modelType: ResourceModel,
    prefix: '/adminapi/v1/',
    dbName: 'resources',
    requiresAdmin: ['create', 'update']
})