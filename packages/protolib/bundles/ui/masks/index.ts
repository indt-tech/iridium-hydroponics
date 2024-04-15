import { actionFetch } from "./actionFetch";
import { actionNavigate } from "./actionNavigate";
import { navigate } from "./navigate";
import { setCurrentView } from "./changeCurrentView";
import onRender from "./onRender";
import uiMasks from "./uiMasks.json"

export default {
    dynamic: [
        ...uiMasks,
        actionFetch,
        actionNavigate,
        setCurrentView,
        navigate
    ],
    code: [
        onRender
    ]
}