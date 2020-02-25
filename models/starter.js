const mongoose = require('mongoose');
const config = require('../config/database');

//starter Schemea 
const StarterSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    jobTitle:{
        type: String,
        required: true
    },
    jobLevel:{
        type: String,
        required: true
    },
    department:{
        type: String,
        required: true
    },
    lineManager:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    buildingAccess:[{
        country: String,
        building: String,
        floor: String,
        room: String,
        officeArea: Boolean,
        equiptmentArea: Boolean
    }]
});

const Starter = module.exports = mongoose.model('Starter', StarterSchema);

module.exports.getAllStarters = function(lol, callback){
   // var collection = Starter.collection("starters");
    Starter.find((err, res) => {
        if(err){
            return callback.status(500).send(err);
        }
        callback.send(res);
    });   
}

module.exports.GetStarterByID = function(id, callback){
    Starter.findById(id, callback);
}

module.exports.GetStarterByName = function(name, callback){
    const query = {name: name}
    Starter.findOne(query, callback);
}

module.exports.GetStarterByEmail = function(email, callback){
    const query = {email: email}
    Starter.findOne(query, callback);
}

module.exports.addStarter = function(newStarter, callback){
    newStarter.save(callback);
}
