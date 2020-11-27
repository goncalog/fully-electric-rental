const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currentDate = new Date();

const EVSchema = new Schema({
    make: { type: Schema.Types.ObjectId, ref: 'Make', required: true },
    model: { type: Schema.Types.ObjectId, ref: 'Model', required: true },
    year: { type: Number, required: true, min: 1900, max: currentDate.getFullYear() },
    price_per_day: { type: Number, required: true, min: 0 },
    deposit: { type: Number, required: true, min: 0 },
    min_rental_period: { type: String, required: true },
    included_extras: { type: [String], required: true, default: undefined }, // this is for things like insurance, maintenance, etc. by default this would be an empty array which would affect the way we then create new instances of this model (i.e. it would require using array.push(item))
    mileage: { type: Number, required: true, min: 0 },
    location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    image_urls: { type: [String], required: true, default: undefined }, // by default this would be an empty array which would affect the way we then create new instances of this model (i.e. it would require using array.push(item))
    owner: { type: Schema.Types.ObjectId, ref: 'Owner', required: true },
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
    pco_license: { type: Boolean, required: true },
});

// Virtual for ev's url
// Does not work with arrow function
EVSchema
    .virtual('url')
    .get(function () {
        return `/content/ev/${this._id}`;
    });

module.exports = mongoose.model('EV', EVSchema);
