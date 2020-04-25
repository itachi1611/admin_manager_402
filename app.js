//Config Express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//Init router
const commonRouter = require('./routers/common-router');
const productRouter = require('./routers/product-router');
const authenticationRouter = require('./routers/authentication-router');

//Init connection to MongoDB
const initMongoServer = require('./config/database');

const app = express();

app.use(express.static(__dirname));

//Config EJS
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('views', './views');

//Config Multer
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
var upload = multer({storage: storage});

//Start server
const port = process.env.PORT || '3000';

// Middleware
app.use(bodyParser.json());
app.listen(port, () => console.log(`Running on localhost:${port}`));

initMongoServer();

//Config Router/Render
app.use(commonRouter);
app.use(productRouter);
app.use(authenticationRouter);

//Redirect if page not found
app.get('*', (req, res) => res.status(404).render('page/page-404'));

