const mongoose = require('mongoose');
const Schema = mongoose.Schema

const airportSchema = new mongoose.Schema({
    icao: String,
    iata: String,
    name: String,
    city: String,
    state: String,
    country: String,
    elevation: Number,
    lat: String,
    long: String,
    tz: String

})

const Airport = mongoose.model('Airport', airportSchema)
module.exports = Airport