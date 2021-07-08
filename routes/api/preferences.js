const express = require('express');
const router = express.Router();
const passport = require('passport');

// Models 
const DailyPreference = require('../../models/DailyPreference');
const User = require('../../models/User');

// Validation
const validatePreferences = require('../../validation/dailyPreferences');

// @route GET api/preferences/current
// @desc Get preference for current user
// @access private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    DailyPreference.findOne({user: req.user._id})
        .then(pref => {
            res.json(pref);
        })
        .catch(err => {
            console.log(err);
        })
})

// @route GET api/preferences/preference/:id
// @desc Get preference for current user
// @access private
router.get('/preference/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    DailyPreference.findById(req.params.id)
        .then(pref => {
            res.json(pref);
        })
        .catch(err => {
            console.log(err);
        })
})



// @route POST api/preferences/create
// @desc Creating my personal daily preferences
// @access private
router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {

    const {errors, isValid} = validatePreferences(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    DailyPreference.findOne({user: req.body.user})
        .then(pref => {
            if(pref) {
                errors.user = 'This user already have preference initialized';
                return res.status(400).json(errors);
            } else {
                const newPref = new DailyPreference({
                    user: req.body.user,
                    remoteOrOffice: req.body.remoteOrOffice,
                    workingFrom: req.body.workingFrom,
                    workingTo: req.body.workingTo,
                    onPauseFrom: req.body.onPauseFrom,
                    onPauseTo: req.body.onPauseTo
                })
                newPref.save()
                    .then(pref => {
                        res.json(pref)
                    })
                    .catch(err => console.log(err))

                

               
                
            }
        })

})

// @route POST api/preferences/set/preference-created
// @desc Creating my personal daily preferences
// @access private
router.post('/set/preference-created', passport.authenticate('jwt', { session: false }), (req, res) => {

    User.findById(req.body.id)
        .then(user => {
            user.preferenceCreated = true;

            User.findByIdAndUpdate({_id: req.body.id }, {$set: user}, {new: true, useFindAndModify: false})
                .then(user => res.json(user));
        })
        .catch(err => {
            console.log(err);
        })

})



// @route PUT api/preferences/update
// @desc Creating my personal daily preferences
// @access private
router.put('/update', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    const {errors, isValid} = validatePreferences(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newPref = {}

    if(req.body.user) {
        newPref.user = req.body.user
    }

    if(req.body.remoteOrOffice) {
        newPref.remoteOrOffice = req.body.remoteOrOffice
    }

    if(req.body.workingFrom) {
        newPref.workingFrom = req.body.workingFrom
    }

    if(req.body.workingTo) {
        newPref.workingTo = req.body.workingTo
    }

    if(req.body.onPauseFrom) {
        newPref.onPauseFrom = req.body.onPauseFrom
    }

    if(req.body.onPauseTo) {
        newPref.onPauseTo = req.body.onPauseTo
    }

    DailyPreference.findByIdAndUpdate({_id: req.body._id}, {$set: newPref}, {new: true, useFindAndModify: false})
        .then(pref => res.json(pref))
        .catch(err => console.log(err))

})


module.exports = router;