const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
const logger = require('./logger');

try{
    mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });
    logger.info('Connnected to Mongo DB')
}catch(error){
    logger.error({
        message : "Unable to Connect to Mongo DB",
        err : error
    })
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
