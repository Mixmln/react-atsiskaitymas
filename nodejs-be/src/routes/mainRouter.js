/* eslint-disable object-curly-newline */
const express = require('express');
const { register, login, createProduct, getSingleProduct, testRoute } = require('../controller/mainController');
const { checkRegCredentials, checkLogCredentials, checkProduct } = require('../middleware/validator');

const mainRouter = express.Router();

mainRouter.post('/register', checkRegCredentials, register);
mainRouter.post('/login', checkLogCredentials, login);
mainRouter.post('/createProduct', checkProduct, createProduct);

mainRouter.get('/getSingleProduct/:productId', getSingleProduct);
mainRouter.get('/testRoute/:productId', testRoute);

module.exports = mainRouter;
