import firebaseClient from "./firebaseClient";
import { Timestamp } from 'firebase/firestore'

type PostData = {
  id: string;
  title: string;
  author: string;
  body: string;
  category: string;
  createdAt: Timestamp;
}

export default async function getPosts(pageIndex: number, pageSize: number) {
  const query = firebaseClient.collection('posts')
    .orderBy('createdAt', 'desc')
    .offset((pageIndex - 1) * pageSize)
    .limit(pageSize);

  const data = await query.get();

  return data.docs.map(doc => {
    const postData = doc.data() as PostData;

    return {
      ...postData,
      id: doc.id,
      createdAt: new Date(postData.createdAt.seconds * 1000)
    };
  });
}
