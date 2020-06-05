const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({})

const Flight = mongoose.model('Flight', flightSchema)
module.exports = Flight