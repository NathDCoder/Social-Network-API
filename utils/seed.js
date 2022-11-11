const connection = require('../config/connection');
const { Channel, User } = require('../models');
const { getRandomName, getRandomOutput } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing channel
  await Channel.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the students array
  for (let i = 0; i < 20; i++) {
    // Get some random thoughts object using a helper function that we imported from ./data
    const thoughts = getRandomOutput(20);

    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const friends = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    users.push({
      first,
      last,
      friends,
      thoughts
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Add channels to the collection and await the results
  await Channel.collection.insertOne({
    channelName: 'Tech101',
    online: false,
    users: [...users],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
