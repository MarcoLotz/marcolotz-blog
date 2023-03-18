import admin from 'firebase-admin';

if (!process.env.CREDENTIALS) {
  throw 'CREDENTIALS env var needs to be defined'
}

const serviceAccount = JSON.parse(process.env.CREDENTIALS || '');

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.BUCKET
    });
  } catch (error) {
    console.log('Firebase admin initialization error!');
  }
}

export default admin.firestore();
export const storage = admin.storage();
