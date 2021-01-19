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

    list: new FormValidator({
        page: Joi.string().allow('').optional(),
        pageSize: Joi.string().allow('').optional()
    }),

    get: new FormValidator({
        id: Joi.string().required()
    }),

    update: new FormValidator({
        id: Joi.string().required()
    }),

    delete: new FormValidator({
        id: Joi.string().required()
    }),
};

module.exports = authValidation;
