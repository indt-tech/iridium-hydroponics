import {IntentType} from 'protolib'
import {processFilesIntent} from 'protolib/bundles/files/intents'

export const useIntent = (intent: IntentType) => {
    let response;

    //add your intents here
    response = processFilesIntent(intent)
    if(response) return response
}