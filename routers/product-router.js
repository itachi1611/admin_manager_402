var express = require('express');
const bodyParser = require('body-parser');

var router = express.Router();

var productController = require('../controllers/product-controller');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extended: false});

/* GET product page. */
router.get('/product', productController.getProductsApi);

/* API GET product list */
router.get('/api/product', productController.getProductsApi);

/* POST product add page. */
router.post('/product/add', urlencodedParser, productController.insertProduct);

/* POST product edit page. */
router.post('/product/edit', urlencodedParser, productController.editProduct);

/* POST product remove page. */
router.post('/product/remove', urlencodedParser, productController.removeProduct);

/* GET product json api. */
//router.get('/product/data', productController.getProductsApi);

module.exports = router;