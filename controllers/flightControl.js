const express = require('express');
const Data = require('../models/openSky.js');
const router = express.Router();
const fetch = require("node-fetch");
require('dotenv').config()
const Airports = require('../models/airports.js')

let selectedAirport = 'kaus'
let fetchAirportUrl = `http://${process.env.FA_NAME}:${process.env.FA_KEY}@flightxml.flightaware.com/json/FlightXML2/Enroute?filter=airline&airport=`
let fetchFlightUrl = `http://${process.env.FA_NAME}:${process.env.FA_KEY}@flightxml.flightaware.com/json/FlightXML2/InFlightInfo?ident=`
const staticURL = "https://maps.googleapis.com/maps/api/staticmap?maptype=hybrid&size=300x300";

router.get('/', (req, res) =>{
    fetch(fetchAirportUrl + selectedAirport)
        .then(response => response.json())
        .then(data => {
            const arrivalData = data.EnrouteResult.enroute
            //will use promises to fulfill my findOne req
            const promises = []
            //let's translate some of the data to something more human readable
            for(let i = 0; i < arrivalData.length; i++) {
                //First, let's translate origin time from epoch to human
                let epochTime = arrivalData[i].estimatedarrivaltime;
                let humanTime = new Date(epochTime * 1000)
                arrivalData[i].estimatedarrivaltime = humanTime.toLocaleTimeString('en-US')
                //Next, let's convert those origin icao airport codes to iata city codes
                const originPromise = new Promise(resolve => {
                    Airports.findOne({icao: arrivalData[i].origin}, (err, airport) => {
                        arrivalData[i].origin = airport.iata
                        resolve()
                    })
                })
                //let's do the same thing for the dest airport codes
                const destinationPromise = new Promise(resolve => {
                    Airports.findOne({icao: arrivalData[i].destination}, (err, airport) => {
                        arrivalData[i].destination = airport.iata
                        resolve()
                    })
                })
                //each time through the loop, let's add this to my array of promises
                promises.push(originPromise)
                promises.push(destinationPromise)
            }
            Promise.all(promises)
                .then(() => {
                    res.render('flights/index.ejs',
                        {
                            data:arrivalData,
                            user:req.session.user
                        })
                })

        })
})

router.post('/search/', (req, res) => {
    let userInfo = ''
    if (req.session.user !== undefined) {
        userInfo = req.session.user.username
    }
    let searchTerm = req.body.input[0]
    const hasNumbers = (str) => {
        let regex = /\d/g;
        return regex.test(str);
    }

    //let's first test for a 3 digit city code
    if (searchTerm.length === 3) {
        console.log('if wins, probably city code')
        Airports.findOne({iata: searchTerm}).then(foundAirport => {
            selectedAirport = foundAirport.icao
            res.redirect('/flight')
        })
        //Then, let's test for a flight number by checking for a number in the query
    } else if (hasNumbers(searchTerm)) {
        console.log('else if wins, probably a flight number')
        res.redirect(`/flight/detail/${searchTerm}`)
        //Then, let's try a city, and if all else fails, set selectedAirport to katl
    } else {
        console.log('else wins, probably a city')
        Airports.find({city: searchTerm}).then(foundAirport => {

        })
    }
})

// Show detail status on a specific flight
router.get('/detail/:id', (req, res) => {
    fetch(`https://${process.env.FA_NAME}:${process.env.FA_KEY}@flightxml.flightaware.com/json/FlightXML2/InFlightInfo?ident=${req.params.id}`)
        .then(response => response.json())
        .then(data => {
            flightData = data.InFlightInfoResult
            mapURL = `${staticURL}&zoom=5&markers=color:blue|${flightData.latitude},${flightData.longitude}&key=${process.env.GMAPS_KEY}`
            res.render('flights/show.ejs',
                {
                    user: req.session.user,
                    flight: flightData,
                    gmap: mapURL
                })
         })
})

module.exports = router;