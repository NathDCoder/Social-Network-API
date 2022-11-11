const { ObjectId } = require('mongoose').Types;
const { User, Channel } = require('../models');

// Aggregate function to get the number of users overall
const userCount = async () =>
  User.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers);

// Aggregate function for getting the overall likes using $avg
const likes = async (userId) =>
  User.aggregate([
    // only include the given user by using $match
    { $match: { _id: ObjectId(userId) } },
    {
      $unwind: '$thoughts',
    },
    {
      $group: {
        _id: ObjectId(userId),
        overallLikes: { $avg: '$thoughts.rating' },
      },
    },
  ]);

module.exports = {
  // Get all users
  getUser(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          userCount: await userCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
              likes: await likes(req.params.userId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and remove them from thoughts
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Channel.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((channel) =>
        !channel
          ? res.status(404).json({
              message: 'User deleted, but no channels found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an assignment to a student
  addThought(req, res) {
    console.log('You are adding a Thought');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { thoughts: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a user
  removeThought(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { thought: { thoughtId: req.params.thoughtId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
