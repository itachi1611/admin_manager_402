var User = require('../models/user');

module.exports.getUser = function (req, res, next) {
    User.find({}, function (err, users) {
        res.render('user', {
            title: 'Manager User',
            users: users
        });
    });
};

//Edit product
module.exports.editUser = function (req, res, next) {
    console.log(req.body.uid);
    User.findOneAndUpdate({
                _id: req.body.uid
            }, {
                $set: {
      // image: req.body.image,
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address
    }}, {
        returnNewDocument: true,
        new: true,
        strict: false
    }, 
    function (err, num) {
        res.redirect('/user')
    });
};

/**
 * API
 * Method: POST
 * Edit user
 */
module.exports.editUserApi = function(req, res, next) {
    User.findOneAndUpdate({
        _id: req.body.uid
    }, {
        $set: {
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            updateAt: Date.now()
        }
    }, {
        returnNewDocument: true,
        new: true, 
        strict: false
    }, function(err, num) {
        if(err) {
            res.status(404).json(num);
        }
        if(num > 0) {
            res.status(200).json(num);
        }
    });
}

//Remove product
module.exports.removeUser = function (req, res, next) {
    console.log(req.body.pid);
    User.findByIdAndRemove(req.body.pid,
        function (err) {
            res.redirect('/user');
        }
    )
};
