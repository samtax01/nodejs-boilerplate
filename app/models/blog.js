const mongoose = require('mongoose');
const softDelete = require('mongoose-delete');

let BlogSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        foreignField: '_id',
        justOne: true,
        required : true,
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});


BlogSchema.plugin(softDelete, {deletedAt: true, validateBeforeDelete: true, overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'] });
module.exports = mongoose.model('Blog', BlogSchema, 'blogs');
