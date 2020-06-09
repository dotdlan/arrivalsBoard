const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.get('/new', (req, res) => {
    res.render('session/new.ejs');
});

router.post('/', (req, res) => {
    User.findOne({username:req.body.username}, (error,foundUser) => {
        if(foundUser === null){
            res.redirect('/session/new');
        } else {
            const doesPasswordMatch = bcrypt.compareSync(req.body.password, foundUser.password);
            if(doesPasswordMatch){
                req.session.user = foundUser;
                res.redirect('/');
            } else {
                res.redirect('/session/new');
            }
        }
    })
})

router.get('/logout', (req, res) => {

    req.session.destroy(err => {
        if (err) {
            console.log(err)
        }
    })
    res.redirect('/')
})

module.exports = router;