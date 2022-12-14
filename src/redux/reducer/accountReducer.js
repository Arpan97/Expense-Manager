import { ACCOUNTS, DELETE_ACCOUNT } from "../ActionType/ActionType";

const initialState = []

export const account_reducer = (state = initialState, action) => {
    switch(action.type){
        case ACCOUNTS:
            return [...state,action.payload]
        case DELETE_ACCOUNT:
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