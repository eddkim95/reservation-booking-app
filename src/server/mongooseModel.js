const { Schema, model } = require('mongoose');

const reservationSchema = new Schema({
  name: { type: String, required: true },
  hotelName: { type: String, required: true },
  arrivalDate: { type: Date, required: false },
  departureDate: { type: Date, required: false }
});

module.exports = model('Reservation', reservationSchema);
