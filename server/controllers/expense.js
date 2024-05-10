const ExpenseSchema = require("../models/Expense");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body; //se primesc datele prin req.body
//creare o noua instanta de tip ExpenseSchema
  const expense = ExpenseSchema({
    title,
    amount,
    category,
    date,
    description
  });

  try {
    //validari
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (amount <= 0 || typeof !amount === 'number') {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }
//se salveaza datele in baza de date
    await expense.save();
    res.status(200).json({ message: 'Expense added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
 
}
//metoda pentru a obtine datele din baza de date
exports.getExpense = async (req, res) => {
  try {
    //se utilizeaza find() pentru a gasi toate cheltuielile
    const expenses = await ExpenseSchema.find().sort({ createdAt: -1 }); // se sorteaza in ordine descrescatoare
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.deleteExpense = async (req, res) =>{
    const {id}= req.params;
    console.log(req.params);
    ExpenseSchema.findByIdAndDelete(id).then((expense)=>{
    res.status(200).json({message:'Expense Deleted'})
    })
    .catch((err)=>{
        res.status(500).json({message:'Server Error'})
    })
}