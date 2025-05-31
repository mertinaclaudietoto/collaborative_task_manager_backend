const mongoose = require('mongoose');
const ruleSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const model = mongoose.model('rule', ruleSchema);
module.exports = model;