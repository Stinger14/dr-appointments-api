const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests to /doctors"
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: "Doctor was created"
    });
});

// ':' dynamic param in express
router.get('/:doctorId', (req, res, next) => {
    if (id == 'special') {
        res.status(200).json({
            message: 'You discovered a special ID',
            doctorId : req.params.orderId
        });
    } 
});

router.patch('/:doctorId', (req, res, next) => {
    res.status(200).json({
        message: 'Doctor updated'
    });
});

router.delete('/:doctorId', (req, res, next) => {
    res.status(200).json({
        message: 'Doctor deleted'
    });
});


module.exports = router;