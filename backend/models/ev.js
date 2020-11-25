const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const currentDate = new Date();

const EVSchema = new Schema({
    make: { type: Schema.Types.ObjectId, ref: 'Make', required: true },
    model: { type: Schema.Types.ObjectId, ref: 'Model', required: true },
    year: { type: Number, required: true, min: 1900, max: currentDate.getFullYear() },
    price: { type: Number, required: true, min: 0 },
    mileage: { type: Number, required: true, min: 0 },
    location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    image_urls: { type: [String], required: true, default: undefined }, // by default this would be an empty array which would affect the way we then create new instances of this model (i.e. it would require using array.push(item))
    seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
    list_date: { type: Date, default: currentDate, required: true },
    equipment_and_options: { type: [String], required: true, default: undefined }, // by default this would be an empty array which would affect the way we then create new instances of this model (i.e. it would require using array.push(item))
    exterior: {
        body_style: { type: String },
        colour: { type: String, required: true },
    }, 
    interior: {
        seating: { type: Number, required: true, min: 1 },
        colour: { type: String, required: true },
    },
    vehicle_identification_number: { type: String, minlength: 17, maxlength: 17, required: true },
    full_vehicle_inspection: { type: Boolean, required: true },
});

// Virtual for ev's url
// Does not work with arrow function
EVSchema
    .virtual('url')
    .get(function () {
        return `/content/ev/${this._id}`;
    });

module.exports = mongoose.model('EV', EVSchema);
