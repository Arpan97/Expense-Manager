import { DELETE_INVESTMENT, INVESTMENT, UPDATE_INVESTMENT } from "../ActionType/ActionType";

const initialState = []

export const investmentReducer = (state = initialState, action) => {
    switch(action.type){
        case INVESTMENT:
            return [...state, action.payload]
        case UPDATE_INVESTMENT:
            data = state;
            for(let i=0; i < data.length; i++){
                if(data[i].id === action.payload.id){
                    data[i].id = action.payload.id
                    data[i].investment_title = action.payload.investment_title;
                    data[i].investment_amount = action.payload.investment_amount;
                    data[i].investment_date = action.payload.investment_date;
                    data[i].investment_type = action.payload.investment_type;
                    data[i].investment_platform = action.payload.investment_platform;
                }
            }
            return [...data]
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