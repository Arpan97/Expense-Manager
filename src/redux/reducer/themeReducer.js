import { DARK_MODE } from "../ActionType/ActionType"

export const themeReducer = (state = false, action) => {
    switch(action.type){
        case DARK_MODE: return action.payload
        default: return state
    }
}
