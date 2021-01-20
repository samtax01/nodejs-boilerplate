let router = require('express').Router();
let ApiResponse = require("../helpers/ApiResponse");

/**
 *
 * @api {get} /
 * @apiName Testing Router
 * @apiGroup Testing
 * @apiVersion  1.0.0
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 Ok
 {
    "status": true,
    "message": "success",
    "data": "Api is working..."
 }
 */
router.get('/', function (req, res) {
    res.json(ApiResponse.trueData("Api is working..."));
});


// Auth
router.use('/auth', require('./authRoute'));

// Blog
router.use('/blogs', require('./blogRoute'));

module.exports = router;
