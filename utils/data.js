const names = [
'Rohan Rodriguez',
'Karlie Liu',
'Umeda Kin',
'Everett Hatfield',
'Eo Changmin',
'Evan Mendez',
'Allan Mata',
'Hirayama Kayo',
'Akim Kiselev',
'Chiamaka Omolara',
'Morgan Montgomery',
'Giovanni Walsh',
'Lola Oyelude',
'Ya Won-Shik',
'Melody Stanton',
'Allen Vaughn',
'Yoshihara Yutaka',
'Muyiwa Adewale',
'Qiao Meili',
'Harrison Carney',
'Simisola Aremu',
'Gil Daewon',
'Min Chung-Cha',
'Lana Ivanova',
'Koffi Iwu',
'Duàn Zhu',
'Kaylah Hanson',
'Emmanuel Payne',
'Nakada Gorou',
'Ye Xianliang',
'Aminu Chidinma',
'Asya Kovaleva',
'Kono Jurou',
'Cho Sang-Ook',
'Ifunanya Gbogboade',
'Isela Flores',
'Rick Crespo',
'Jamba Aguda',
'Mariam Strauss',
'Caylin Ratcliff',
'Kijana Kalu',
'Siena Jack',
'Ujana Falana',
'Jin Yaoting',
'Eliza Lopez',
'Annaliese Funk',
'Austen Mercer',
'Marlen Rock',
'Spiridon Kulikov',
'Marquise Haskins',
'Duan An',
'Nikita Lebedev',
'Gi Man-Shik',
'Seong Jiwoo',
'Man Soojin',
'Pyeong Sun-Hee',
'Nia Alakija',
'Gok Min',
];

const thoughtDesc = [
    'Turtles with hats',
    'Seashell on the seashore',
    'Frog dancing on the moon',
    'Penguin parade',
    'Emeralds',    
    'Paint faces on eggs',
    'Mix weird ingredients and see if you can eat it.',
    'Learn Morse code',
    'Plumbers are red, hedgehogs are blue, so please press start.',
    'Go to chick fil a and only use chopsticks.',
    'Yeet a melon in a lake.',
    'Realize the fox actually has a couple of sounds.',
    'Stare at people eating in a restaurant through the window. Keep your expression neutral.',
    'Go to a hamburger place and order a pizza.',
    'Smile; it confuses people.'
];

  // Get a random activity given an array
const getRandomThought = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomThought(names)}`;

// Function to generate random assignments that we can add to student object.
const getRandomOutput = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      outputName: getRandomThought(thoughtDesc),
      score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomOutput };
  