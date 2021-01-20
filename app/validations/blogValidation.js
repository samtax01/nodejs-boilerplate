'use strict';
const Joi = require('joi');
const FormValidator = require('../helpers/formValidator');


const blogValidation = {
    create: new FormValidator({
        title: Joi.string().min(2).required(),
        body: Joi.string().required(),
    }),

    update: new FormValidator({
        title: Joi.string().min(2).optional(),
        body: Joi.string().optional(),
    }),

    list: new FormValidator({
        page: Joi.string().allow('').optional().default(1),
        limit: Joi.number().allow('').optional().default(15),
    }),

    get: new FormValidator({
        id: Joi.string().required()
    }),
};

module.exports = blogValidation;
