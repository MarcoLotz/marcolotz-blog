import getPosts from '@/services/getPosts';
import type { NextApiRequest, NextApiResponse } from 'next'

export type PostData = {
  id: string;
  title: string;
  author: string;
  body: string;
  category: string;
  createdAt: Date;
}

export interface PostsResponse {
  items: PostData[];
  pageIndex: number;
  count: number;
  totalPages: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostsResponse>
) {
  const { pageIndex, searchText } = req.query;

  const response = await getPosts(
    pageIndex ? Number.parseInt(pageIndex as string) : 1,
    3,
    searchText as string);

  res.status(200).json(response);
}
