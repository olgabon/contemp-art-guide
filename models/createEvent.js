const mongoose = require("mongoose")
const Schema = mongoose.Schema


const EventSchema = new Schema({
    name: { type: String},
    description: { type: String },
    city: { type: String},
    location: {type: String },
    start: {type: String},
    end: {type: String},
    downloadURL: {type: String},
    ticketPrice: {type: String},
    eventImage: {type: String},
  });

const Events = mongoose.model('createEvent', EventSchema);

module.exports = Events