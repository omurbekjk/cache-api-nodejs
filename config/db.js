const mongoose = require('mongoose');
const logger = require('./logger');

const MONGO_USERNAME = '';
const MONGO_PASSWORD = '';
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'cache-api';

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(url,  { useUnifiedTopology: true, useNewUrlParser: true}).then(r => {
   logger.info('Successfully connected to mongodb!');
}).catch((er)=>{
  logger.info(er);
});
