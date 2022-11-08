import { ADD_GOAL, DELETE_GOAL } from "../ActionType/ActionType";

const initialState = []

export const goalReducer = (state = initialState, action) =>{
    switch(action.type){
        case ADD_GOAL:
            return [...state,action.payload]
        
        case DELETE_GOAL:
            data = state;
            i = data.findIndex(item => item.id == action.payload);
            if(i >= 0){
                data.splice(i,1)
            }
            return [...data]


        default:
            return state
    }
}