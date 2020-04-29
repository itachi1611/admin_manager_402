const express = require('express');
const bodyParser = require('body-parser');

var router = express.Router();

var authenticationController = require('../controllers/authentication-controller');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extended: false});

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

/**
 * API
 * POST
 * Login
 * Content - Type: application / x - www - form - urlencoded
*/
router.post('/api/login', urlencodedParser, authenticationController.onLoginApi);

/**
 * API
 * POST
 * Register
 * Content - Type: application/x-www-form-urlencoded
 */
router.post('/api/register', urlencodedParser, authenticationController.onRegisterApi);

module.exports = router;
