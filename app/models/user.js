const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jwt-simple');
const config = require(__base +  "config");
const softDelete = require('mongoose-delete');

let UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is not valid'],
        index: true,
        sparse: true
    },
    password: {type: String, select: false},
    phone_number: {
        type: String,
        // index: true,
        unique: true,
        // trim: true,
        // sparse: true
    },
    status: String,
    role: String,
    email_confirmed_at: Date,
    preferences: {
        type: Object,
        required: false
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

/*
UserSchema.virtual('company', {
    ref: 'Company',
    localField: 'company_id',
    foreignField: '_id',
    justOne: true
});
*/

UserSchema.plugin(softDelete, {deletedAt: true, validateBeforeDelete: true, overrideMethods: ['count', 'find', 'findOne', 'findOneAndUpdate', 'update'] });


/**
 * Encrypt User Password
 * @param password
 * @returns {Promise<*>}
 */
UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(5);
    return await bcrypt.hash(password, salt);
};


/**
 * Validate Password
 * @param password
 * @returns {Promise<*>}
 */
UserSchema.methods.isPasswordValid = async function (password) {
    return await bcrypt.compare(password, this.password);
};



/**
 * Get Login oauth2 Token
 * @returns {*}
 */
UserSchema.methods.generateJWToken = function () {
    const today = new Date();
    const date = new Date(today);
    date.setDate(today.getDate() + 60);
    const expires_at = parseInt((date.getTime() / 1000).toString(), 10);
    return {
        expires_at,
        token_type: "Bearer",
        access_token: jwt.encode({
            id: this._id,
            email: this.email,
            phone_number: this.phone_number,
        }, config.authSecret)
    };
};



/**
 * Log
 */
UserSchema.pre('save', async function (next) {
    if(this.isModified(this.password)){
        this.password = await this.encryptPassword(this.password);
    }
    this.log('saving user...');
    next();
});

UserSchema.post('save', function (doc) {
    this.log("saved user");
});

UserSchema.method('log', function (message) {
    console.log('log:', message);
});

module.exports = mongoose.model('User', UserSchema, 'users');
