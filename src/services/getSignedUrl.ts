import moment from 'moment';
import { storage } from './firebaseClient'

const bucket = storage.bucket();

export default async function getSignedUrl(path: string) {
  const expires = moment().add(1, 'days').toDate();
  const [signedUrl] = await bucket.file(path)
    .getSignedUrl({
      action: 'write',
      expires,
    });

  return signedUrl;
}
