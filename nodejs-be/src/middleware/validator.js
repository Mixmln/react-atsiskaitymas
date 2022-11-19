/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Joi = require('joi');

module.exports = {
  checkRegCredentials: async (req, res, next) => {
    const registrationScheme = Joi.object({
      username: Joi.string().min(3).max(15).required(),
      passOne: Joi.string().min(5).max(20).required(),
      passTwo: Joi.string().min(5).max(20).required(),
    });
    // eslint-disable-next-line max-len
    try {
      const validationResult = await registrationScheme.validateAsync(req.body, { abortEarly: false });
      if (validationResult.passOne === validationResult.passTwo) {
        next();
      } else {
        throw new Error('Bad credentials, try again');
      }
    } catch (error) {
      return res.send({ error: true, message: error.details[0].message });
    }
  },
  checkLogCredentials: async (req, res, next) => {
    const loginScheme = Joi.object({
      username: Joi.string().min(3).max(15).required(),
      password: Joi.string().min(5).max(20).required(),
    });
    try {
      const result = await loginScheme.validateAsync(req.body, { abortEarly: false });
      if (result) {
        next();
      } else {
        throw new Error('Bad credentials, try again');
      }
    } catch (error) {
      return res.send({ error: true, message: error.details[0].message });
    }
  },
  checkProduct: async (req, res, next) => {
    const productScheme = Joi.object({
      title: Joi.string().min(2).max(20).required(),
      image: Joi.string().required(),
      time: Joi.number().required(),
      startPrice: Joi.number().required(),
      currentPrice: Joi.number().required(),
      step: Joi.number().required(),
      productOwner: Joi.string().required(),
    });
    try {
      const result = await productScheme.validateAsync(req.body, { abortEarly: false });
      if (result) {
        next();
      } else {
        throw new Error('Inputs can not be empty');
      }
    } catch (error) {
      return res.send({ error: true, message: error.details[0].message });
    }
  },
};
