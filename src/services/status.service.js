const model = require('../models/status.model');

const getAll = async () => {
  return await model.find();
};

const create = async (data) => {
  const new_ = new model(data);
  return await new_.save();
};

const update = async (id, data) => {
  return await model.findByIdAndUpdate(id, data, { new: true });
};

const delete_ = async (id) => {
  return await model.findByIdAndDelete(id);
};

module.exports = {getAll,create,update,delete_};