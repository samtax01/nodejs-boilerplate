// Inserting Model is necessary but we already loaded all models with a small trick in the app.js
// const userModelData = require('../models/user');
const mongoose = require('mongoose');



class AuthRepository {

    constructor() {
        this.model = mongoose.model('User');
    }


    /**
     * Get All Resources
     * @returns {Promise<*>}
     */
    async list() {
        return await this.model.find().select("-password").exec();
    }


    /**
     * Create User Information
     * @returns {Promise<*>}
     * @param data
     */
    async signUp(data) {
        let isExists = await this.model.findOne({email: data.email}).exec();
        if(isExists) throw new Error(`User '${data.email}' already exists`);
        return await this.model.create(data).then((user)=>{
            return this._appendToken(user);
        });
    }

    /**
     * Update User Information
     * @returns {Promise<*>}
     * @param _id
     * @param newData
     */
    async update(_id, newData) {
        await this.model.findOneAndUpdate({_id}, newData).exec();
        return this.get({_id});
    }


    /**
     * Login and Get User Information
     * @param email
     * @param password
     * @returns {Promise<*>}
     */
    async login(email, password) {
        return await this.model.findOne({email}).select('+password').then(async (user) => {
            if (!user) throw Error('Invalid Email');
            if (!await user.isPasswordValid(password)) throw Error('Invalid Password');
            return this._appendToken(user);
        });
    }




    /**
     * Search User Information with tokenParam
     * @returns {Promise<*>}
     * @param searchParam
     */
    async get(searchParam) {
        return await this.model.findOne(searchParam).then(async (user) => {
            if (!user) throw Error('Invalid Search Param');
            return this._appendToken(user);
        });
    }


    /**
     * Reset User password
     *
     * @param data
     * @returns {Promise<string>}
     */
    async passwordReset(data) {
        return 'Password Reset successful';
    };



    /**
     * Generate Token and append to mongoUserInfo
     * @param dbUserData
     */
    _appendToken(dbUserData){
        let userInfo = {
            ...dbUserData._doc,
            token: dbUserData.generateJWToken()
        };
        delete userInfo["password"];
        return userInfo;
    }

}

module.exports = AuthRepository;

