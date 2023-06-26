const mongoose = require('mongoose');

// Define your schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  money: {
    type: Number,
    default: 0
  }
});

// Create and export the model based on the schema
const User = mongoose.model('User', userSchema);
module.exports = User;
