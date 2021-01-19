const _ = require('lodash');
const HotelRepository = require('./HotelRepository');
const mongoose = require('mongoose');
const book = require('../models/booking');
const hotel = require('../models/hotel');

class UserRepository {

    constructor() {
        this.userModel = mongoose.model('User');
        this.bookingModel = mongoose.model('Booking');
    }

    /**
     * Get All Resources
     * @param data
     * @returns {Promise<*>}
     */
    async list() {
        return await this.userModel.find().exec();
    }



    /**
     * Book an Hotel
     * @param data
     * @returns {Promise<*>}
     */
    async insert(data) {
        let hotelInfo = await this.hotelModel.findOne({hotelId: data.hotel}).exec();
        if(!hotelInfo)
            throw new Error(`Hotel ID ${data.hotel} not found in the system. Please only book hotel with a valid ID. Run 'fetch nearby hotel endpoint' to pick a valid hotel ID`);
        return await this.bookingModel.create([data]);
    }




    /**
     * List all booking under a particular Hotel
     *
     * @param hotelId
     * @returns {Promise<*>}
     */
    async getHotelBooking(hotelId = null) {
        let hotelInfo = await this.hotelModel.findOne({hotelId}).exec();
        if(!hotelInfo)
            throw new Error(`Hotel with id ${hotelId} not found in the system. Please only book hotel with a valid ID`);
        let customers = (await this.bookingModel.find({hotel: hotelId}).sort({createdAt: -1}).exec());
        return {
            hotelInfo,
            customers
        }
    }

}

module.exports = UserRepository;
