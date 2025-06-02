const mongoose = require('mongoose');
const rule = require('./rule.model');
const status = require('./status.model');
const work = require('./work.model');
const userSchema = new mongoose.Schema({
  picture:{type: String, required: true},
  name: { type: String, required: true },
  login:{ type: String, required: true },
  passWord:{ type: String, required: true },
  rule:{ type: mongoose.Schema.Types.ObjectId, ref: 'rule', required: true },
  work:{ type: mongoose.Schema.Types.ObjectId, ref: 'work', required: true },
  status:{ type: mongoose.Schema.Types.ObjectId, ref: 'status', required: true },
});
const model = mongoose.model('user', userSchema);
module.exports = model;