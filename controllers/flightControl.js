const express = require('express');
const Data = require('../models/openSky.js');
const router = express.Router();
const bcrypt = require('bcrypt');


// NEW
router.get('/new', (req, res) => {

})

// EDIT
router.get('/:id/edit', (req, res) => {

})

// DELETE
router.delete('/:id', (req, res) => {

})

// SHOW
router.get('/:id', (req, res) => {

})

// UPDATE
router.put('/:id', (req, res) => {

})

// CREATE
router.post('/', (req, res) => {

})

// INDEX
router.get('/', (req, res) => {
    if(req.session.user){
        res.render(
            'flights/index.ejs',
            {
            user:req.session.user
            }
        );
    } else {
        res.redirect('/');
    }
})


module.exports = router;