var User = require('../models/user');

//Login
module.exports.onLogin = function (req, res, next) {
    //Đoạn này phải xứ lý lấy email và password từ form lên và so sánh từ trong db
    User.find({}, function (err, users) {
        res.render('dashboard', {
            title: 'Manager Product',
            users: users
        });
    });
};

//Register
module.exports.onRegister = function (req, res, next) {
    // Create an instance of model SomeModel
    var user = new User({
        email: req.body.email,
        password: req.body.password
    });

    // Save the new model instance, passing a callback
    user.save(function (err) {
        if (err) return handleError(err);
        console.log('saved');
        res.redirect('/dashboard');
    });
};