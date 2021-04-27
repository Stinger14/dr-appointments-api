const express = require('express');
const app = express();
const mongoose = require("mongoose");

require('dotenv/config');

//Import Routes
const doctorRoute = require('./routes/doctors');
const userRoute = require('./routes/users');

//MIDDLEWARES
app.use('/doctors', doctorRoute);
app.use('/users', userRoute);


//ROUTES
app.get('/', (req, res) => {
    res.send('Home Page');
});

//Connect to DB
//{useNewUrlParser: true}
mongoose.connect(process.env.DB_CONNECTION,
{ useUnifiedTopology: true, useNewUrlParser: true }, () => 
    console.log("Connected to db"),
);


app.listen(4001);