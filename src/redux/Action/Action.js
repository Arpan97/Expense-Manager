import { ADD_INCOME, ADD_EXPENSE, SAVE_USER, ADD_GOAL, DELETE_GOAL, DELETE_EXPENSE, TOTAL_INCOME } from "../ActionType/ActionType";

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