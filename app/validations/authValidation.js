'use strict';
const Joi = require('joi');
const FormValidator = require('../helpers/formValidator');


const authValidation = {
    signUp: new FormValidator({
        first_name: Joi.string().alphanum().min(2).max(20).required(),
        last_name: Joi.string().alphanum().min(2).max(20).required(),
        phone_number: Joi.string().required(),
        email: Joi.string().email({tlds: {allow: false}}).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    }),

    login: new FormValidator({
        email: Joi.string().email({tlds: {allow: false}}).required(),
        password: Joi.string().required()
    }),

    update: new FormValidator({
        first_name: Joi.string().optional(),
        last_name: Joi.string().optional(),
        phone_number: Joi.string().optional(),
        email: Joi.string().email({tlds: {allow: false}}).optional(),
    }),

    list: new FormValidator({
        page: Joi.string().allow('').optional().default(1),
        limit: Joi.number().allow('').optional().default(15),
    }),

    get: new FormValidator({
        id: Joi.string().required()
    }),
};

module.exports = authValidation;
