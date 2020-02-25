const express = require('express');
const router = express.Router();

const Starter = require('../models/starter');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

//Register Route
router.post('/starter', (req,res) => {
    let newStarter = new Starter({
        name: req.body.name,
        email: req.body.email,
        jobTitle: req.body.jobTitle,
        jobLevel: req.body.jobLevel,
        department: req.body.department,
        lineManager: req.body.lineManager,
        state: req.body.state,
        buildingAccess: req.body.buildingAccess
    });
    console.log(newStarter);
    Starter.addStarter(newStarter, (err, user) => {
        if(err){
            res.json({success: false, msg:'Failed to register user'})
        }else{
            res.json({success: true, msg: newStarter.name + 'User Registered'})
        }
    })
});

router.get('/requests', function (req,res) {
    Starter.getAllStarters(req,res);


});

module.exports = router;