const UserRepository = require("../repositories/UserRepository")
const {hotelBookingCreateFormValidation} = require('../validations/hotelValidation');
let ApiResponse = require("../helpers/ApiResponse");






/**
 *
 * Create Booking
 * @api {post} /booking
 * @apiName hotels
 * @apiGroup Hotel
 * @apiVersion  0.1.0
 *
 *
 * @apiParamExample  {type} Request Example:
     {
      "hotel": 1912467201,
      "customerFullName": "Samson Oyetola",
      "customerPhoneNumber": "+2347087474483",
      "customerEmail": "hello@samsonoyetola.com",
      "fromDate": "12/01/2021",
      "toDate": "14/01/2021"
    }
 *
 *
 * @apiSuccessExample Success Response
 * HTTP/1.1 200 Ok
 {
    "status": true,
    "message": "Booked successfully",
    "data": [
        {
            "_id": "5ff20a867532b71a37f5762f",
            "deleted": false,
            "hotel": 1912467201,
            "customerFullName": "Samson Oyetola",
            "customerPhoneNumber": "+2347087474483",
            "customerEmail": "hello@samsonoyetola.com",
            "fromDate": "12/01/2021",
            "toDate": "14/01/2021",
            "createdAt": "2021-01-03T18:18:46.475Z",
            "updatedAt": "2021-01-03T18:18:46.475Z",
            "__v": 0,
            "id": "5ff20a867532b71a37f5762f"
        }
    ]
}
 *
 * * * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 422 UNPROCESSABLE_ENTITY
     {
        "status": false,
        "message": {
            "hotel": "hotel id is required",
            "customerFullName": "customerFullName is required",
            "customerPhoneNumber": "customerPhoneNumber is required",
            "customerEmail": "customerEmail is required",
            "fromDate": "fromDate is required",
            "toDate": "toDate is required"
        },
        "data": null
    }
 *
 */
exports.list = async (request, response) => {
    try {
        return response.json(ApiResponse.trueData(await (new UserRepository).list()));
    }catch (error) {
        return response.status(ApiResponse.CODE.INTERNAL_SERVER_ERROR).json(ApiResponse.falseMessage(error.message));
    }
}



exports.insert = async (request, response) => {
    try {
        const {FormattedError, NormalizedValue} = hotelBookingCreateFormValidation.validate(request.body);
        return FormattedError?
            response.status(ApiResponse.CODE.UNPROCESSABLE_ENTITY).json(ApiResponse.falseMessage(FormattedError)):
            response.json(
                ApiResponse.trueData(
                    await (new UserRepository).insert(NormalizedValue),
                    "User Created"
                )
            );
    }catch (error) {
        return response.json(ApiResponse.falseMessage(error.message));
    }
}


