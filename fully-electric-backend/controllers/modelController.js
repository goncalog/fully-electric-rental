const Model = require('../models/model');

// GET request for model
exports.getModel = (req, res, next) => {
    res.json({ title: `Model with id ${req.params.id}` });
}

// GET request for list of all models
exports.getModels = (req, res, next) => {
    Model.find({})
        .exec(function (err, models) {
            if (err) { return next(err); }

            // Successful, so send data
            res.json({ title: 'List of all models', models: models });
        });
}
