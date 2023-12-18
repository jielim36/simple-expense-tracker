var express = require('express');
var router = express.Router();
const expensesApi = require('../../api/expenses');
const CheckJWTAccessPermission = require('../../middleware/CheckJWTAccessPermission');

/* GET home page. */
router.get('/expense' ,CheckJWTAccessPermission, async (req,res)=>{
  const expenses = await expensesApi.getExpensesProcessed();
  if(expenses){
    res.json({
      code: '0000',
      msg: 'Query Successful',
      data: expenses
    });
  }else{
    res.json({
      code: '0000',
      msg: 'Query Failed',
      data: null
    });
  }
})

//Add expense page
router.get('/expense' ,CheckJWTAccessPermission, (req,res)=>{
  res.render('AddExpense');
})

//add expense request
router.post('/expense' ,CheckJWTAccessPermission, (req,res)=>{
  const isValidExpense = expensesApi.verifyExpense(req.body);

  if(isValidExpense){
    expensesApi.insertExpense(req.body);
  }

  if(isValidExpense){
    res.json({
      code: '0000',
      msg: 'Create Successful',
      data: expenses
    });
  }else{
    res.json({
      code: '0000',
      msg: 'Create Failed',
      data: null
    });
  }
})

//由于没有用ajax，所以这里无法发送delete请求，所以继续用get请求删除
router.delete('/expense/:id',CheckJWTAccessPermission, async (req,res)=>{
  const id = req.params.id;
  const result = await expensesApi.deleteExpenseById(id);

  if(result){
    res.json({
      code: '0000',
      msg: 'Create Successful',
      data: result
    });
  }else{
    res.json({
      code: '0000',
      msg: 'Create Failed',
      data: null
    });
  }
})

module.exports = router;
