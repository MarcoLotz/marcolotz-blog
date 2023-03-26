import firebaseClient from "./firebaseClient";
import cache from 'memory-cache';

interface CreatePostData {
  title: string;
  category: string;
  body: string;
  author: string;
}

export default async function createPost(data: CreatePostData) {
  const post = buildPost(data);

  await firebaseClient.collection('posts')
    .add(post);

  cache.clear();

  return post;
}

function buildPost(data: CreatePostData) {
  return {
    title: data.title.trim(),
    body: data.body,
    category: data.category.trim(),
    author: data.author,
    createdAt: new Date(),
    search: data.title
      .trim()
      .toUpperCase()
      .split(' ')
  }
}
