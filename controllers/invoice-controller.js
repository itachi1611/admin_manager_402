var Invoice = require('../models/invoice');

module.exports.getOrder = function (req, res, next) {
    Invoice.find({}, function (err, invoices) {
        res.render('order', {
            title: 'Manager Order',
            invoices: invoices
        });
    });
};

module.exports.getOrderApi = function (req, res, next) {
    Invoice.find({}, function (err, invoices) {
        if (err) {
            res.json(invoices);
        }
        if (invoices.length == 0) {
            res.status(404).json(invoices)
        } else {
            res.status(200).json(invoices);
        }
    });
};

//Add product
module.exports.insertOrder = function (req, res, next) {
    // Define a JSONobject for the image attributes for saving to database
    // Create an instance of model SomeModel
    var invoice = new Invoice({
        customer_name: req.body.customer_name,
        shipping_address: req.body.address,
        payment_method: req.body.payment_method,
        payment_status: req.body.payment_status,
        product_name: req.body.product_name,
        product_quantity: req.body.product_quantity,
    });
    invoice.save()
        .then(item => {
            console.log('saved');
            res.redirect('/order');
        })
        .catch(err => {
            console.log('unsaved');
        });
};

//Edit product
module.exports.editOrder = function (req, res, next) {
    Invoice.findByIdAndUpdate(
        req.body.iid, {
            customer_name: req.body.customer_name,
            shipping_address: req.body.address,
            payment_method: req.body.payment_method,
            payment_status: req.body.payment_status,
            product_name: req.body.product_name,
            product_quantity: req.body.product_quantity,
        },
        function (err) {
            res.redirect("/order");
        }
    );
};

//Remove product
module.exports.removeOrder = function (req, res, next) {
    Invoice.findByIdAndRemove(req.body.iid,
        function (err) {
            res.redirect('/order');
        }
    )
};
