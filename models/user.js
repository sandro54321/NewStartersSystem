const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schemea 
const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.GetUserByID = function(id, callback){
    User.findById(id, callback);
}

module.exports.GetUserByName = function(name, callback){
    const query = {name: name}
    User.findOne(query, callback);
}

module.exports.GetUserByEmail = function(email, callback){
    const query = {email: email}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    })
}

module.exports.comparePassword = function(password, hash, callback){
    bcrypt.compare(password, hash, (err, isMatch) => {
        if(err) throw err;
        console.log("Password match " + isMatch);
        callback(null, isMatch);
    });
}

module.exports.getAllLineManagers = function(callback){
    User.find(callback).select('email')

}

module.exports.getAllUsers = function(callback){
    User.find(callback)

}

module.exports.getUserByID = function(id, callback){
    User.findById(id, callback);
}

module.exports.updateUser = function(id, newUser, callback){
    User.findByIdAndUpdate(id, newUser, callback);
}

module.exports.deleteUser = function(id, callback){
    User.findByIdAndDelete(id, callback);
}