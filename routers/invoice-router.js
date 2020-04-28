var express = require('express');
const bodyParser = require('body-parser');

var router = express.Router();

var invoiceController = require('../controllers/invoice-controller');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

/* GET order page. */
router.get('/order', invoiceController.getOrder);

/* API GET order list */
router.get('/api/order', invoiceController.getOrderApi);

/* POST order add page. */
router.post('/order/add', urlencodedParser, invoiceController.insertOrder);

/* POST order edit page. */
router.post('/order/edit', urlencodedParser, invoiceController.editOrder);

/* POST order remove page. */
router.post('/order/remove', urlencodedParser, invoiceController.removeOrder);

/* GET order json api. */
//router.get('/product/data', productController.getProductsApi);

module.exports = router;