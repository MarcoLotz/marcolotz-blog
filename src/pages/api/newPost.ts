import createPost from "@/services/createPost";
import validateJwt from "@/services/validateJwt";
import { NextApiRequest, NextApiResponse } from "next";

export type PostData = {
  title: string;
  author: string;
  createdAt: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostData>
) {
  let author;
  try {
    const [_, token] = req.headers.authorization?.split(' ') as string[];
    author = validateJwt(token).name
  } catch {
    res.status(401);
    return;
  }

  if (req.method !== 'POST') {
    res.status(405);
    return;
  }

  const post = await createPost({
    ...req.body,
    author
  });

  res.status(200).json({
    title: post.title,
    author: post.title,
    createdAt: post.createdAt.toISOString()
  });
}
