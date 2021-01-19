const passport = require('passport');
const user = require('../models/user');
const jwt = require('jwt-simple');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const authRepository = new (require('../repositories/AuthRepository'));
const config = require(__base +  'config');


passport.use(new LocalStrategy(
{usernameField: 'email', passwordField: 'password'},
async (email, password, done) => {
    try {
        const user = await authRepository.login(email, password);
        if(!user) done(null, {error: "email/password not valid"});
        done(null, user);
    }catch (e){
        done(null, {error: "email/password not valid"})
    }
}));


passport.use(new BearerStrategy(async (token, done) => {
    try {
        const {email, phone_number} = jwt.decode(token, config.authSecret);
        const searchParam = email? {email}: {phone_number};
        const user = await authRepository.get({...searchParam});
        if(!user) done(null, {error: "Token not valid"});
        done(null, user);
    }catch (e){
        done(null, {error: "Token not valid"});
    }
}));
