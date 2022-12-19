import { GOAL_DEPOSIT } from "../ActionType/ActionType";

const initialState = []

export const goalDepositReducer = (state = initialState, action) => {
    switch(action.type){
        case GOAL_DEPOSIT:
            return [...state,action.payload]

        default:
            return state
    }
}