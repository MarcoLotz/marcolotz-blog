import firebaseClient from "./firebaseClient";
import cache from 'memory-cache';

export default async function deletePost(id: string) {
  await firebaseClient.collection('posts').doc(id).delete();
  cache.clear();
}
