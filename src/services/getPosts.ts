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

export default async function getPosts(pageIndex: number, pageSize: number, searchText = '') {
  let query = {} as any;

  if (searchText) {
    const searchItems = searchText
      .trim()
      .toUpperCase()
      .split(' ');

    searchItems.forEach(search => {
      query = firebaseClient.collection('posts')
        .where('search', 'array-contains', search);
    });

  } else {
    query = firebaseClient.collection('posts')
      .orderBy('createdAt', 'desc');
  }

  const { count } = (await query.count().get()).data();

  const data = await query
    .offset((pageIndex - 1) * pageSize)
    .limit(pageSize)
    .get();

  const posts = data.docs.map((doc: any) => {
    const postData = doc.data() as PostData;

    return {
      ...postData,
      id: doc.id,
      createdAt: new Date(postData.createdAt.seconds * 1000)
    };
  });

  return {
    items: posts,
    pageIndex,
    count: count,
    totalPages: Math.ceil(count / pageSize)
  };
}
