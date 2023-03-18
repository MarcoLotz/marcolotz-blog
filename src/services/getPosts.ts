import firebaseClient from "./firebaseClient";
import {Timestamp} from 'firebase/firestore'
import {handleCache} from "./cacheHandler";


const defaultCacheEvictionTime = 1000 * 60 * 60 * 24;
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


export async function getTotalPagesCached() {
  return await handleCache(
    'total-pages',
    defaultCacheEvictionTime,
    async () => await requestTotalPages());
}

async function requestTotalPages() {
  // DB side speed up: createdAt indexed descending
  const {count} = (await
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
    defaultCacheEvictionTime,
    async () => await requestNewPagedPosts(pageIndex));
}

async function requestNewPagedPosts(pageIndex: number) {
  // DB side speed up: createdAt indexed descending
  const query = firebaseClient.collection('posts').orderBy('createdAt', 'desc');
  const totalNumberOfPages = await getTotalPagesCached();

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
    totalNumberOfPages: totalNumberOfPages
  };
}


export async function getPostsWithSearchText(searchText: string) {
  let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = firebaseClient.collection('posts');

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
    pageIndex: 1,
    count: posts.length,
    totalNumberOfPages: 1
  };
}
