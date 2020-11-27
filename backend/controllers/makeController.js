const Make = require('../models/make');
const Model = require('../models/model');

// GET request for make
exports.getMake = (req, res, next) => {
    res.json({ title: `Make with id ${req.params.id}` });
}

// GET request for list of all makes
exports.getMakes = (req, res, next) => {
    Make.find({})
        .exec(function (err, makes) {
            if (err) { return next(err); }

            // Successful, so send data
            res.json({ title: 'List of all makes', makes: makes });
        });
}

// GET request for make's models
exports.getModels = (req, res, next) => {
    Model.find({ make: { _id: req.params.id }  })
        .populate('make')
        .exec(function (err, models) {
            if (err) { return next(err); }

            // Successful, so send data
            res.json({ title: `List of models from make with id ${req.params.id}`, models: models });
        });
}
