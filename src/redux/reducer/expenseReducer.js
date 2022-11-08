import {ADD_EXPENSE, DELETE_EXPENSE} from '../ActionType/ActionType';

const initialState = [];

export const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
        return [...state, action.payload]
    case DELETE_EXPENSE:
        data = state
        i = data.findIndex(item => item.id == action.payload)
        if( i >= 0){
            data.splice(i,1)
        }
        return [...data]
    default:
        return state
  }
};