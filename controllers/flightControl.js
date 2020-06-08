const express = require('express');
const Data = require('../models/openSky.js');
const router = express.Router();
const fetch = require("node-fetch");
require('dotenv').config()

// SHOW
router.get('/:id', (req, res) => {

})

// INDEX
router.get('/', (req, res) => {
    if(req.session.user){
        res.render(
            'flights/home.ejs',
            {
            user:req.session.user
            }
        );
    } else {
        res.redirect('/');
    }
})


module.exports = router;