const express = require('express');
const router = express.Router();

const controller = require('../controllers/user.controller');

router.post('/login',controller.login)
router.post('/:skip/:limit',controller.getAll)
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete_);
module.exports = router;
