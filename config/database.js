//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
//'mongodb://localhost:27017/product402' 
//mongodb+srv://root:<password>@cluster-jus3j.gcp.mongodb.net/test
var mongoDB = 'mongodb://localhost:27017/product402';
mongoose.connect(mongoDB, {useNewUrlParser: true})
    .catch(error => handleError(error));

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
