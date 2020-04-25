const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

//Login
module.exports.onLogin = (req, res, next) => {
    User.findOne({email: req.body.email}, function (err, user) {
        if (err) {
            console.log(err);
        } 
        if (!user) {
            console.log("Wrong account information");
        } else {
            if (req.body.password.trim() != (user.password.trim())) {
                console.log("Incorrect password");
            }
            console.log(user.email);
            console.log(user.password);
            console.log("welcome " + user.email);
            res.redirect('/dashboard');
        }
    })
};

//Register
module.exports.onRegister = (req, res, next) => {
    // Create an instance of model SomeModel
    //Validate register form
    var user = new User({
        email: req.body.email,
        password: req.body.password,
        isAdmin: true
    });

    // Save the new model instance, passing a callback
    user.save(function (err) {
        if (err) return handleError(err);
        console.log('saved');
        res.redirect('/login');
    });
}
