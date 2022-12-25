import Colors from "./color";
import Images from "./images";

//Bonus, Interest, Borrow, Salary, Refund, Rental, Gifts, Dividend,
//Grocery, Travels, Shopping, Bills, Electronics, Food, EMI, Family, Rent, Health, Loan, Credit Card, Tax
export const category = [
    {id:1, category:'Bonus', type:'Income'},
    {id:2, category:'Interest', type:'Income'},
    {id:3, category:'Borrow', type:'Income'},
    {id:4, category:'Salary', type:'Income'},
    {id:5, category:'Refund', type:'Income'},
    {id:6, category:'Rental', type:'Income'},
    {id:7, category:'Gifts', type:'Income'},
    {id:8, category:'Divident', type:'Income'},
    {id:9, category:'Grocery', type:'Expense'},
    {id:10, category:'Travels', type:'Expense'},
    {id:11, category:'Shopping', type:'Expense'},
    {id:12, category:'Bills', type:'Expense'},
    {id:13, category:'Electronics', type:'Expense'},
    {id:14, category:'Food', type:'Expense'},
    {id:15, category:'EMI', type:'Expense'},
    {id:16, category:'Family', type:'Expense'},
    {id:17, category:'Rent', type:'Expense'},
    {id:18, category:'Health', type:'Expense'},
    {id:19, category:'Loan', type:'Expense'},
    {id:20, category:'Credit Card', type:'Expense'},
    {id:21, category:'Taxes', type:'Expense'},
    {id:22, category:'Friends', type:'Expense'}
    // {id:1, category:'Bonus', img:Images.expense, color:Colors.orange, type:'Income'},
    // {id:2, category:'Interest', img:Images.expense, color:Colors.orange, type:'Income'},
    // {id:3, category:'Borrow', img:Images.expense, color:Colors.orange, type:'Income'},
    // {id:4, category:'Rental Income', img:Images.expense, color:Colors.orange, type:'Income'},
    // {id:5, category:'Salary', img:Images.expense, color:Colors.orange, type:'Income'},
    // {id:6, category:'Refund', img:Images.expense, color:Colors.orange, type:'Income'},
    // {id:8, category:'Grocery', img:Images.expense, color:Colors.orange, type:'Expense'},
    // {id:9, category:'Retail', img:Images.expense, color:Colors.orange, type:'Expense'},
    // {id:10, category:'Travels', img:Images.expense, color:Colors.orange, type:'Expense'},
    // {id:11, category:'Shopping', img:Images.expense, color:Colors.orange, type:'Expense'},
    // {id:12, category:'Bills and Utilites', img:Images.expense, color:Colors.orange, type:'Expense'},
    // {id:13, category:'Foods', img:Images.expense, color:Colors.orange, type:'Expense'},
    // {id:14, category:'EMI', img:Images.expense, color:Colors.orange, type:'Expense'},
    // {id:15, category:'family', img:Images.expense, color:Colors.orange, type:'Expense'},
    // {id:16, category:'Rents', img:Images.expense, color:Colors.orange, type:'Expense'},
    // {id:17, category:'Health', img:Images.expense, color:Colors.orange, type:'Expense'},
    // {id:18, category:'Others', img:Images.expense, color:Colors.orange, type:'Expense'},
    // {id:19, category:'Others', img:Images.expense, color:Colors.orange, type:'Income'},
    // {id:20, category:'Credit Card', img:Images.expense, color:Colors.orange, type:'Income'},
    // {id:20, category:'Credit Card', img:Images.expense, color:Colors.orange, type:'Expense'},
]

export const allMonth = [
    {id:1, month:'January', key:1},
    {id:2, month:'February', key:2},
    {id:3, month:'March', key:3},
    {id:4, month:'April', key:4},
    {id:5, month:'May', key:5},
    {id:6, month:'June', key:6},
    {id:7, month:'July', key:7},
    {id:8, month:'August', key:8},
    {id:9, month:'September', key:9},
    {id:10, month:'October', key:10},
    {id:11, month:'November', key:11},
    {id:12, month:'December', key:12},
]

export const allYear = [
    {id:1, year:'2019', key:1},
    {id:2, year:'2020', key:2},
    {id:3, year:'2021', key:3},
    {id:4, year:'2022', key:4},
    {id:5, year:'2023', key:5},
    {id:6, year:'2024', key:6},
    {id:7, year:'2025', key:7},
    {id:8, year:'2026', key:8},
    {id:9, year:'2027', key:9},
]

export const investmentCat = [
    {id:1, category:'Mutual Fund', image:Images.mutual, type:'Mutual'},
    {id:2, category:'Stocks', image:Images.stock, type:'Stock'},
    {id:3, category:'Fixed Deposit', image:Images.fd, type:'FD'},
    {id:4, category:'Recurring Deposit', image:Images.saving, type:'RD'},
    {id:5, category:'Insurance', image:Images.insurance, type:'Insurance'},
    {id:6, category:'Gold', image:Images.gold, type:'Gold'},
]

export const investCatType = [
    {id:1, category:'Paytm', type:'Paytm'},
    {id:2, category:'Phonepe', type:'Phonepe'},
    {id:3, category:'Grow', type:'Grow'},
    {id:4, category:'Google Pay', type:'GPay'},
    {id:5, category:'Punjab National Bank', type:'PNB'},
    {id:6, category:'Union Bank of India', type:'Union'},
    {id:7, category:'Central Bank of India', type:'Central'},
    {id:8, category:'HDFC', type:'HDFC'},
    {id:9, category:'Axis Bank', type:'Axis'},
    {id:10, category:'IDBI', type:'IDBI'},
    {id:11, category:'Indusland Bank', type:'Indusland'},
    {id:12, category:'State Bank of India', type:'SBI'},
]

export const Cards = [
    {id:1, card_img:Images.card_1},
    {id:2, card_img:Images.card_2},
    {id:3, card_img:Images.card_3},
    {id:4, card_img:Images.card_4},
    {id:5, card_img:Images.card_5},
    {id:6, card_img:Images.card_6},
    {id:7, card_img:Images.card_7},
    {id:8, card_img:Images.card_8},
    {id:9, card_img:Images.card_9},
]