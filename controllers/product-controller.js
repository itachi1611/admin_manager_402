var Product = require('../models/product');

module.exports.getProduct = function (req, res, next) {
    Product.find({}, function (err, products) {
        res.setHeader('Content-Type', 'application/json');
        products.forEach(product => {
            res.send(JSON.stringify({
                name:product.name,
                price:product.price,
                description:product.description
            }));
        });
        res.render('product', {
            title: 'Manager Product',
            products: products
        });
    });
};

//Add product
module.exports.insertProduct = function (req, res, next) {
    // Create an instance of model SomeModel
    var product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    });

    // Save the new model instance, passing a callback
    product.save(function (err) {
        if (err) return handleError(err);
        console.log('saved');
        res.redirect('/product');
    });
};

//Edit product
module.exports.editProduct = function (req, res, next) {
    Product.findByIdAndUpdate(req.body.pid, {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        },
        function (err) {
            res.redirect('/product');
        }
    )
};
//Remove product
module.exports.removeProduct = function (req, res, next) {
    Product.findByIdAndRemove(req.body.pid,
        function (err) {
            res.redirect('/product');
        }
    )
};

//Get all product api
module.exports.getProductsApi = function (req, res, next) {
    Product.find({}, function (err, products) {
        res.json(products)
    });
};