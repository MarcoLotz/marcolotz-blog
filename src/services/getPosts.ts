import firebaseClient from "./firebaseClient";
import { Timestamp } from 'firebase/firestore'
import { handleCache } from "./cacheHandler";

// in milliseconds
const defaultExpiracyTime = 1000 * 60 * 60 * 24;
const maxSearchLimit = 20
// No need to have the user changing the page size here.
const pageSize = 3

type PostData = {
  id: string;
  title: string;
  author: string;
  body: string;
  category: string;
  createdAt: Timestamp;
}


export async function getTotalPages() {
  return await handleCache(
    'total-pages',
    defaultExpiracyTime,
    async () => await requestTotalPages());
}

async function requestTotalPages() {
  // DB side speed up: createdAt indexed descending
  const { count } = (await
    firebaseClient
      .collection('posts')
      .count()
      .get())
    .data();

  return {
    totalPages: Math.ceil(count / pageSize)
  };
}

const formatTimestampToISO = (timestamp: Timestamp) =>
  new Date(timestamp.seconds * 1000).toISOString();

export async function getPostsInPage(pageIndex: number) {
  return await handleCache(
    `posts-${pageIndex}`,
    defaultExpiracyTime,
    async () => await requestNewPagedPosts(pageIndex));
}

async function requestNewPagedPosts(pageIndex: number) {
  // DB side speed up: createdAt indexed descending
  let query = firebaseClient.collection('posts').orderBy('createdAt', 'desc');

  const data = await query
    .offset((pageIndex - 1) * pageSize)
    .limit(pageSize)
    .get();

  const posts = data.docs.map((doc: any) => {
    const postData = doc.data() as PostData;

    return {
      ...postData,
      id: doc.id,
      createdAt: formatTimestampToISO(postData.createdAt)
    };
  });

  return {
    items: posts,
    pageIndex,
    count: posts.length,
  };
}

export async function getPostsWithSearchText(searchText: string) {
  var query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = firebaseClient.collection('posts');

  const searchItems = searchText
    .trim()
    .toUpperCase()
    .split(' ');

  query = query.where('search', 'array-contains-any', searchItems);

  const data = await query.limit(maxSearchLimit).get();

  const posts = data.docs
    .map((doc: any) => {
      const postData = doc.data() as PostData;
      return {
        ...postData,
        id: doc.id as string,
        createdAt: formatTimestampToISO(postData.createdAt)
      };
    });

  return {
    items: posts,
    count: posts.length,
  };
}
