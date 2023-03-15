import admin from 'firebase-admin';

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
