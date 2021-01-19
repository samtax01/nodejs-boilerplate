'use strict';

const ApiResponse = require('../helpers/ApiResponse');
const authValidation = require('../validations/authValidation.js');
const authRepository = new (require('../repositories/AuthRepository'));


exports.list = async (request, response) => {
    try {
        return response.json(ApiResponse.trueData(await authRepository.list(), "All User"));
    }catch (error) {
        return response.status(ApiResponse.CODE.INTERNAL_SERVER_ERROR).json(ApiResponse.falseMessage(error.message));
    }
};



exports.signUp = async (request, response) => {
    try {
        const {FormattedError, NormalizedValue} = authValidation.signUp.validate(request.body);
        return FormattedError?
            response.status(ApiResponse.CODE.UNPROCESSABLE_ENTITY).json(ApiResponse.falseMessage(FormattedError)):
            response.json(
                ApiResponse.trueData(
                    await authRepository.signUp(NormalizedValue),
                    "User Created"
                )
            );
    }catch (error) {
        return response.status(ApiResponse.CODE.INTERNAL_SERVER_ERROR).json(ApiResponse.falseMessage(error.message));
    }
};





exports.login = async (request, response) => {
    try {
        const {FormattedError, NormalizedValue} = authValidation.login.validate(request.body);
        return FormattedError?
            response.status(ApiResponse.CODE.UNPROCESSABLE_ENTITY).json(ApiResponse.falseMessage(FormattedError)):
            response.json(
                ApiResponse.trueData(
                    await authRepository.login(NormalizedValue.email, NormalizedValue.password),
                    "User Created"
                )
            );
    }catch (error) {
        return response.status(ApiResponse.CODE.INTERNAL_SERVER_ERROR).json(ApiResponse.falseMessage(error.message));
    }
};


exports.newToken = async (request, response) => {
    try {
       if ("error" in request.user)
           return response.status(ApiResponse.CODE.UNPROCESSABLE_ENTITY).json(ApiResponse.falseMessage(`Session expired. Please login.`));
        return response.json(ApiResponse.trueData(request.user, "Token renewed"));
    }catch (error) {
        return response.status(ApiResponse.CODE.INTERNAL_SERVER_ERROR).json(ApiResponse.falseMessage(error.message));
    }
};

