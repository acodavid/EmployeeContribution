const express = require('express');
const router = express.Router();
const passport = require('passport');
const PresenceAbsenceBusinessTrip = require('../../models/PresenceAbsenceBusinessTrip');
const Holiday = require('../../models/Holiday');

module.exports = router;

// @route GET /api/presence/absence/get/:id
// @desc Get by ID
// @access private
router.get('/get/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    PresenceAbsenceBusinessTrip.findById(req.params.id)
        .populate('user', ['name'])
        .then(data => res.json(data))
        .catch(err => res.status(404).json({error: 'Not Found'}))

})

// @route GET /api/presence/absence
// @desc gET ABSENCE-PRESENCE-BUSINESS TRIP specific date, specific user
// @access private
router.get('/:user/:date', passport.authenticate('jwt', {session: false}), (req, res) => {

    const startofDay = new Date(req.params.date);
    const endofDay = new Date(req.params.date);

    startofDay.setHours(0, 0, 0, 0);
    endofDay.setHours(23, 59, 59, 999);

    PresenceAbsenceBusinessTrip.find({"date": {"$gte": startofDay, "$lt": endofDay}, "user": req.params.user})
        .then(data => {
            
            if(data.length !== 0) {
                res.json(data);
            } else {
                res.status(404).json({error: "There is no data for selected date"})
            }

        })


})

// @route GET /api/presence/absence/user/range
// @desc gET ABSENCE-PRESENCE-BUSINESS TRIP specific date, specific user
// @access private
router.get('/user/range/:user/:date1/:date2', passport.authenticate('jwt', {session: false}), (req, res) => {

    const startofDay1 = new Date(req.params.date1);
    const endofDay2 = new Date(req.params.date2);

    startofDay1.setHours(0, 0, 0, 0);
    endofDay2.setHours(23, 59, 59, 999);

    PresenceAbsenceBusinessTrip.find({"date": {"$gte": startofDay1, "$lt": endofDay2}, "user": req.params.user})
        .sort({date: 1})
        .then(data => {
            
            if(data.length !== 0) {
                res.json(data);
            } else {
                res.status(404).json({error: "There is no data for selected date range"})
            }

        })


})


// @route PUT /api/presence/absence
// @desc Update absence-presence-business trip
// @access private
router.put('/update', passport.authenticate('jwt', {session: false}), (req, res) => {

    const { type, remoteOffice, workingFrom, workingTo, onPauseFrom,
        onPauseTo, typeOfAbsence, date, placeOfBusinessTrip, user} = req.body;

        const dateForReq = new Date(date)
        dateForReq.setHours(12, 0, 0, 0)

    const newData = {};

    
        newData.type = type
    
    
        newData.remoteOffice = remoteOffice
    
    
        newData.workingFrom = workingFrom
    
    
        newData.workingTo = workingTo
    

        newData.onPauseFrom = onPauseFrom
    
    
        newData.onPauseTo = onPauseTo
    
    
        newData.typeOfAbsence = typeOfAbsence
    
    
        newData.date = dateForReq
    
    
        newData.placeOfBusinessTrip = placeOfBusinessTrip
    
    if(user) {
        newData.user = user
    }

    PresenceAbsenceBusinessTrip.findByIdAndUpdate({_id: req.body._id}, {$set: newData}, {new: true, useFindAndModify: false})
        .then(data => res.json(data))
        .catch(err => console.log(err))

})

// @route DELETE /api/presence/absence/:id
// @desc Delete absence-presence-business trip by id
// @access private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    

    PresenceAbsenceBusinessTrip.findById(req.params.id)
        .then(data => {
            data.remove().then(() => res.json({success: true}))
        })
        .catch(err => res.status(404).json({error: 'Not Found'}))

})

// @route DELETE /api/presence/absence/date/:date
// @desc Delete absence-presence-business trip by date
// @access private
router.delete('/date/:date/:user', passport.authenticate('jwt', {session: false}), (req, res) => {

    const startofDay = new Date(req.params.date);
    const endofDay = new Date(req.params.date);

    startofDay.setHours(0, 0, 0, 0);
    endofDay.setHours(23, 59, 59, 999);


    PresenceAbsenceBusinessTrip.find({"date": {"$gte": startofDay, "$lt": endofDay}, "user": req.params.user})
        .then(data => {
            data[0].remove();
            res.json({success: true})
        })
        .catch(err => {
            console.log(err);
        })


})


// @route POST /api/presence/absence
// @desc Create absence-presence-business trip
// @access private
router.post('/create', passport.authenticate('jwt', {session: false}), (req, res) => {

    const { type, remoteOffice, workingFrom, workingTo, onPauseFrom,
        onPauseTo, typeOfAbsence, date, placeOfBusinessTrip, user} = req.body;

    const dateForReq = new Date(date)
    dateForReq.setHours(12, 0, 0, 0)

    const startofDay = new Date(date);
    const endofDay = new Date(date);

    startofDay.setHours(0, 0, 0, 0);
    endofDay.setHours(23, 59, 59, 999);

    Holiday.findOne({"date": {"$gte": startofDay, "$lt": endofDay}})
        .then(holiday => {

            if(holiday) {
                res.status(400).json({errors: 'You are not allowed to add anything on national or religious day!'})
            } else {

                        PresenceAbsenceBusinessTrip.find({"date": {"$gte": startofDay, "$lt": endofDay}, "user": user})
                            .then(data => {
                    
                                if(data.length !== 0) {
                                    res.status(400).json({errors: 'You have already create presence/absence/business trip for selected date/dates'})
                                } else {
                                    // create 

                                    const newDay = new PresenceAbsenceBusinessTrip({
                                        type,
                                        remoteOffice,
                                        workingFrom,
                                        workingTo,
                                        onPauseFrom,
                                        onPauseTo,
                                        typeOfAbsence,
                                        date: dateForReq,
                                        placeOfBusinessTrip,
                                        user
                                    })

                                    newDay.save()
                                        .then(item => res.json(item))
                                        .catch(err => console.log(err));
                                }

                })

            }

        })

    




})