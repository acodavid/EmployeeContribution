const express = require('express');
const router = express.Router();
const passport = require('passport');

// models
const Holiday = require('../../models/Holiday');

// @route GET api/holidays
// @desc Get all holidays
// @access private
router.get('/:year', passport.authenticate('jwt', {session: false}), (req, res) => {


    let startDate = new Date();
    let endDate = new Date();

    startDate.setDate(1);
    startDate.setMonth(0);
    startDate.setFullYear(req.params.year)
    startDate.setHours(0, 0, 0, 0)

    endDate.setDate(31);
    endDate.setMonth(11);
    endDate.setFullYear(req.params.year)
    endDate.setHours(23, 59, 59, 999)


    Holiday.find({"date": {"$gte": startDate, "$lt": endDate}})
        .sort({date: 1})
        .then(holidays => res.json(holidays))
        .catch(err => res.status(404).json({notFound: 'List of Holidays is Empty'}))
})

// @route POST api/holidays
// @desc Add holiday
// @access private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const startofDay = new Date(req.body.date);
    const endofDay = new Date(req.body.date);

    startofDay.setHours(0, 0, 0, 0);
    endofDay.setHours(23, 59, 59, 999);

    let errors = {};

    Holiday.findOne({"date": {"$gte": startofDay, "$lt": endofDay}})
        .then(holiday => {
            if(holiday) {
                errors.holiday = 'You have already asigned hational or religious day for this date'
                res.status(404).json(errors)
            } else {
                const newHoliday = new Holiday({
                    title: req.body.title,
                    date: req.body.date
                })

                newHoliday.save()
                    .then(holiday => {
                        res.json(holiday)
                    })
                    .catch(err => console.log(err))
            }
        })

})

// @route PUT api/holidays/update
// @desc update holiday
// @access private
router.put('/update', passport.authenticate('jwt', {session: false}), (req, res) => {

    let newHoliday = {}

    if(req.body.title) {
        newHoliday.title = req.body.title
    }

    if(req.body.date) {
        newHoliday.date = req.body.date
    }

    Holiday.findByIdAndUpdate({_id: req.body._id}, {$set: newHoliday}, {new: true, useFindAndModify: false})
    .then(holiday => res.json(holiday))
    .catch(err => console.log(err))

})

// @route DELETE api/holidays/update
// @desc delete holiday
// @access private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    Holiday.findById(req.params.id)
        .then(holiday => {
            holiday.remove().then(() => res.json({success: true}));
        })
        .catch(err => res.status(404).json({error: 'Holiday - Not Found'}))

})


module.exports = router;