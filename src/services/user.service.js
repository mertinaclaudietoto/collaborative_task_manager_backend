const model = require('../models/user.model');
const { buildSearchParm } = require("../utils/search");
const { generatePassword } = require("../utils/passWord");
const bcrypt = require('bcrypt');

const getAll = async (skip, limit, searchValue) => {
  const useSearchValue = buildSearchParm(searchValue,model.schema);
  return await model.find({
                      $and:[useSearchValue] ,
                    })
                    .populate(Object.keys(useSearchValue),"picture name login rule work status")
                    .skip(skip)
                    .limit(limit);
};

const create = async (data) => {
  data['passWord'] = await bcrypt.hash(generatePassword(), 10);
  console.log(data);
  const new_ = new model(data);
  return await new_.save();
};

const update = async (id, data) => {
  return await model.findByIdAndUpdate(id, {$set:data} , { new: true }).select('-password');;
};

const delete_ = async (id) => {
// add status and remove cascade
  return await model.findByIdAndDelete(id);
};
module.exports = { create, update, delete_, getAll };
