const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    city: { type: String, required: true },
    country: { type: String, required: true },
});

module.exports = mongoose.model('Location', LocationSchema);
