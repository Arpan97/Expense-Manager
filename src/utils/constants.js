import Colors from "./color";
import Images from "./images";

export const category = [
    {id:1, category:'Bonus', img:Images.expense, color:Colors.orange, type:'Income'},
    {id:2, category:'Interest', img:Images.expense, color:Colors.orange, type:'Income'},
    {id:3, category:'Reinbursement', img:Images.expense, color:Colors.orange, type:'Income'},
    {id:4, category:'Rental Income', img:Images.expense, color:Colors.orange, type:'Income'},
    {id:5, category:'Salary', img:Images.expense, color:Colors.orange, type:'Income'},
    {id:6, category:'Refund Credit', img:Images.expense, color:Colors.orange, type:'Income'},
    {id:8, category:'Grocery', img:Images.expense, color:Colors.orange, type:'Expense'},
    {id:9, category:'Retail', img:Images.expense, color:Colors.orange, type:'Expense'},
    {id:10, category:'Travels', img:Images.expense, color:Colors.orange, type:'Expense'},
    {id:11, category:'Shopping', img:Images.expense, color:Colors.orange, type:'Expense'},
    {id:12, category:'Bills and Utilites', img:Images.expense, color:Colors.orange, type:'Expense'},
    {id:13, category:'Foods', img:Images.expense, color:Colors.orange, type:'Expense'},
    {id:14, category:'EMI', img:Images.expense, color:Colors.orange, type:'Expense'},
    {id:15, category:'family', img:Images.expense, color:Colors.orange, type:'Expense'},
    {id:16, category:'Rents', img:Images.expense, color:Colors.orange, type:'Expense'},
    {id:17, category:'Health', img:Images.expense, color:Colors.orange, type:'Expense'},
    {id:18, category:'Others(Expense)', img:Images.expense, color:Colors.orange, type:'Expense'},
    {id:19, category:'Others(Income)', img:Images.expense, color:Colors.orange, type:'Income'},
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

export const investmentCat = [
    {id:1, category:'Mutual Fund', image:Images.bank, type:'Mutual'},
    {id:2, category:'Stocks', image:Images.bank, type:'Stock'},
    {id:1, category:'Fixed Deposit', image:Images.bank, type:'FD'},
    {id:1, category:'Recurring Deposit', image:Images.bank, type:'RD'},
    {id:1, category:'Insurance', image:Images.bank, type:'Insurance'},
    {id:1, category:'Gold', image:Images.bank, type:'Gold'},
    {id:1, category:'Silver', image:Images.bank, type:'Silver'},
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