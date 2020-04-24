var Product = require('../models/product');

module.exports.getProduct = function (req, res, next) {
    Product.find({}, function (err, products) {
        // let result = [];
        // res.setHeader('Content-Type', 'application/json');
        // products.forEach(product => {
        //     result.push({
        //         name:product.name,
        //         price:product.price,
        //         description:product.description
        //     });
        // });
        // res.send(JSON.stringify(result));
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
      // image: req.body.image,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
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
    Product.findByIdAndUpdate(
      req.body.pid,
      {
        // image: req.body.image,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      },
      function (err) {
        res.redirect("/product");
      }
    );
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