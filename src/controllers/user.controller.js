const model=require('../models/user.model');
const apiResponse= require('../models/response');
const bcrypt = require('bcrypt')
const { KEYS } = require('../config/constant');
const jwt = require("jsonwebtoken");
const service = require('../services/user.service');

const delete_ = async (req, res) => {
  try {
    const new_ = await service.delete_(req.params.id,req.body);
    res.status(201).json(apiResponse.success(`The entity was deleted successfully.`, new_));
  } catch (err) {
    res.status(400).json(apiResponse.error(`The server encountered a problem. Please try again later.`, []));
  }
};
const update = async (req, res) => {
  try {
    const new_ = await service.update(req.params.id,req.body);
    res.status(201).json(apiResponse.success(`The entity was updated successfully.`, new_));
  } catch (err) {
      console.log(err)
    res.status(400).json(apiResponse.error(`The server encountered a problem. Please try again later.`, []));
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
const getAll = async (req, res) => {
    try {
    const skip = parseInt(req.params.skip, 10) || 0;
    const limit = parseInt(req.params.limit, 10) || 10;
    const all = await service.getAll(skip,limit,req.body);
    res.status(200).json(apiResponse.success(`select successfully`, all));
    } catch (err) {
        console.log(err)
    res.status(500).json(apiResponse.error(`The server encountered a problem. Please try again later.`, [err]));
  }
};
const login = async (req, res) => {
    model.findOne({ login: req.body.login })
        .populate("rule")
        .populate("work")
        .then(user => {
            if (!user) {
                const message = "User not found";
                return res.status(400).json({ message, column: 0 })
            }
            if (!user.status.equals(KEYS.statusActive)) {
                return res.status(500).json(apiResponse.success(`this user is inactive`, req.body));
            }
            bcrypt.compare(req.body.password, user.passWord).then(isPasswordValid => {
                if (!isPasswordValid) {
                    return res.status(400).json(apiResponse.success(`your password is wrong`, req.body))
                }
                const token = jwt.sign(
                    { userId: user._id, rule: user.rule._id },
                    KEYS.jwt,
                    { expiresIn: '24h' }
                )
                if (isPasswordValid) {
                    return res.json(apiResponse.success(`Login success`,
                        {
                            user: {
                                _id: user._id,
                                picture: user.picture,
                                name: user.name,
                                rule: { _id: user.rule._id, name: user.rule.name },
                                work: { _id: user.work._id, name: user.work.name },
                                status: user.status
                            },
                            token
                        }));
                }
            })
        })
};
module.exports = {getAll,login,create,update,delete_};