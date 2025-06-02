const service = require('../services/work.service');
const apiResponse= require('../models/response');

const getAll = async (req, res) => {
  try {
    const all = await service.getAll();
    res.status(200).json(apiResponse.success(`select successfully`, all));
  } catch (err) {
    res.status(500).json(apiResponse.error(`The server encountered a problem. Please try again later.`, []));
  }
};
const create = async (req, res) => {
  try {
    const new_ = await service.create(req.body);
    res.status(201).json(apiResponse.success(`The entity was created successfully.`, new_));
  } catch (err) {
    res.status(400).json(apiResponse.error(`The server encountered a problem. Please try again later.`, []));
  }
};

const update = async (req, res) => {
  try {
    const new_ = await service.update(req.params.id,req.body);
    res.status(201).json(apiResponse.success(`The entity was updated successfully.`, new_));
  } catch (err) {
    res.status(400).json(apiResponse.error(`The server encountered a problem. Please try again later.`, []));
  }
};

const delete_ = async (req, res) => {
  try {
    const new_ = await service.delete_(req.params.id,req.body);
    res.status(201).json(apiResponse.success(`The entity was deleted successfully.`, new_));
  } catch (err) {
    res.status(400).json(apiResponse.error(`The server encountered a problem. Please try again later.`, []));
  }
};
module.exports = { getAll,create,update,delete_};