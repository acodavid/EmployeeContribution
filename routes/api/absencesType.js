const express = require('express');
const router = express.Router();
const passport = require('passport');
const AbsenceType = require('../../models/AbsenceType');

// @route GET /api/absence/type
// @desc Get all absence types
// @access private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {


    AbsenceType.find()
        .sort({title: 1})
        .then(absences => res.json(absences))
        .catch(err => res.status(404).json({notFound: 'List of Absence Types is Empty'}))
})

// @route POST /api/absence/type
// @desc POST absence type
// @access private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {


    const newAbsenceType = new AbsenceType({
        title: req.body.title
    })

    newAbsenceType.save()
        .then(absenceType => {
            res.json(absenceType)
        })
        .catch(err => console.log(err))



})

// @route PUT /api/absence/type
// @desc update absence type
// @access private
router.put('/update', passport.authenticate('jwt', {session: false}), (req, res) => {

    let newAbsenceType = {}

    if(req.body.title) {
        newAbsenceType.title = req.body.title
    }

    AbsenceType.findByIdAndUpdate({_id: req.body._id}, {$set: newAbsenceType}, {new: true, useFindAndModify: false})
    .then(absenceType => res.json(absenceType))
    .catch(err => console.log(err))

})

// @route DELETE /api/absence/type
// @desc delete absence type
// @access private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    AbsenceType.findById(req.params.id)
        .then(absenceType => {
            absenceType.remove().then(() => res.json({success: true}));
        })
        .catch(err => res.status(404).json({error: 'Absence Type - Not Found'}))

})

module.exports = router;