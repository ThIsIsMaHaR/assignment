const Task = require('../models/Task');

// @desc Get all tasks (Admin sees all, User sees own)
const getTasks = async (req, res) => {
  const query = req.user.role === 'admin' ? {} : { user: req.user._id };
  const tasks = await Task.find(query).populate('user', 'name email');
  res.json(tasks);
};

const createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ user: req.user._id, title, description });
  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task && (task.user.toString() === req.user._id.toString() || req.user.role === 'admin')) {
    task.title = req.body.title || task.title;
    task.status = req.body.status || task.status;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: 'Task not found or unauthorized' });
  }
};

const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task && (task.user.toString() === req.user._id.toString() || req.user.role === 'admin')) {
    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } else {
    res.status(404).json({ message: 'Task not found or unauthorized' });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };