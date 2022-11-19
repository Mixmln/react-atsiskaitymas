const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  startPrice: {
    type: Number,
    required: true,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  step: {
    type: Number,
    required: true,
  },
  productOwner: {
    type: String,
    required: true,
  },
  bids: {
    type: Array,
    required: false,
    default: [],
  },
});

module.exports = mongoose.model('type12AuctionAppProducts', ProductSchema);
