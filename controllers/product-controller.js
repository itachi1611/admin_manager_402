const fs = require('fs');
const path = require('path');
const multer = require('multer');
var Product = require('../models/product');

var img_name;
//Config Multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        img_name = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
        cb(null, img_name);
    }
})


var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).array("picture", 5);

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

module.exports.getProduct = function (req, res, next) {
    Product.find({}, function (err, products) {
        res.render('product', {
            title: 'Manager Product',
            products: products
        });
    });
};

module.exports.getProductApi = function (req, res, next) {
    Product.find({}, function (err, products) {
        let result = [];
        res.setHeader('Content-Type', 'application/json');
        products.forEach(product => {
            result.push({
                name:product.name,
                price:product.price,
                description:product.description,
                image: product.image
            });
        });
        res.send(JSON.stringify(result));
    });
};

//Add product
module.exports.insertProduct = function (req, res, next) {
    // Define a JSONobject for the image attributes for saving to database
    // Create an instance of model SomeModel
    upload(req, res, function (err) {
        if (err) {
            console.log("Something went wrong!");
        }
        var path = "uploads/" + img_name;
        var image = fs.readFileSync(path);
        var encode_image = image.toString('base64');
        console.log("File uploaded sucessfully!.");
        var product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            local_image: img_name,
            buffer_image: Buffer.from(encode_image, 'base64')
        });
         console.log(Buffer.from(encode_image, "base64"));
        // Save the new model instance, passing a callback
        product.save()
            .then(item => {
                console.log('saved');
                res.redirect('/product');
            })
            .catch(err => {
                console.log('unsaved');
            });
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

