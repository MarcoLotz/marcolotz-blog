import deletePost from "@/services/deletePost";
import validateJwt from "@/services/validateJwt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  try {
    const [_, token] = req.headers.authorization?.split(' ') as string[];
    validateJwt(token)
  } catch {
    res.status(401).send('');
    return;
  }

  const { id } = req.query;

  if (req.method !== 'DELETE' || !id) {
    res.status(405).send('');
    return;
  }

  await deletePost(id as string);
  res.status(204).send('');
}
