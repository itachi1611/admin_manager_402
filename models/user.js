const mongoose = require('mongoose');
const validator = require('validator')
//Đây là đối tượng user cho bảng users
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid !");
      }
    },
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 20,
    required: true,
    trim: true,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("Please enter your password");
      } else if (validator.equals(value.toLowerCase(), "password")) {
        throw new Error("Password is invalid!");
      } else if (validator.contains(value.toLowerCase(), "password")) {
        throw new Error("Password should not contain password!");
      }
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],
  isAdmin: Boolean,
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

//function to validate user 
function validateUser(user) {
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().min(6).max(20).required()
    };

    return Joi.validate(user, schema);
}

//Export model
module.exports = mongoose.model('user', userSchema);