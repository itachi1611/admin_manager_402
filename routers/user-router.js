var express = require('express');
const bodyParser = require('body-parser');

var router = express.Router();

var userController = require('../controllers/user-controller');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

/* GET user page. */
router.get('/user', userController.getUser);

/* POST user edit page. */
router.post('/user/edit', urlencodedParser, userController.editUser);

/**
 * API
 * Methos: POST
 * Edit user
 */
router.post('/api/user/edit', urlencodedParser, userController.editUserApi);

/* POST user remove page. */
router.post('/user/remove', urlencodedParser, userController.removeUser);

module.exports = router;