const express = require('express');
const router = express.Router();
const passport = require('passport');

// Models 
const DailyPreference = require('../../models/DailyPreference');

// Validation
const validatePreferences = require('../../validation/dailyPreferences');

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
                    .then(pref => res.json(pref))
                    .catch(err => console.log(err))
            }
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

    DailyPreference.findByIdAndUpdate({_id: req.body._id}, {$set: newUser}, {new: true, useFindAndModify: false})
        .then(pref => res.json(pref))
        .catch(err => console.log(err))

})


module.exports = router;