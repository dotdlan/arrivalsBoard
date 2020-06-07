const mongoose = require('mongoose');
const Schema = mongoose.Schema

const flightSchema = new mongoose.Schema({
    flightNumber: String,
    operator: String,
    Latitude: Number,
    Longitude: Number,
    timePosition: Number,
    Velocity: Number,
    trueTrack: Number,
    vertRate: Number,
    geoAltitude: Number,
    origin: String,
    destination: String,
})

const Flight = mongoose.model('Flight', flightSchema)
module.exports = Flight