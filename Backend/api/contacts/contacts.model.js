const mongoose = require('mongoose');
const User = require('../users/users.model');

const contactSchema = mongoose.Schema({
    contactName: {
        type: String,
        required: [true, 'The contactname is required'],
    },
    email: String,
    contacted: Boolean,
    user: {
        type: String,
        required: [true, 'The user is required'],
        validate: {
            validator: (owner) => {
                return User.find({userName:owner})
                    .then(doc => {
                        if(doc.length === 0){
                            return false;
                        }
                        return true;
                    })
                    .catch(error => false);
                },
                message: "This user not exist" 
        }
    }
});

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;