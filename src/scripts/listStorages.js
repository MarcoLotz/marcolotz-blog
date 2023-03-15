const serviceAccount = require('../assets/credentials.json');
const admin = require('firebase-admin');
const fs = require('fs');


if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "marcolotz-website.appspot.com"
    });
  } catch (error) {
    console.log('Firebase admin initialization error!');
  }
}

const storage = admin.storage();

const bucket = storage.bucket();
urls = []
bucket.getFiles()
  .then(files => {
    const length = files[0].length;
    files[0].forEach(file => {
      bucket.file(file.name)
        .getSignedUrl({
          action: 'read',
          expires: '03-09-2491'
        }).then(signedUrl => {
          const data = { url: signedUrl, name: file.name };
          fs.appendFile('/home/forestileao/Documents/marcolotz/pastel.json', JSON.stringify(data) + ', ', () => console.log('saved'))
        });
    });
  });
