const express = require('express');
const bodyParser = require('body-parser');

var router = express.Router();

var authenticationController = require('../controllers/authentication-controller');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

/**
 * POST
 * Login
 */
router.post('/login', urlencodedParser, authenticationController.onLogin);

/**
 * POST
 * Register
 */
router.post('/register', urlencodedParser, authenticationController.onRegister);

module.exports = router;