const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('type12AuctionAppUsers', UserSchema);
