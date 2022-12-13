import { CHECK_PREMIUM } from "../ActionType/ActionType";

const initialState = []

export const premiumReducer = (state = initialState, action) => {
    switch(action.type){
        case CHECK_PREMIUM:
            return action.payload
        default:
            return state
    }
}