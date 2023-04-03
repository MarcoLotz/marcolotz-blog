import firebaseClient from "./firebaseClient";
import cache from 'memory-cache';

interface UpdatePostData {
  id: string;
  title: string;
  category: string;
  body: string;
}

export default async function updatePost(data: UpdatePostData) {
  await firebaseClient.collection('posts')
    .doc(data.id)
    .update({
      title: data.title,
      category: data.category,
      body: data.body
    });

  cache.clear();
}
