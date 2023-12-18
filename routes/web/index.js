var express = require('express');
var router = express.Router();
const expensesApi = require('../../api/expenses');

//检测登录中间件
const checkAuthenticationMiddleware = require('../../middleware/CheckAuthenticationMiddleware');

/* GET home page. */
router.get('/',(req,res)=>{
  res.redirect('/expense');
})

router.get('/expense' , checkAuthenticationMiddleware, async (req,res)=>{
  const expenses = await expensesApi.getExpensesProcessed();
  res.render('ExpenseList', {expenses});
})

//Add expense page
router.get('/expense' , checkAuthenticationMiddleware, (req,res)=>{
  res.render('AddExpense');
})

//add expense request
router.post('/expense' ,checkAuthenticationMiddleware, (req,res)=>{
  const isValidExpense = expensesApi.verifyExpense(req.body);

  if(isValidExpense){
    expensesApi.insertExpense(req.body);
  }

  //渲染前端结果页面
  const errorMessage = 'Invalid Form...'
  res.render('addExpenseResult', {isValidExpense , errorMessage});
})

//由于没有用ajax，所以这里无法发送delete请求，所以继续用get请求删除
router.get('/expense/remove/:id', checkAuthenticationMiddleware,async (req,res)=>{
  const id = req.params.id;
  await expensesApi.deleteExpenseById(id);
  res.redirect('/');
})

module.exports = router;
