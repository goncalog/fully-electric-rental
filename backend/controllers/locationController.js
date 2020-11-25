const Location = require('../models/location');

// GET request for list of all locations
exports.getLocations = (req, res, next) => {
    Location.find({})
        .exec(function (err, locations) {
            if (err) { return next(err); }

            // Successful, so send data
            res.json({ title: 'List of all locations', locations: locations });
        });
}
