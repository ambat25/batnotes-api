const mongoose = require('mongoose');
const logger = require('../utils/logger');
const db = require('../config/db');
const Users = require('./user.model');
const Notes = require('./note.model');

// Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

// Configure Mongoose
const mongodbURL = `${db.url}/${db.name}?retryWrites=true&w=majority`;
mongoose
  .connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    logger.error(error.message);
  });
mongoose.set('debug', true);

// setup models

const connectDB = () => {
  return mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, err => {
    if (err) {
      logger.error('Connection to DB failed');
    } else {
      logger.info('Connection to DB was successful');
    }
  })
}

mongoose.set('debug', true);
const dbConnection = mongoose.connection;

dbConnection.on('error', console.error.bind(console, "MongoDB connection failed"));


const models = {
  Notes,
  Users,
}

module.exports = { connectDB, models };