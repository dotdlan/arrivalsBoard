const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/users.js');
const router = express.Router();


//render the signup page
router.get('/new', (req, res) => {
    res.render('users/new.ejs')
})

//create a user
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

//Render a user info update page
router.get('/edit', (req, res) => {
    const userInfo = req.session.user
    console.log(req.session)
    console.log(userInfo.username)
    if(userInfo.username){
        res.render('users/edit.ejs',
            {
                user: userInfo
            }
        )
    } else {
        res.send("you're not logged in <a href='/'>Log in</a>")
    }
})

//Update user info from update page
router.put('/edit/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateModel) => {
        console.log(req.body)
        res.send(updateModel)
    })
})

module.exports = router;