const mongooseConnection = require('./mongoConfig');
const createDatabaseItems = require('./createDatabaseItems');

createDatabaseItems(mongooseConnection);
