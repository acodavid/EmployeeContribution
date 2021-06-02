const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');
const nodemailer = require('nodemailer');

// models
const User = require('../../models/User');

// Validation
const validateRegister = require('../../validation/registration');
const validateLogin = require('../../validation/login');
const validatePass = require('../../validation/changePassword')


// @route POST api/users/register
// @desc Registration of user
// @access public
router.post('/register', (req, res) => {

    const {errors, isValid} = validateRegister(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {

            if(user) {
                errors.email = 'User with that email already exists!';
                return res.status(400).json(errors);
            } else {
                const newUser = new User({
                    email: req.body.email,
                    password: req.body.password,
                    isAdmin: req.body.isAdmin
                });

                // sifrovanje password-a pomocu bcrypt biblioteke
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })

                // NODEMAILER  -- for sending mails to user

            }

        })

})

// @route POST api/users/login
// @desc Login user, returns JWT token
// @access public
router.post('/login', (req, res) => {

    const {errors, isValid} = validateLogin(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const {email, password} = req.body;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'Employee with this email doesn\'t exists';
                return res.status(400).json(errors);
            };

            // uporedjivanje pasword-a
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            id: user.id,
                            email: user.email,
                            isAdmin: user.isAdmin,
                            firstLogin: user.firstLogin
                        }

                        jwt.sign(payload, keys.secretOrKey, {expiresIn: '8h'}, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token,
                                user: {
                                    id: user._id,
                                    email: user.email,
                                    isAdmin: user.isAdmin,
                                    firstLogin: user.firstLogin
                                }
                            });
                        });
                    } else {
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors);
                    }

                })
        })
        

})

// @route PUT api/users/changepassword
// @desc Changing of the password
// @access private
router.put('/changepassword', passport.authenticate('jwt', {session: false}), (req, res) => {

    const {errors, isValid} = validatePass(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const { id, currentPassword, newPassword, newPasswordConfirmation } = req.body;

    User.findById(id)
        .then(user => {

            bcrypt.compare(currentPassword, user.password)
                    .then(isMatch => {

                        if(isMatch) {

                            if (newPassword !== newPasswordConfirmation) {
                                errors.newPasswordConfirmation = 'Password are not matching';
                                return res.status(400).json(errors);
                            } else {
                                bcrypt.genSalt(10, (err, salt) => {
                                    bcrypt.hash(newPassword, salt, (err, hash) => {
                                        if (err) throw err;
                                        user.password = hash;
                                        user.firstLogin = false;
                                        
                                        User.findByIdAndUpdate({_id: req.body.id }, {$set: user}, {new: true})
                                            .then(user => res.json(user));
                                    })
                                })
                            }

                        } else {
                        errors.currentPassword = 'Please insert correct current password';
                        return res.status(400).json(errors);
                        }

                    })

        })
        .catch(err => {
            console.log(err)
        })

})

module.exports = router;