

class ApiResponse {

    constructor(status, data, message) {
        this.status = status;
        this.message = message;
        this.data = data;
    }


    static make(status, data, message = "success") {
        return new ApiResponse(status, data, message);
    }

    static falseMessage(message) {
        return ApiResponse.make(false, null, message);
    }

    static trueMessage(message) {
        return ApiResponse.make(true, null, message);
    }

    static trueData(data, message = "success") {
        return ApiResponse.make(true, data, message);
    }

}

/*********************************
 *  Response Code Helpers
 **********************************/
ApiResponse.CODE =  {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOW: 405,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501
}



module.exports = ApiResponse;

