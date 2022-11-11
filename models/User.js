const { Schema, model } = require('mongoose');
const channelSchema = require('./Channel');

// Schema to create User model
const userSchema = new Schema(
  {
    first: {
      type: String,
      required: true,
      max_length: 50,
    },
    last: {
      type: String,
      required: true,
      max_length: 50,
    },
    friend: {
      type: String,
      required: true,
      max_length: 50,
    },
    thoughts: [channelSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
