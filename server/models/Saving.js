const mongoose=require('mongoose');

const SavingSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  amount:{
    type: Number,
    required: true,
    maxLength: 20,
    trim: true
  },
  goalAmount:{
    type: Number,
    required: true,
    trim: true
  },
  
  targetDate:{
    type: Date,
    required: true,
    trim: true
  },
  description:{
    type: String,
    required: true,
    maxLength: 200,
    trim: true
  }
},{timestamps:true});

module.exports=mongoose.model('Saving', SavingSchema);
