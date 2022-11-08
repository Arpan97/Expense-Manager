import { SAVE_USER } from "../ActionType/ActionType";

const initialState = []

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_USER:
            return action.payload
        
        default:
            return state
    }
}