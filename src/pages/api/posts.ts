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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostData[]>
) {
  const { pageIndex } = req.query;

  const posts = await getPosts(
    pageIndex ? Number.parseInt(pageIndex as string) : 1,
    3);

  res.status(200).json(posts);
}
