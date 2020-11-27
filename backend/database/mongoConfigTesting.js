const mongoose = require('mongoose');
let db = mongoose.connection;

const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoServer = new MongoMemoryServer();

mongoose.Promise = Promise;
mongoServer.getConnectionString().then(mongoUri => {
    const mongooseOpts = {
        // options for mongoose 4.11.3 and above
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    mongoose.connect(mongoUri, mongooseOpts);
    db = mongoose.connection;
    db.on('error', e => {
        if (e.message.code === 'ETIMEOUT') {
            console.log(e);
            mongoose.connect(mongoUri, mongooseOpts);
            db = mongoose.connection;
        }
        console.log(e);
    });

    db.once('open', () => {
        console.log(`MongoDB successfully connected to ${mongoUri}`);
    });
});

module.exports = db;

// Require this file at the top of the testing file when testing operations 
// that work on the mongo database. This way, a testing database will be used 
// instead of the real one.

// Since the tests are starting with a fresh database, it's useful to use a before function 
// in the testing suite to add a couple of items to the database before running tests.
