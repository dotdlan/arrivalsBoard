const express = require('express');
const Data = require('../models/openSky.js');
const router = express.Router();


// NEW
router.get('/new', (req, res) => {
    res.render(
        'router/new.ejs'
    )
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
    res.render('index.ejs')
})


module.exports = router;