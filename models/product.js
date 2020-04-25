const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type:String,
    //contentType: String,
    required:false
  }
});

//Export model
module.exports = mongoose.model('product', productSchema);