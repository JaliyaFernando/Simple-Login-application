// UserSession.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let UserSession = new Schema({
    userID: {
        type: String,
        default: ''
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    collection: 'userSession'
});

module.exports = mongoose.model('UserSession', UserSession);