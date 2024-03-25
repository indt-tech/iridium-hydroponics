import { useSubscription } from 'mqtt-react-hooks'

export const useEvent = (eventFilter) => {
    const { message } = useSubscription('notifications/event/create/#')

    if (message && message.message && eventFilter) {
        try {
            let content = JSON.parse(message.message as string)
            if (eventFilter.path && content['path'] != eventFilter.path) {
                return
            }
            if (eventFilter.from && content['from'] != eventFilter.from) {
                return
            }
            return message;
        } catch (e) {
            console.error('Error parsing message from mqtt: ', e)
        }
    }

    return message
}