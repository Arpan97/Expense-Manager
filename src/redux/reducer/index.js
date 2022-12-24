import { combineReducers } from "redux";
import { account_reducer } from "./accountReducer";
import { creditCardReducer } from "./creditCardReducer";
import { expenseReducer } from "./expenseReducer";
import { goalDepositReducer } from "./goaldepositReducer";
import { goalReducer } from "./goalReducer";
import { investmentReducer } from "./investmentReducer";
import { premiumReducer } from "./premiumReducer";
import { themeReducer } from "./themeReducer";
import { totalAmtReducer } from "./totalAmtReducer";
import { userReducer } from "./userReducer";

export default combineReducers({
    userData: userReducer,
    goalData: goalReducer,
    expenseData: expenseReducer,
    totalAmt: totalAmtReducer,
    account:account_reducer,
    premium: premiumReducer,
    invest: investmentReducer,
    goalDeposit: goalDepositReducer,
    credit: creditCardReducer,
    theme: themeReducer
})