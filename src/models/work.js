const mongoose = require('mongoose');
const workSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const model = mongoose.model('work', workSchema);
module.exports = model;