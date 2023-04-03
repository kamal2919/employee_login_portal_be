const express = require('express');
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('./logger');
const routes = require('./routes');


const app = express();

app.use(cors({
    origin : process.env.VARCEL_DOMAIN
}));

app.options('*', cors({
    origin: process.env.VARCEL_DOMAIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/',routes);

const port = process.env.PORT;

app.listen(port, () => {
    logger.info(`Sever has started on ${port}`);
});