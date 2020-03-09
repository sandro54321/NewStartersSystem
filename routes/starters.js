const express = require('express');
const router = express.Router();

const Starter = require('../models/starter');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

//add
router.post('/add', (req,res) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    let newStarter = new Starter({
        dateCreated: today,
        name: req.body.name, 
        email: req.body.email,
        jobTitle: req.body.jobTitle,
        employeeType: req.body.employeeType,
        division: req.body.division,
        department: req.body.department,
        lineManager: req.body.lineManager,
        location: req.body.location,
        floor: req.body.floor,
        company: req.body.company,
        startDate: req.body.startDate,
        state: "Open",
    });

    Starter.addStarter(newStarter, (err, user) => {
        if(err){
            res.json({success: false, msg:'Failed to register user'})
        }else{
            res.json({success: true, msg: newStarter.name + 'User Registered'})
        }
    })
});

//get All
router.get('/all', function (req,res) {
    Starter.getAllStarters(function (err, starters){
        if(err) throw err;
        res.json(starters);
    });
});

router.get('/lm/:lm', passport.authenticate('jwt', {session:false}), function (req,res) {
    Starter.getLmStarters(req.params.lm, function (err, starters){
        if(err) throw err;
        res.json(starters);
    });
});

router.get('/it', passport.authenticate('jwt', {session:false}), function (req,res) {
    Starter.getItStarters(function (err, starters){
        if(err) throw err;
        res.json(starters);
    });
});

//update
router.put('/update/:_id', function(req,res){
    let updatedStarter = {
        dateCreated: req.body.dateCreated,
        name: req.body.name, 
        email: req.body.email,
        jobTitle: req.body.jobTitle,
        employeeType: req.body.employeeType,
        division: req.body.division,
        department: req.body.department,
        lineManager: req.body.lineManager,
        location: req.body.location,
        floor: req.body.floor,
        company: req.body.company,
        startDate: req.body.startDate,
        state: req.body.state,
        buildingAccess: req.body.buildingAccess,
        softwareRequest: req.body.softwareRequest,
        hardwareRequest: req.body.hardwareRequest
    };

    Starter.updateStarter(req.params._id, updatedStarter, function(err,starter){
        if(err) throw err;
        res.json(starter);
    })
})

router.get('/get/:_id', function(req,res){
    Starter.getStarter(req.params._id, function(err,starter){
        if(err) throw err;
        res.json(starter);
    })
})

router.delete('/delete/:_id', function(req,res){
    Starter.deleteStarter(req.params._id, function(err,starter){
        if(err) throw err;
        res.json(starter);
    })
})



module.exports = router;