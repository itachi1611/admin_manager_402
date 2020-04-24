const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

//Login
module.exports.onLogin = function (req, res, next) {
    
    // User.find({
    //     email: req.body.email, 
    //     password: req.body.password
    // }, function (err, users) {
    //     res.redirect('/dashboard', {
    //         title: 'Manager Product',
    //         users: users
    //     });
    // });
};

//Register
module.exports.onRegister = () => {
    // [
    //   check("email", "Please enter a valid email").not().isEmpty().isEmail(),
    //   check("password", "Please enter a valid password")
    //     .not()
    //     .isEmpty()
    //     .isLength({
    //       min: 6,
    //       max: 15,
    //     }),
    // ], async (req, res, next) => {
    //     const errors = validationResult(req);

    //     if (!errors.isEmpty()) {
    //       return res.status(400).json({
    //         errors: errors.array(),
    //       });
    //     }

    //     const { email, password } = req.body;

    //     try {
    //       let user = await User.findOne({
    //         email,
    //       });
    //       if (user) {
    //         return res.status(400).json({
    //           message: "User already exists",
    //         });
    //       }

    //       user = new User({
    //           email, 
    //           password
    //       });

    //       const salt = await bcrypt.genSalt(10);
    //       user.password = await bcrypt.hash(password, salt);
        
    //       //Save new register user
    //       await user.save();

    //       const payload = {
    //           user: {
    //               id: user.id
    //           }
    //       };

    //       jwt.sign(payload, "randomString", {
    //           expiresIn: 10000
    //       },(err, token) => {
    //         if(err) throw err;
    //         res.status(200).json({
    //             token
    //         });
    //       });
    //     } catch(err) {
    //         console.log(err.message);
    //     }
    //     console.log("saved");
    //     res.redirect("/dashboard");
    //   };
   
    // Create an instance of model SomeModel
    //Validate register form
    var user = new User({
        email: req.body.email,
        password: req.body.password,
    });

    // Save the new model instance, passing a callback
    user.save(function (err) {
        if (err) return handleError(err);
        console.log('saved');
        res.redirect('/dashboard');
    });
}
