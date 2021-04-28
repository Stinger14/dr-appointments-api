const mongoose = require('mongoose');

//Define default Schema
const Schema = mongoose.Schema, 
model = mongoose.model.bind(mongoose),
ObjectId = mongoose.Schema.Types.ObjectId;

//Doctor's availability
const slotSchema = new Schema({
    slot_time: String,
    slot_date: String,
    created_at: Date
});

const Slot = model('Slot', slotSchema);


const appointmentSchema = new Schema({
    id: ObjectId,
    type: String,   // Virtual || In person
    name: String,    // User
    doctor: String,
    slots:{
        type: ObjectId,
        ref: 'Slot'
    },
    created_at: Date
});

const Appointment = model(Appointment, appointmentSchema);

module.exports = {Appointment, Slot};


// const AppointmentSchema = mongoose.Schema({
//     username: {
//         type: String,
//         required: true
//     },
//     doctor: {
//         type: String,
//         required: true,
//     },

// })