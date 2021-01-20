'use strict';

const ApiResponse = require('../helpers/ApiResponse');
const validation = require('../validations/blogValidation.js');
const repository = new (require('../repositories/BlogRepository'));


/**
 *
 * @api {get} /blogs
 * @apiName List
 * @apiGroup Blog
 * @apiVersion  1.0.0
 * @apiParamExample  {type} Request Example:
    {

    }
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 Ok
     {
        "status": true,
        "message": "success",
        "data": [
            {
                "deleted": false,
                "_id": "60078eff726178363f9dd279",
                "title": "I am Isiah to the world",
                "body": "Hi There",
                "author": "600739aaadb67adf09253582",
                "createdAt": "2021-01-20T02:01:35.159Z",
                "updatedAt": "2021-01-20T02:01:35.159Z",
            "__v": 0,
            "id": "60078eff726178363f9dd279"
        },
     ]
 }
 */
exports.list = async (request, response) => {
    try {
        return response.json(ApiResponse.trueData(await repository.list()));
    }catch (error) {
        return response.status(ApiResponse.CODE.INTERNAL_SERVER_ERROR).json(ApiResponse.falseMessage(error.message));
    }
};


/**
 *
 * @api {get} /blogs/{id}
 * @apiName Get
 * @apiGroup Blog
 * @apiVersion  1.0.0
 * @apiParamExample  {type} Request Example:
    {

    }
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 Ok
 {
    "status": true,
    "message": "success",
    "data": [
        {
            "deleted": false,
            "_id": "60078eff726178363f9dd279",
            "title": "I am Isiah to the world",
            "body": "Hi There",
            "author": "600739aaadb67adf09253582",
            "createdAt": "2021-01-20T02:01:35.159Z",
            "updatedAt": "2021-01-20T02:01:35.159Z",
            "__v": 0,
            "id": "60078eff726178363f9dd279"
        }
    ]
 }
 */
exports.get = async (request, response) => {
    try {
        let data = await repository.get({_id: request.params.id});
        if(!data)
            response.status(ApiResponse.CODE.NOT_FOUND).json(ApiResponse.falseMessage("Resource not found"));
        return response.json(ApiResponse.trueData(data));
    }catch (error) {
        return response.status(ApiResponse.CODE.INTERNAL_SERVER_ERROR).json(ApiResponse.falseMessage(error.message));
    }
};





/**
 *
 * @api {post} /blogs
 * @apiName Create
 * @apiGroup Blog
 * @apiVersion  1.0.0
 * @apiParamExample  {type} Request Example:
     {
        "title": "I am Isiah to the world",
        "body": "Hi There"
    }
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 Ok
 {
    "status": true,
    "message": "success",
    "data": {
        "_id": "60078eff726178363f9dd279",
        "deleted": false,
        "title": "I am Isiah to the world",
        "body": "Hi There",
        "author": "600739aaadb67adf09253582",
        "createdAt": "2021-01-20T02:01:35.159Z",
        "updatedAt": "2021-01-20T02:01:35.159Z",
        "__v": 0,
        "id": "60078eff726178363f9dd279"
    }
}
 */
exports.create = async (request, response) => {
    try {
        const {FormattedError, NormalizedValue} = validation.create.validate(request.body);
        return FormattedError?
            response.status(ApiResponse.CODE.UNPROCESSABLE_ENTITY).json(ApiResponse.falseMessage(FormattedError)):
            response.json(
                ApiResponse.trueData(
                    await repository.create(request.user, NormalizedValue)
                )
            );
    }catch (error) {
        return response.status(ApiResponse.CODE.INTERNAL_SERVER_ERROR).json(ApiResponse.falseMessage(error.message));
    }
};





/**
 *
 * @api {patch}  /blogs/{id}
 * @apiName Update
 * @apiGroup Blog
 * @apiVersion  1.0.0
 * @apiParamExample  {type} Request Example:
    {
        "title": "I am Isiah to the world",
        "body": "Hi There"
    }
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 Ok
 {
    "status": true,
    "message": "success",
    "data": {
        "_id": "60078eff726178363f9dd279",
        "deleted": false,
        "title": "I am Isiah to the world",
        "body": "Hi There",
        "author": "600739aaadb67adf09253582",
        "createdAt": "2021-01-20T02:01:35.159Z",
        "updatedAt": "2021-01-20T02:01:35.159Z",
        "__v": 0,
        "id": "60078eff726178363f9dd279"
    }
}
 */
exports.update = async (request, response) => {
    try {
        const {FormattedError, NormalizedValue} = validation.update.validate(request.body);
        if(FormattedError)
            response.status(ApiResponse.CODE.UNPROCESSABLE_ENTITY).json(ApiResponse.falseMessage(FormattedError));
        let data = await repository.update(request.params.id, NormalizedValue);
        if(!data)
            return response.status(ApiResponse.CODE.NOT_FOUND).json(ApiResponse.falseMessage("Resource not found"));
        return response.json(ApiResponse.trueData(data))
    }catch (error) {
        return response.status(ApiResponse.CODE.INTERNAL_SERVER_ERROR).json(ApiResponse.falseMessage(error.message()));
    }
};




/**
 *
 * @api {delete} /blogs/{id}
 * @apiName Delete
 * @apiGroup Blog
 * @apiVersion  1.0.0
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 Ok
 {
    "status": true,
    "message": "success",
    "data":{
         "deleted": false,
        "_id": "60078eff726178363f9dd279",
        "title": "I am Isiah to the world",
        "body": "Hi There",
        "author": "600739aaadb67adf09253582",
        "createdAt": "2021-01-20T02:01:35.159Z",
        "updatedAt": "2021-01-20T02:01:35.159Z",
        "__v": 0,
        "id": "60078eff726178363f9dd279"
    }
 }
 */
exports.delete = async (request, response) => {
    try {
        let data = await repository.delete(request.params.id);
        if(!data)
            response.status(ApiResponse.CODE.NOT_FOUND).json(ApiResponse.falseMessage("Resource not found"));
        return response.json(ApiResponse.trueData(data));
    }catch (error) {
        return response.status(ApiResponse.CODE.INTERNAL_SERVER_ERROR).json(ApiResponse.falseMessage(error.message));
    }
};


