const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MakeSchema = new Schema({
    name: { type: String, required: true },
});

// Virtual property for make url
MakeSchema
    .virtual('url')
    .get(function () {
        return `/content/make/${this._id}`;
    });

module.exports = mongoose.model('Make', MakeSchema);
