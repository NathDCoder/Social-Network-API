const { Schema, model } = require('mongoose');

const channelSchema = new Schema(
  {
    channelName: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now(),
    },

    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Channel = model('channel', channelSchema);

module.exports = Channel;
