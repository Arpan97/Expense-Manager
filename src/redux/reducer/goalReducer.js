import { ADD_GOAL, DELETE_GOAL, UPDATE_GOAL } from "../ActionType/ActionType";

const initialState = []

export const goalReducer = (state = initialState, action) =>{
    switch(action.type){
        case ADD_GOAL:
            return [...state,action.payload]
        
        case UPDATE_GOAL:
            data = state;
            for(let i=0; i < data.length; i++){
                if(data[i].id === action.payload.id){
                    data[i].title = action.payload.title;
                    data[i].status = action.payload.status;
                    data[i].imgSet = action.payload.imgSet;
                    data[i].amount = action.payload.amount
                }
            }
            return [...data]
        
        case DELETE_GOAL:
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