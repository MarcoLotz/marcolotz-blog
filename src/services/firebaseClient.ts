import admin from 'firebase-admin';
const serviceAccount = require('@/assets/credentials.json');


if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } catch (error) {
    console.log('Firebase admin initialization error!');
  }
}
export default admin.firestore();
