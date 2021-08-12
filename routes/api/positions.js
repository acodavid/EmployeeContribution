const express = require('express');
const router = express.Router();
const passport = require('passport');
const Position = require('../../models/Position');

// @route GET /api/positions
// @desc Get all positions
// @access private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {


    Position.find()
        .sort({title: 1})
        .then(positions => res.json(positions))
        .catch(err => res.status(404).json({notFound: 'List of Positions is Empty'}))
})

// @route POST /api/positions
// @desc POST position
// @access private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {


    const newPosition = new Position({
        title: req.body.title
    })

    newPosition.save()
        .then(position => {
            res.json(position)
        })
        .catch(err => console.log(err))



})

// @route PUT /api/positions
// @desc update position
// @access private
router.put('/update', passport.authenticate('jwt', {session: false}), (req, res) => {

    let newPosition = {}

    if(req.body.title) {
        newPosition.title = req.body.title
    }

    Position.findByIdAndUpdate({_id: req.body._id}, {$set: newPosition}, {new: true, useFindAndModify: false})
    .then(position => res.json(position))
    .catch(err => console.log(err))

})

// @route DELETE /api/positions
// @desc update position
// @access private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    Position.findById(req.params.id)
        .then(position => {
            position.remove().then(() => res.json({success: true}));
        })
        .catch(err => res.status(404).json({error: 'Position - Not Found'}))

})

module.exports = router;