//Import the mongoose module
const mongoose = require('mongoose');

//Set up default mongoose connection
//mongodb://localhost:27017/product402
//mongodb+srv://root:root@cluster-jus3j.gcp.mongodb.net/test?retryWrites=true&w=majority
//mongodb+srv://admin:<password>@cluster0-rz40k.mongodb.net/product402
const mongoDB =
  "mongodb+srv://root:root@cluster-jus3j.gcp.mongodb.net/test?retryWrites=true&w=majority" ||
  process.env.MONGODB_URI;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}
const initMongoServer = async() => {
    try {
        await mongoose.connect(mongoDB, options);
        console.log("Connected to DB !!");
    } catch (e) {
        console.log(e);
        throw e;
    }
};

 //Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", (error) =>
console.error.bind(
    console,
    "MongoDB connection error:" + error.name
)
);
db.on("connected", () =>
console.error.bind(console, "mongo: Connected")
);
db.on("disconnected", () =>
console.error.bind(console, "mongo: Disconnected")
);

module.exports = initMongoServer;
