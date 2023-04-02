const express = require('express');
const {register} = require('./register');
const Router = require('express-promise-router');
const { login } = require('./login');
const { updateProfile } = require('./update');
const { deleteProfile } = require('./deleteProfile');

const apiRouter = express.Router();

apiRouter.post('/register', register);
apiRouter.post('/login',login);
apiRouter.put('/update/:empcode',updateProfile);
apiRouter.delete('/delete/:empcode',deleteProfile);

module.exports = apiRouter;