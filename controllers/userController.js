const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/users.js');
const router = express.Router();


//render the signup page
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})

//a route for creating a user
router.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (error, createdUser) => {
        req.session.user = createdUser
        if (error){
            console.log(error)
        } else {
            res.redirect('/flight');
        }
    })
});


module.exports = router;