const mongoose = require('mongoose');
const config = require('../config/database');

//starter Schemea 
const StarterSchema = mongoose.Schema({
    dateCreated:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: false
    },
    jobTitle:{
        type: String,
        required: true
    },
    employeeType:{
        type: String,
        required: true
    },
    division:{
        type: String
    },
    department:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    floor:{
        type: String,
        required: true
    },
    company:{
        type: String,
        required: true
    },
    lineManager:{
        type: String,
        required: true
    },
    startDate:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    propertyState:{
        type: String
    },
    baComplete:{
        type: Boolean
    },
    srComplete:{
        type: Boolean
    },
    hrComplete:{
        type: Boolean
    },
    ItState:{
        type: String
    },
    buildingAccess:[{
        _id:String,
        country: String,
        building: String,
        floor: String,
        room: String,
        officeArea: Boolean,
        equiptmentArea: Boolean,
        state:String
    }],
    softwareRequest:[{
        _id: String,
        supplier: String,
        description: String,
        accountType: String,
        state:String
    }],
    hardwareRequest:[{
        _id:String,
        manufacturer: String,
        model: String,
        deviceType: String,
        state:String
    }]
});

const Starter = module.exports = mongoose.model('Starter', StarterSchema);

module.exports.GetStarterByID = function(id, callback){
    const query = {_id: id};
    Starter.findOne(query, callback);
    //Starter.findById(id, callback);
}

module.exports.GetStarterByName = function(firstName, lastName, callback){
    const query = {firstName: firstName, lastName: lastName}
    Starter.findOne(query, callback);
}

module.exports.GetStarterByEmail = function(email, callback){
    const query = {email: email}
    Starter.findOne(query, callback);
}


//get all
module.exports.getAllStarters = function(callback){
    // var collection = Starter.collection("starters");
     Starter.find(callback)
 }

 //get lm
 module.exports.getLmStarters = function(email, callback){
    // var collection = Starter.collection("starters");
     Starter.find( { lineManager: { $eq: email } }, callback);
 }

  //get it
  module.exports.getItStarters = function(callback){
    // var collection = Starter.collection("starters");
     Starter.find({$or:[{ softwareRequest: { $exists:true, $ne:[] } }, { hardwareRequest: { $exists: true, $ne: [] } } ]} , callback)
 }

   //get property
   module.exports.getPropertyStarters = function(callback){
    // var collection = Starter.collection("starters");
     Starter.find({buildingAccess: { $exists:true, $ne:[]}}, callback)
 }

module.exports.addStarter = function(newStarter, callback){
    newStarter.save(callback);
}

 module.exports.updateStarter = function(id, newStarter, callback){
    Starter.findByIdAndUpdate(id, newStarter, callback);
}

module.exports.deleteStarter = function(id, callback){
    Starter.findByIdAndDelete(id, callback);
}

module.exports.getStarter = function(id, callback){
    //const query = {_id: id};
    //Starter.findOne(query, callback);
    //Starter.findById(id, callback);
    Starter.findById(id, callback);
}

module.exports.updateFeild = function(id, value , callback){
    Starter.findByIdAndUpdate(id, {$set:{"state" : value}}, callback)
    console.log(callback);
}


