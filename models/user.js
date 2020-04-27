const mongoose = require('mongoose');

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

//Export model
module.exports = mongoose.model('user', userSchema);