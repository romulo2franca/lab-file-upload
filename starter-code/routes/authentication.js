const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login');

const User = require('../models/user')
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });


router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', {
        message: req.flash('error')
    });
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', {
        message: req.flash('error')
    });
});

// router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
//     successRedirect: '/',
//     failureRedirect: '/signup',
//     failureFlash: true
// }));

router.post('/signup', upload.single('picture'), (req, res) => {
    const { name, username, email, password } = req.body;

    if (username === "" || password === "") {
        res.render("authentication/signup", { message: "Indicate username and password" });
        return;
    }

    User.findOne({ username })
        .then(user => {
            if (user !== null) {
                res.render("authentication/signup", { message: "The username already exists" });
                return;
            }

            const salt = bcrypt.genSaltSync(bcryptSalt);
            const hashPass = bcrypt.hashSync(password, salt);


            const path = req.file.filename;
            const newUser = new User({
                name,
                username,
                email,
                password: hashPass,
                path: `/uploads/${path}`,
            })
            newUser.save(err => {
                if (err) {
                    res.render("authentication/signup", { message: "Something went wrong" });
                } else {
                    res.redirect("/");
                }
            })})
        .catch(err => {
            next(err);
        })
});

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user: req.user
    });
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;