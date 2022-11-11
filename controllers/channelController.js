const { Channel, User } = require('../models');

module.exports = {
  // Get all channels
  getChannels(req, res) {
    Channel.find()
      .then((channels) => res.json(channels))
      .catch((err) => res.status(500).json(err));
  },
  // Get a channel
  getSingleChannel(req, res) {
    Channel.findOne({ _id: req.params.channelId })
      .select('-__v')
      .then((channel) =>
        !channel
          ? res.status(404).json({ message: 'No channel with that ID' })
          : res.json(channel)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a course
  createChannel(req, res) {
    Channel.create(req.body)
      .then((channel) => res.json(channel))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a course
  deleteChannel(req, res) {
    Channel.findOneAndDelete({ _id: req.params.channelId })
      .then((channel) =>
        !channel
          ? res.status(404).json({ message: 'No channel with that ID' })
          : User.deleteMany({ _id: { $in: channel.users } })
      )
      .then(() => res.json({ message: 'Channel and users deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a course
  updateChannel(req, res) {
    Channel.findOneAndUpdate(
      { _id: req.params.channelId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((channel) =>
        !channel
          ? res.status(404).json({ message: 'No channel with this id!' })
          : res.json(channel)
      )
      .catch((err) => res.status(500).json(err));
  },
};
