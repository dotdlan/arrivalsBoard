const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    name: String,
    dob: Date,
    alerts: Boolean,
    homeAirport: String,
    flightTrack: String
});

const User = mongoose.model('User', userSchema)
module.exports = User