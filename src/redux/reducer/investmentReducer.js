import { DELETE_INVESTMENT, INVESTMENT } from "../ActionType/ActionType";

const initialState = []

export const investmentReducer = (state = initialState, action) => {
    switch(action.type){
        case INVESTMENT:
            return [...state, action.payload]
        case DELETE_INVESTMENT:
            let data = state;
            let i = data.findIndex(item => item.id == action.payload);
            if(i >= 0){
                data.splice(i,1)
            }
            return [...data]
        default:
            return state
    }
}