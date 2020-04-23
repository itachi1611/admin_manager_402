const mongoose = require('mongoose');
//Đây là đối tượng user cho bảng users
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

//Export model
module.exports = mongoose.model('user', userSchema);