const express = require('express');
const router = express.Router();

const Starter = require('../models/starter');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

//add
router.post('/add', (req,res) => {
/*     var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy; */

    let newStarter = new Starter({
        dateCreated: new Date(),
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
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
        baComplete: false,
        srComplete: false,
        hrComplete: false,
    });

    Starter.addStarter(newStarter, (err, user) => {
        if(err){
            res.json({success: false, msg:'Failed to register user'})
        }else{
            res.json({success: true, msg: newStarter.firstName + ' User Registered'})
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

router.get('/property', passport.authenticate('jwt', {session:false}), function (req,res) {
    Starter.getPropertyStarters(function (err, starters){
        if(err) throw err;
        res.json(starters);
    });
});

//update
router.put('/update/:_id', function(req,res){
    let updatedStarter = {
        dateCreated: req.body.dateCreated,
        firstName: req.body.firstName, 
        lastName: req.body.lastName, 
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
        propertyState: req.body.propertyState,
        ItState: req.body.ItState,
        baComplete: req.body.baComplete,
        srComplete: req.body.srComplete,
        hrComplete: req.body.hrComplete,
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

router.post('/state', (req,res) => {
    console.log(req.body);
    Starter.GetStarterByID(req.body._id,(err, user) => {
        if(err){
            res.json({success: false, msg:'Failed to find user'})
        }else if (user){
            console.log('got user');
            if(user.baComplete === true && user.srComplete === true && user.hrComplete === true){
                console.log('all states complete');
                Starter.updateFeild(user._id, 'Complete', function(err,starter){
                    if(err) throw err;
                    console.log('set to complete')
                    res.json({success: true, msg:'State Updated to Complete'});
                })
            }else{
                res.json({success: true, msg:'Not All Requests Complete'})
                console.log("lol")
            }
        }
    })
}

)

router.put('/comment/:_id', function(req,res){
    let comment = {
        sentBy: req.body.sentBy,
        comment: req.body.comment,
        time: req.body.time
    }

    Starter.addComment(req.params._id, comment, (err, callback) => {
        if(err){
            res.json({success: false, msg:'Failed to add comment'})
        }else if(callback){
            res.json({success: true, msg:'Comment Added'})
        }
    })
})

router.get('/comments/:_id', function(req,res){
    Starter.getStarter(req.params._id, function(err,starter){
        if(err){
            res.json({success: false, msg:'Failed to get comments'})
        }else if(starter){
            res.json(starter.comments)
        }
    })
})


module.exports = router;