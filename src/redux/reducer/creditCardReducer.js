import { DELETE_CREDIT, SAVE_CARD } from "../ActionType/ActionType";

const initialState = []

export const creditCardReducer = (state = initialState, action) => {
    switch(action.type){
        case SAVE_CARD:
            return [...state, action.payload]
        case DELETE_CREDIT:
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