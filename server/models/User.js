// User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

// Define collection and schema for Business
let User = new Schema({
    firstName: {
        type: String,
        default:''
    },
    lastName: {
        type: String,
        default:''
    },
    email: {
        type: String,
        default:''
    },
    password: {
        type: String,
        default:''
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    collection: 'user'
});

User.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};

User.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', User);