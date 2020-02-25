const express = require('express');
const router = express.Router();

const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

//Register Route
router.post('/register', (req,res) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password
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
                    expiresIn: 604800 //1 week
                });
                console.log("authenticate route token: " + token);
                res.json({success: true, token: 'bearer ' + token, user: {id: user._id, username: user.username, email: user.email}});
            } else {
                return res.json({success: false, msg: 'Wrong Password!'});
            }
        });
    });
});

module.exports = router;