const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/User');

router.get('/', (req, res, next) => {
    User.find()
    .select('name _id')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            users: docs.map(doc => {
                return {
                    // ...doc //gets all props
                    name: doc.name,
                    location: doc.location,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4001/users/' + doc._id
                    }
                }
            })
        }
        // if (docs.length >= 0) {
        res.status(200).json({response});
        // } else {
        //     res.status(404).json({
        //         message: "No entries found"
        //     });
        // }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        location: req.body.location,
        reviews: req.body.reviews
    });
    user
    .save()
    .then(result => {
        // console.log(result);
        res.status(201).json({
            message: "User created successfully",
            createdUser: {
                name: result.name,
                location: result.location,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: "http://localhost:4001/users/" + result._id
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
    .select('name _id location reviews')
    .exec()
    .then(doc => {
        // console.log(doc)
        if (doc) {
            res.status(200).json({
                user: doc,
                request: {
                    type: 'GET',
                    url: "http://localhost:4001/users/" + doc._id
                }
            })
        } else {
            res.status(404).json({message: 'No valid user ID found'});
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;
    // Check if you really want to change value
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    User.updateOne({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        // console.log(result);
        res.status(200).json({
            message: 'User updated',
            request: {
                type: 'GET',
                url: "http://localhost:4001/users/" + id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User deleted',
            request: {
                type: 'POST',
                url: "http://localhost:4001/users/",
                body: {
                    name: 'String', location: 'String', reviews: 'String'
                }
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;