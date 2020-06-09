// Dependencies
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session');
const fetch = require("node-fetch");

//config
const app = express()
const db = mongoose.connection
require('dotenv').config()
// PORT
const PORT = process.env.PORT || 3333
// Database
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
)
const Airports = require('./models/airports.js')
const airportSeed = require('./models/airportSeeds')

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// middleware
// use the public folder
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'))
app.use(session({
    secret:'batman',
    resave:false,
    saveUninitialized:false
}));

// controllers
const flightController = require('./controllers/flightControl')
app.use('/flight', flightController)
const usersController = require('./controllers/userController.js');
app.use('/users', usersController);
const sessionController = require('./controllers/sessionController.js');
app.use('/session', sessionController);

//home route
app.get('/', (req, res) => {
    fetch(`http://${process.env.FA_NAME}:${process.env.FA_KEY}@flightxml.flightaware.com/json/FlightXML2/Enroute?airport=katl&filter=airline`)
        .then(response => response.json())
        .then(data => {
            const arrivalData = data.EnrouteResult.enroute
            //will use promises to fulfill my findOne req
            const promises = []
            //let's translate some of the data to something more human readable
            for(let i = 0; i < arrivalData.length-1; i++) {
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
                promises.push(originPromise)
                promises.push(destinationPromise)
            }
            console.log(req.session.user)
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

// app.get('/seed', (req, res) => {
//     Airports.create(airportSeed, (err, data) => {
//   if (err) console.log(err.message)
//   console.log('added data')
// })
// })


app.listen(PORT, () => {
    console.log('Listening on port:', PORT)
})

