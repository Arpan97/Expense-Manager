import { TOTAL_INCOME } from "../ActionType/ActionType";

const initialState = []

export const totalAmtReducer = (state = initialState, action) => {
    switch(action.type){
        case TOTAL_INCOME:
            return action.payload
        default:
            return state
    }
}