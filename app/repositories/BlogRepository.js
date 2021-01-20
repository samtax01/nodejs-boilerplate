// Inserting Model is necessary but we already loaded all models with a small trick in the app.js
// const blogModelData = require('../models/blog');
const mongoose = require('mongoose');



class BlogRepository {

    constructor() {
        this.model = mongoose.model('Blog');
    }

    /**
     * Get All Resources
     * @returns {Promise<*>}
     */
    async list() {
        return await this.model.find().sort("-updatedAt").exec()
    }


    /**
     * Create Resource
     * @returns {Promise<*>}
     * @param user
     * @param data
     */
    async create(user, data) {
        data.author = user;
        return this.model.create(data);
    }

    /**
     * Update Resource
     * @returns {Promise<*>}
     * @param _id
     * @param newData
     */
    async update(_id, newData) {
        let data = null;
        try{
            await this.model.findOneAndUpdate({_id}, newData).exec();
            data = this.get({_id});
        }catch (e) {}
        return data;
    }


    /**
     * Get Resource
     * @returns {Promise<*>}
     * @param searchParam
     */
    async get(searchParam) {
        let data = null;
        try{
            data = await this.model.findOne(searchParam);
        }catch (e) {}
        return data;
    }


    /**
     * Delete Resource
     * @returns {Promise<*>}
     * @param _id
     */
    async delete(_id) {
        return this.model.findOneAndDelete({_id});
    }

}

module.exports = BlogRepository;

