const express = require('express');
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require('path');
const helmet = require("helmet");
const bodyParser = require('body-parser');
const logger = require('./logger');
const routes = require('./routes');


const app = express();

app.use(helmet.hsts({
    maxAge: 63072000,
    preload: true,
}));
app.use(helmet.contentSecurityPolicy());
app.use(helmet.noSniff());
app.use(helmet.frameguard({
    action: "sameorigin",
}));
app.use(cors({
    origin: true,
    methods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS"]
}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/',routes);

const port = process.env.PORT;

app.listen(port, () => {
    logger.info(`Sever has started on ${port}`);
});