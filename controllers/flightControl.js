const express = require('express');
const Data = require('../models/openSky.js');
const router = express.Router();
const fetch = require("node-fetch");
require('dotenv').config()

// Show detail status on a specific flight
router.get('/:id', (req, res) => {
    fetch(`https://${process.env.FA_NAME}:${process.env.FA_KEY}@flightxml.flightaware.com/json/FlightXML2/InFlightInfo?ident=${req.params.id}`)
        .then(response => response.json())
        .then(data => {
            flightData = data.InFlightInfoResult
            res.render('flights/show.ejs',
                {
                    user: req.session.user,
                    flight: flightData
                })
         })
})

module.exports = router;