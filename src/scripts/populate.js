const populateData = require('../assets/populateData.json');
const serviceAccount = JSON.parse(process.env.CREDENTIALS || '');
const admin = require('firebase-admin');

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error) {
    console.log('Firebase admin initialization error!');
  }
}

const firebaseClient = admin.firestore();

const postsCollection = firebaseClient.collection('posts');
const usersCollection = firebaseClient.collection('users');

populateData.forEach(data => {
  postsCollection.add({
    ...data,
    createdAt: new Date(data.createdAt)
  }).then(() => {
    console.info('[!] Added Post: ' + data.title)
  });
});

usersCollection.add({
  name: 'Marco Aurélio Lotz',
  passwordHash: '$2b$10$oMk5U/t8295OIUN2Y4IJku/EQHmp48UvFmnwO/9Q3p8afqhvkXGG.',
  username: 'marcolotz'
});
