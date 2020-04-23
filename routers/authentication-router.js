//Cái này quản lý router cho đăng nhập đăng kí
//Ví dụ bên product-router

var express = require('express');
const bodyParser = require('body-parser');

var router = express.Router();

var authenticationController = require('../controllers/authentication-controller');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extended: false});

/**
 * Method : POST
 * Đăng nhập
 *
 */
router.get('/login', urlencodedParser, authenticationController.onLogin);

/**
 * Method: POST
 * Đăng kí
 */
router.post('/register', urlencodedParser, authenticationController.onRegister);

module.exports = router;