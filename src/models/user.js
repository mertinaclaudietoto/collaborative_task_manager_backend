const mongoose = require('mongoose');
const rule = require('./rule');
const status = require('./status');
const work = require('./work');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  login:{ type: String, required: true },
  passWord:{ type: String, required: true },
  rule:{ type: mongoose.Schema.Types.ObjectId, ref: 'rule', required: true },
  work:{ type: mongoose.Schema.Types.ObjectId, ref: 'work', required: true },
  status:{ type: mongoose.Schema.Types.ObjectId, ref: 'status', required: true },
});
const model = mongoose.model('user', userSchema);
module.exports = model;