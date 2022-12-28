import { LANG_CHANGE } from "../ActionType/ActionType";

const initialState = []

export const languageReducer = (state = initialState, action) => {
    switch(action.type){
        case LANG_CHANGE:
            return action.payload
        default:
            return state
    }
}