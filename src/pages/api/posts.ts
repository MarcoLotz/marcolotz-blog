import { getPostsInPage, getPostsWithSearchText } from '@/services/getPosts';
import type { NextApiRequest, NextApiResponse } from 'next'

export type PostData = {
  id: string;
  title: string;
  author: string;
  body: string;
  category: string;
  createdAt: string;
}

export interface PostsResponse {
  items: PostData[];
  pageIndex?: number;
  count: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostsResponse>
) {
  const { pageIndex, searchText } = req.query;
  let posts = {} as PostsResponse;
  // if there's search text do this
  if (searchText && typeof searchText === 'string') {
    posts = await getPostsWithSearchText(searchText);
  }
  else {
    posts = await getPostsInPage(pageIndex ? Number.parseInt(pageIndex as string) : 1);
  }

  res.status(200).json(posts);
}
