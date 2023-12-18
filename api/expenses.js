const db = require('../db/db');

class expense {
    constructor(title, type,date,amount){
        this.title = title;
        this.type = type;
        this.date = date;
        this.amount = amount;
    }
}

const getExpenseById = async(id)=>{
    const result = await db.query('select * from expenses where id = $1',[id]);
    return result;
}

const getExpenses = async()=>{
    const result = await db.query('select * from expenses');
    return result;
}

const getExpensesProcessed = async()=>{
    const result = await db.query('select * from expenses');
    result.forEach(item => {
        item.type = item.type ? 'Debit' : 'Credit';
    })
    return result;
}

const insertExpense = async (expense) => {
    const sql = 'INSERT INTO expenses (title, type, date, amount) VALUES ($1, $2 , $3 , $4)';
    const result = await db.query(sql,[expense.title, expense.type,expense.date,expense.amount]);
    return result;
}

const deleteExpenseById = async (id) =>{
    const sql = 'DELETE FROM expenses WHERE id = $1';
    const result = await db.query(sql, [id]);
    return result;
}

const verifyExpense = (expense)=>{
    if(!isValidAmount(expense.amount) || !isValidType(expense.type) || !isValidTitle(expense.title)){
        return false;
    }

    return true;
}


const isValidType = (type) => {
    return type === '0' || type === '1';
  }

const isValidAmount = (amount) => {
    return !isNaN(parseFloat(amount)) && isFinite(amount) && parseFloat(amount) >= 0;//if amount is a number, return true
}

const isValidTitle = (title) =>{
    title = title.trim();
    return title.length > 0 && title.length < 100;
}


module.exports = {
    expense , getExpenseById , getExpenses , getExpensesProcessed , 
    insertExpense , isValidAmount,isValidTitle,isValidType,verifyExpense,
    deleteExpenseById
}
