import { combineReducers } from "redux";
import { expenseReducer } from "./expenseReducer";
import { goalReducer } from "./goalReducer";
import { totalAmtReducer } from "./totalAmtReducer";
import { userReducer } from "./userReducer";

export default combineReducers({
    userData: userReducer,
    goalData: goalReducer,
    expenseData: expenseReducer,
    totalAmt: totalAmtReducer
})