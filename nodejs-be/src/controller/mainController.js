/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
const uid = require('uid-safe');
const bcrypt = require('bcrypt');
const UserSchema = require('../schemas/UserSchema');
const ProductSchema = require('../schemas/ProductSchema');

module.exports = {
  register: async (req, res) => {
    const { username, passOne } = req.body;
    const userExists = await UserSchema.findOne({ username });
    if (userExists) {
      return res.send({ error: true, message: 'User with this username exists, try another name', data: null });
    }
    const id = await uid(10);
    const hashedPass = await bcrypt.hash(passOne, 2);
    const user = new UserSchema({
      userId: id,
      username,
      password: hashedPass,
    });
    await user.save();
    return res.send({ error: false, message: 'User created', data: null });
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    const userToLogin = await UserSchema.findOne({ username });
    if (userToLogin) {
      const correctPass = await bcrypt.compare(password, userToLogin.password);
      if (correctPass) {
        return res.send({ error: false, message: `Welcome, ${username}`, data: userToLogin });
      }
      return res.send({ error: true, message: 'Inccorect password', data: null });
    }
    return res.send({ error: true, message: 'User does not exist, register first', data: null });
  },

  createProduct: async (req, res) => {
    const { title, image, time, startPrice, currentPrice, step, productOwner } = req.body;
    const id = await uid(7);

    const product = new ProductSchema({
      productId: id,
      image,
      title,
      time,
      currentPrice,
      startPrice,
      step,
      productOwner,
    });
    await product.save();
    return res.send({ error: false, message: 'Product added', data: null });
  },

  getSingleProduct: async (req, res) => {
    const { productId } = req.params;
    const foundProd = await ProductSchema.findOne({ productId });
    if (foundProd) {
      return res.send({ error: false, message: 'Product found', data: foundProd });
    }
    return res.send({ error: true, message: 'Product not found', data: null });
  },

  testRoute: async (req, res) => {
    const { productId } = req.params;
    await ProductSchema.findOneAndUpdate(
      { productId },
      {
        $set: {
          time: 10,
        },
      }
    );
    const found = await ProductSchema.find();
    res.send({ error: false, message: 'Successfuly', data: found });
  },
};
