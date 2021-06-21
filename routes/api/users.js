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
const validatePass = require('../../validation/changePassword');
const validateUpdateUser = require('../../validation/updateUser');


// @route GET api/users
// @desc Get all user and sort them by email
// @access private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.find()
        .sort({email: 1})
        .then(users => res.json(users))
        .catch(err => res.status(404).json({notFound: 'List of users empty'}))
})

// @route GET api/users/user/:id
// @desc Get user by id
// @access private
router.get('/user/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findById(req.params.id)
        .then(user => {res.json(user)})
        .catch(err => res.status(404).json({notFound: 'User not found'}))
});

// @route GET api/users/current
// @desc Returns current user
// @access private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
        firstLogin: req.user.firstLogin
    });
});

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
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    isAdmin: req.body.isAdmin,
                    dateOfBirth: req.body.dateOfBirth,
                    typeOfPosition: req.body.typeOfPosition,
                    hiredDate: req.body.hiredDate,
                    contractDuration: req.body.contractDuration,
                    terminationDate: req.body.terminationDate,
                    orgLevel: req.body.orgLevel,
                    status: req.body.status,
                    durationOfPreviousService: req.body.durationOfPreviousService,
                    linkToPersonalFolder: req.body.linkToPersonalFolder
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

// @route PUT api/users/update
// @desc Edit user
// @access private
router.put('/update', passport.authenticate('jwt', {session: false}), (req, res) => {

    const {errors, isValid} = validateUpdateUser(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newUser = {}

    if(req.body.name) {
        newUser.name = req.body.name
    }

    if(req.body.email) {
        newUser.email = req.body.email
    }

    if(req.body.isAdmin) {
        newUser.isAdmin = req.body.isAdmin
    }

    if(req.body.dateOfBirth) {
        newUser.dateOfBirth = req.body.dateOfBirth
    }

    if(req.body.typeOfPosition) {
        newUser.typeOfPosition = req.body.typeOfPosition
    }

    if(req.body.hiredDate) {
        newUser.hiredDate = req.body.hiredDate
    }

    if(req.body.contractDuration) {
        newUser.contractDuration = req.body.contractDuration
    }

    if(req.body.terminationDate) {
        newUser.terminationDate = req.body.terminationDate
    }

    if(req.body.orgLevel) {
        newUser.orgLevel = req.body.orgLevel
    }

    if(req.body.status) {
        newUser.status = req.body.status
    }

    if(req.body.durationOfPreviousService) {
        newUser.durationOfPreviousService = req.body.durationOfPreviousService
    }

    if(req.body.linkToPersonalFolder) {
        newUser.linkToPersonalFolder = req.body.linkToPersonalFolder
    }




    User.findByIdAndUpdate({_id: req.body._id}, {$set: newUser}, {new: true, useFindAndModify: false})
        .then(user => res.json(user))
        .catch(err => console.log(err))

})

// @route DELETE api/users/:id
// @desc delete an user
// @access private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    User.findById(req.params.id)
        .then(user => {
            user.remove().then(() => res.json({success: true}));
        })
        .catch(err => res.status(404).json({error: 'Ne postoji taj korisnik'}))

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
                                        
                                        User.findByIdAndUpdate({_id: req.body.id }, {$set: user}, {new: true, useFindAndModify: false})
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