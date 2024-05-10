const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome,getIncomes, deleteIncome } = require('../controllers/income')
const { addSaving, getSaving, deleteSaving, updateSaving } = require('../controllers/saving');

const router = require('express').Router()

router.post('/add-income', addIncome)
.get('/get-incomes', getIncomes)
.delete('/delete-income/:id', deleteIncome)

router.post('/add-expense',addExpense)
.get('/get-expenses', getExpense)
.delete('/delete-expense/:id', deleteExpense)

router.post('/add-saving', addSaving)
.get('/get-savings', getSaving)
.delete('/delete-saving/:id', deleteSaving)
.put('/update-saving/:id', updateSaving)

module.exports=router; 
