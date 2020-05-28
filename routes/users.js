const express = require('express');
const router = express.Router();

const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

//Register Route
router.post('/add', (req,res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: 'password'
    });
    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg:'Failed to register user'})
        }else{
            res.json({success: true, msg: newUser.name + 'User Registered'})
        }
    })
});

//Authenticate Route
router.post('/authenticate', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.GetUserByEmail(email, (err,user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({user:user}, config.secret, {
                    expiresIn: 6000000
                });
                console.log("authenticate route token: " + token);
                res.json({success: true, token: 'bearer ' + token, user: {id: user._id, name:user.name, role: user.role, email: user.email}});
            } else {
                return res.json({success: false, msg: 'Wrong Password!'});
            }
        });
    });
});


//get all lm
router.get('/lmall', passport.authenticate('jwt', {session:false}), function (req,res) {
    User.getAllLineManagers(function (err, lineManagers){
        if(err) throw err;
        var data = [];

        for (var i = 0; i < lineManagers.length; i++){
            data.push(lineManagers[i].email);
        }

        res.json(data);
    })
});

//get all lm
router.get('/all', passport.authenticate('jwt', {session:false}), function (req,res) {
    User.getAllUsers(function (err, Users){
        if(err) throw err;
        var data = [];

        for (var i = 0; i < Users.length; i++){
            data.push(Users[i]);
        }

        res.json(data);
    })
});

router.get('/get/:_id', function(req,res){
    User.getUserByID(req.params._id, function(err,user){
        if(err) throw err;
        res.json(user);
    })
})

//update
router.put('/update/:_id', function(req,res){
    let updatedUser = {
        name: req.body.name, 
        email: req.body.email,
        role: req.body.role,
    };

    User.updateUser(req.params._id, updatedUser, function(err,user){
        if(err) throw err;
        res.json(user);
    })
})


router.delete('/delete/:_id', function(req,res){
    User.deleteUser(req.params._id, function(err,user){
        if(err) throw err;
        res.json(user);
    })
})



module.exports = router;