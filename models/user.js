const mongoose = require('mongoose');
const crypto = require('crypto');

//Đây là đối tượng user cho bảng users
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 20,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isAdmin: Boolean,
  phone: {
      type: String,
      required: false
  },
  name: {
    type: String,
    required: false
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
}, {
  strict: false
});

var genRandomString = function(length) {
  return crypto.randomBytes(Math.ceil(length/2))
  .toString('hex').slice(0, length);
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({
        _id: user._id.toString(),
        isAdmin: this.isAdmin,
        expiresIn: "7 days"
    }); 
    user.tokens = user.tokens.concat({token});
    await user.save()
    return token;
}

var sha512 = (password, salt) => {
  var hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  var value = hash.digest('hex');
  return {
    salt: salt,
    password: value
  }
}

userSchema.methods.saltHashPassword = function(password) {
  var salt = genRandomString(16); //Create 16 random characters
  return sha512(password, salt);
}

userSchema.methods.checkHashPassword = function(passwordm, salt) {
  return passwordData = sha512(password, salt);
}

//Export model
module.exports = mongoose.model('user', userSchema);