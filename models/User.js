const { Schema, model } = require('mongoose');
const {thoughtSchema} = require('./Thoughts');

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
    
    toJSON: {
      getters:false,
    },
  },
);
userSchema.add({thoughts:[thoughtSchema]});

const User = model('user', userSchema);

module.exports = User;
