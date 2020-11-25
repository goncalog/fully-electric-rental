const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SellerSchema = new Schema({
    name: { type: String, required: true },
    contact: { type: String, required: true, unique: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    password: { type: String, required: true, minlength: 8 },
});

module.exports = mongoose.model('Seller', SellerSchema);
