let router = require('express').Router();
let userController = require('../controllers/userController');

router.get("/", userController.list)

module.exports = router;