const express = require('express');
const router = express.Router();
const model=require('../models/user');
const apiResponse= require('../models/response');
const bcrypt = require('bcrypt')
const { KEYS } = require('../config/constant');
const jwt=require("jsonwebtoken");

router.post('/login',async (req, res) => {
    model.findOne({ login: req.body.login })
        .populate("rule")
        .populate("work")
        .then(user => {
        if(!user){
            const message= "User not found";
            return res.status(400).json({ message,column:0 })
        }
        if(!user.status.equals(KEYS.statusActive)){
           return res.status(500).json(apiResponse.success(`this user is inactive`,req.body));
        }
      bcrypt.compare(req.body.password, user.passWord).then(isPasswordValid => {
        if(!isPasswordValid){
            return res.status(400).json(apiResponse.success(`your password is wrong`,req.body))
        }
        const token = jwt.sign(
            {userId:user._id,rule:user.rule._id},
             KEYS.jwt,
            {expiresIn:'24h'}
        )
        if(isPasswordValid) {
            return res.json(apiResponse.success(`Login success`,
                {
                    user:{
                    _id: user._id,
                    picture: user.picture,
                    name: user.name,
                    rule: { _id: user.rule._id, name: user.rule.name },
                    work: { _id: user.work._id, name: user.work.name },
                    status:user.status
                    },
                    token
                }));
        }
      })
    })
})
module.exports = router;
