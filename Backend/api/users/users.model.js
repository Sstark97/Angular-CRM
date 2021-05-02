const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'The username is required'],
        unique: [true, 'These username just exist']
    },
    name: String,
    email: {
        type: String,
        required: [true, 'The email is required']
    },
    contactsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contact',
    }],
    password: {
        type: String,
        required: [true, "The password is empty"],
        validate: {
            validator: (password) => {
                if(password.length >= 8){
                    return true;
                } else if(password.indexOf(/[A-Z]/) >= 1 || password.indexOf(/[0-9]/) >=1){
                    return true
                } else {
                    return false;
                }
            },
            message: 'The password required any capital letter and any number'
        }
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;