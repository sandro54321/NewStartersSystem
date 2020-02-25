const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
    let opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    console.log(opts.secretOrKey);
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload.user._id);
       User.GetUserByID(jwt_payload.user._id, (err,User) => {
            if (err) {
                console.log('Passport.js Error')
                return done(err, false);
            }
            if (User) {
                console.log();
                return done(null, User);
            } else {
                console.log('Passport.js no User')
                return done(null, false);
            }
        }); 
    }));
}





