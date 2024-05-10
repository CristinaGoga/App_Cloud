const SavingSchema = require("../models/Saving");

exports.addSaving = async (req, res) => {
  const { title, amount, goalAmount, targetDate, description } = req.body;

  const saving = new SavingSchema({
    title,
    amount,
    goalAmount,
    targetDate,
    description,
  });

  try {
    await saving.save();
    res.status(200).json({ message: 'Saving goal added successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add saving goal. Please try again later.' });
  }
};

exports.getSaving = async (req, res) => {
  try {
    const savings = await SavingSchema.find().sort({ createdAt: -1 });
    res.status(200).json(savings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve savings. Please try again later.' });
  }
};

exports.deleteSaving = async (req, res) => {
  const { id } = req.params;
  try {
    const saving = await SavingSchema.findByIdAndDelete(id);
    if (!saving) {
      return res.status(404).json({ message: 'Saving goal not found.' });
    }
    res.status(200).json({ message: 'Saving goal deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete saving goal. Please try again later.' });
  }
};

exports.updateSaving = async (req, res) => {
  const { id } = req.params;
  const { title, amount, goalAmount, targetDate, description } = req.body;

  try {
    const updatedSaving = await SavingSchema.findByIdAndUpdate(
      id,
      { title, amount, goalAmount, targetDate, description },
      { new: true }
    );

    if (!updatedSaving) {
      return res.status(404).json({ message: 'Saving goal not found.' });
    }

    res.status(200).json(updatedSaving);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update saving goal. Please try again later.' });
  }
};
