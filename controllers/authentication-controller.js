const storage = require("node-sessionstorage");
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
            if (req.body.password.localeCompare(user.password) == 1) {
                console.log("Incorrect password");
            } else if(!user.isAdmin) {
                console.log("You are not admin");
            } else {
                console.log(req.body.password);
                console.log(user.email);
                console.log(user.password);
                console.log("welcome " + user.email);
                storage.setItem("email", user.email);
                res.redirect('/dashboard');
            }
        }
    })
};

//Api Login
module.exports.onLoginApi = (req, res, next) => {
    var post_data = req.body;
    var email = post_data.email;
    var password = post_data.password;
    User.findOne({
        email: email,
    }, function (err, user) {
        if (err) {
            res.json(user);
        }
        if (!user) {
            res.status(404).json(user)
        } else {
            if (password.localeCompare(user.password) == 1) {
                res.status(401).json(user)
            } else {
                res.status(200).json(user);
            }
        }
    })
}

//Api Register
module.exports.onRegisterApi = (req, res, next) => {
    // Create an instance of model SomeModel
    //Validate register form
    var post_data = req.body;
    var email = post_data.email;
    var password = post_data.password;
    var user = new User({
        email: email,
        password: password,
        isAdmin: false,
        name: "",
        phone: ""
    });

    // Save the new model instance, passing a callback
    user.save(function (err) {
        if (err) return handleError(err);
        res.status(200).json({mess: 'Register successfully !'});
    });
}

//Register
module.exports.onRegister = (req, res, next) => {
    // Create an instance of model SomeModel
    //Validate register form
    var user = new User({
      email: req.body.email,
      password: req.body.password,
      isAdmin: true,
      name: "",
      phone: "",
    });

    // Save the new model instance, passing a callback
    user.save(function (err) {
        if (err) return handleError(err);
        console.log('saved');
        res.redirect('/login');
    });
}
