const populateData = require('../assets/populateData.json');
const serviceAccount = require('../assets/credentials.json');
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

postsCollection.get().then(items => {
  items.docs.forEach(doc => doc.ref.delete());
});

