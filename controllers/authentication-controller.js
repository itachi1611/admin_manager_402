var User = require('../models/user');

module.exports.onLogin = function (req, res, next) {
    User.find({}, function (err, users) {
        res.render('dashboard', {
            title: 'Manager Product',
            users: users
        });
    });
};

//Add product
module.exports.onRegister = function (req, res, next) {
    // Create an instance of model SomeModel
    //Validate register form
    var user = new User({
        email: req.body.name,
        password: req.body.price,
    });

    // Save the new model instance, passing a callback
    user.save(function (err) {
        if (err) return handleError(err);
        console.log('saved');
        res.redirect('/dashboard');
    });
};