'use strict';

const ApiResponse = require('../helpers/ApiResponse');
const validation = require('../validations/authValidation.js');
const repository = new (require('../repositories/AuthRepository'));


/**
 *
 * @api {get} /users
 * @apiName Fetch Users
 * @apiGroup User
 * @apiVersion  1.0.0
 * @apiParamExample  {type} Request Example:
    {

    }
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 Ok
 {
    "status": true,
    "message": "All User",
    "data": [
        {
            "deleted": false,
            "_id": "60073980adb67adf09253581",
            "first_name": "Samson",
            "last_name": "Oyetola",
            "phone_number": "+2348053535632",
            "email": "hell0@samsonOyetola.com",
            "createdAt": "2021-01-19T19:56:48.185Z",
            "updatedAt": "2021-01-19T19:56:48.185Z",
            "__v": 0,
            "id": "60073980adb67adf09253581"
        }
    ]
 }
 */
exports.list = async (request, response) => {
    try {
        return response.json(ApiResponse.trueData(await repository.list(), "All User"));
    }catch (error) {
        return response.status(ApiResponse.CODE.INTERNAL_SERVER_ERROR).json(ApiResponse.falseMessage(error.message));
    }
};





/**
 *
 * @api {post} /auth/signup
 * @apiName Create User
 * @apiGroup User
 * @apiVersion  1.0.0
 * @apiParamExample  {type} Request Example:
     {
        "first_name": "Samson",
        "last_name": "oyetola",
        "phone_number": "+2348053535632",
        "email": "hello2@samsonoyetola.com",
        "password": "password"
    }
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 Ok
 {
    "status": true,
    "message": "User Created",
    "data":{
        "deleted": false,
        "_id": "60073980adb67adf09253581",
        "first_name": "Samson",
        "last_name": "Oyetola",
        "phone_number": "+2348053535632",
        "email": "hell0@samsonOyetola.com",
        "createdAt": "2021-01-19T19:56:48.185Z",
        "updatedAt": "2021-01-19T19:56:48.185Z",
        "__v": 0,
        "id": "60073980adb67adf09253581"
    }
 }
 */
exports.signUp = async (request, response) => {
    try {
        const {FormattedError, NormalizedValue} = validation.signUp.validate(request.body);
        return FormattedError?
            response.status(ApiResponse.CODE.UNPROCESSABLE_ENTITY).json(ApiResponse.falseMessage(FormattedError)):
            response.json(
                ApiResponse.trueData(
                    await repository.signUp(NormalizedValue),
                    "User Created"
                )
            );
    }catch (error) {
        return response.status(ApiResponse.CODE.INTERNAL_SERVER_ERROR).json(ApiResponse.falseMessage(error.message));
    }
};






/**
 *
 * @api {post} /auth/login
 * @apiName User Login
 * @apiGroup User
 * @apiVersion  1.0.0
 * @apiParamExample  {type} Request Example:
    {
        "email": "hello@samsonoyetola.com",
        "password": "password"
    }
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 Ok
 {
    "status": true,
    "message": "success",
    "data":{
        "deleted": false,
        "_id": "60073980adb67adf09253581",
        "first_name": "Samson",
        "last_name": "Oyetola",
        "phone_number": "+2348053535632",
        "email": "hell0@samsonOyetola.com",
        "createdAt": "2021-01-19T19:56:48.185Z",
        "updatedAt": "2021-01-19T19:56:48.185Z",
        "__v": 0,
        "id": "60073980adb67adf09253581"
    }
 }
 */
exports.login = async (request, response) => {
    try {
        const {FormattedError, NormalizedValue} = validation.login.validate(request.body);
        return FormattedError?
            response.status(ApiResponse.CODE.UNPROCESSABLE_ENTITY).json(ApiResponse.falseMessage(FormattedError)):
            response.json(ApiResponse.trueData(await repository.login(NormalizedValue.email, NormalizedValue.password)));
    }catch (error) {
        return response.status(ApiResponse.CODE.INTERNAL_SERVER_ERROR).json(ApiResponse.falseMessage(error.message));
    }
};



/**
 *
 * @api {post} /auth/update
 * @apiName Update User
 * @apiGroup User
 * @apiVersion  1.0.0
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 Ok
 {
    "status": true,
    "message": "Profile updated",
    "data":{
        "deleted": false,
        "_id": "60073980adb67adf09253581",
        "first_name": "Samson",
        "last_name": "Oyetola",
        "phone_number": "+2348053535632",
        "email": "hell0@samsonOyetola.com",
        "createdAt": "2021-01-19T19:56:48.185Z",
        "updatedAt": "2021-01-19T19:56:48.185Z",
        "__v": 0,
        "id": "60073980adb67adf09253581"
    }
 }
 */
exports.update = async (request, response) => {
    try {
        if ("error" in request.user) response.status(ApiResponse.CODE.UNAUTHORIZED).json(ApiResponse.falseMessage(`Session expired. Please login.`));
        const {FormattedError, NormalizedValue} = validation.update.validate(request.body);
        if(FormattedError) response.status(ApiResponse.CODE.UNPROCESSABLE_ENTITY).json(ApiResponse.falseMessage(FormattedError));
        return response.json(ApiResponse.trueData(await repository.update(request.user._id, NormalizedValue), "Profile updated"));
    }catch (error) {
        return response.status(ApiResponse.CODE.INTERNAL_SERVER_ERROR).json(ApiResponse.falseMessage(error.message));
    }
};




/**
 *
 * @api {get} /auth/renew
 * @apiName Renew 0Auth2 Bearer Token
 * @apiGroup User
 * @apiVersion  1.0.0
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 Ok
 {
    "status": true,
    "message": "token",
    "data":{
        "deleted": false,
        "_id": "60073980adb67adf09253581",
        "first_name": "Samson",
        "last_name": "Oyetola",
        "phone_number": "+2348053535632",
        "email": "hell0@samsonOyetola.com",
        "createdAt": "2021-01-19T19:56:48.185Z",
        "updatedAt": "2021-01-19T19:56:48.185Z",
        "__v": 0,
        "id": "60073980adb67adf09253581"
    }
 }
 */
exports.renewToken = async (request, response) => {
    try {
       if ("error" in request.user) response.status(ApiResponse.CODE.UNAUTHORIZED).json(ApiResponse.falseMessage(`Session expired. Please login.`));
       response.json(ApiResponse.trueData(request.user, "Token renewed"));
    }catch (error) {
        return response.status(ApiResponse.CODE.INTERNAL_SERVER_ERROR).json(ApiResponse.falseMessage(error.message));
    }
};

