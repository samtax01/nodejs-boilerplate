const Joi = require('joi');
const FormValidator = require('../helpers/formValidator');

const customerFormValidation = new FormValidator({
    first_name: Joi.string().min(3).max(15).required(),
    last_name: Joi.string().min(3).max(15).required(),
    email: Joi.string(),
    phone_number: Joi.string().required(),
});

module.exports = customerFormValidation;
