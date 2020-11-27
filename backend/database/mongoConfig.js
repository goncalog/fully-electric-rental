// This is in its own file so the test files can use a different config file 
// that sets up mongodb-memory-server

require('dotenv').config({ path: __dirname + '/../.env' });

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_KEY, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

module.exports = db;
