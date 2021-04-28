const express = require('express');
const logger = require('morgan');       // loggin
const app = express();
const mongoose = require('mongoose');
require('dotenv');
// const bodyPardser = require('body-parser');  // depricated

// Import routes
const userRoutes = require('./routes/users');
const doctorRoutes = require('./routes/doctors');

// Middlewares
app.use(express.json());
app.use(logger('dev'));

//Handle CORS errors
app.use((req, res, next) => {
    //? add headers to response
    // * = allow anything
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With',
                'Content-Type', 'Accept', 'Authorization');

    //? check if incoming requet method == OPTIONS
    //? Browser always sends OPTIONS method prior to response
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH');
        return res.status(200).json({});
    }
    next();     //let other routes takeover if requets gets blocked
});

// Endpoints
app.use('/users', userRoutes);
app.use('/doctors', doctorRoutes);

// Connect to DB
mongoose.connect('mongodb+srv://admin:' + process.env.MONGO_ATLAS_PW + '@apishopcluster.p2bh3.mongodb.net/doctors-appointment?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
// mongoose.Promise = global.Promise;

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(4001);