const mongoose = require('mongoose');
const statusSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const model = mongoose.model('status', statusSchema);
module.exports = model;