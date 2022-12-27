import { ADD_INCOME, ADD_EXPENSE, SAVE_USER, ADD_GOAL, DELETE_GOAL, DELETE_EXPENSE, TOTAL_INCOME, ACCOUNTS, DELETE_ACCOUNT, CHECK_PREMIUM, INVESTMENT, DELETE_INVESTMENT, GOAL_DEPOSIT, UPDATE_GOAL, SAVE_CARD, DELETE_CREDIT, DARK_MODE, UPDATE_CREDIT, UPDATE_DEBIT, UPDATE_INVESTMENT } from "../ActionType/ActionType";

export const save_user_data = data => ({
    type:SAVE_USER,
    payload:data
})

export const add_expense = data => ({
    type:ADD_EXPENSE,
    payload: data
})

export const delete_expense = id => ({
    type:DELETE_EXPENSE,
    payload:id
})

export const add_goal = data => ({
    type:ADD_GOAL,
    payload: data
})

export const delete_goal = id => ({
    type:DELETE_GOAL,
    payload:id
})

export const total_income = data => ({
    type:TOTAL_INCOME,
    payload:data
})

export const account_data = data => ({
    type:ACCOUNTS,
    payload: data
})

export const delete_account = id => ({
    type:DELETE_ACCOUNT,
    payload:id
})

export const add_premium = data => ({
    type:CHECK_PREMIUM,
    payload:data
})

export const save_investment = data => ({
    type: INVESTMENT,
    payload:data
})

export const delete_investment = id => ({
    type: DELETE_INVESTMENT,
    payload:id
})

export const goal_deposit = data => ({
    type: GOAL_DEPOSIT,
    payload: data
})

export const update_goal = data => ({
    type:UPDATE_GOAL,
    payload:data
})

export const credit_card = data => ({
    type:SAVE_CARD,
    payload: data
})

export const delete_credit = id => ({
    type:DELETE_CREDIT,
    payload: id
})

export const update_credit = data => ({
    type:UPDATE_CREDIT,
    payload:data
})

export const update_debit = data => ({
    type:UPDATE_DEBIT,
    payload:data
})

export const change_theme = data => ({
    type: DARK_MODE,
    payload: data,
});

export const update_invest = data => ({
    type: UPDATE_INVESTMENT,
    payload:data
})
  