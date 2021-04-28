const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/User');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests to /users"
    });
});

router.post('/', (req, res, next) => {
    // const user = {
    //     name: req.body.name,
    //     location: req.body.location,
    //     reviews: req.body.reviews
    // };
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        location: req.body.location,
        reviews: req.body.reviews
    });
    user.save().then(res => {
        console.log(res);
    })
    .catch(err => console.log(err))
    res.status(201).json({
        message: "User created",
        createdUser: user
    });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    if (id == 'special') {
        res.status(200).json({
            message: 'You discovered a special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'User updated'
    });
});

router.delete('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'User deleted'
    });
});

module.exports = router;