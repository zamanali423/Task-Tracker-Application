const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
  status: {
    type: String,
  },
  email: {
    type: String,
  },
});

module.exports = mongoose.model("tasks", taskSchema);
