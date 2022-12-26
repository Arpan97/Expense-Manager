import { ACCOUNTS, DELETE_ACCOUNT, UPDATE_DEBIT } from "../ActionType/ActionType";

const initialState = []

export const account_reducer = (state = initialState, action) => {
    switch(action.type){
        case ACCOUNTS:
            return [...state,action.payload]
        case UPDATE_DEBIT:
            data = state;
            for(let i=0; i < data.length; i++){
                if(data[i].id === action.payload.id){
                    data[i].id = action.payload.id
                    data[i].title = action.payload.title;
                    data[i].openingAmt = action.payload.openingAmt;
                    data[i].totalIncome = action.payload.totalIncome;
                    data[i].totalExpense = action.payload.totalExpense;
                    data[i].totalBal = action.payload.totalBal;
                    data[i].accHolder = action.payload.accHolder;
                    data[i].cardNum = action.payload.cardNum;
                    data[i].expiryDate = action.payload.expiryDate;
                    data[i].accNo = action.payload.accNo;
                    data[i].cvv = action.payload.cvv;
                    data[i].cardImage = action.payload.cardImage;
                    data[i].img = action.payload.img
                }
            }
            return [...data]
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