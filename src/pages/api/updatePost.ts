import updatePost from "@/services/updatePost";
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

  if (req.method !== 'PUT') {
    res.status(405).send('');
    return;
  }

  await updatePost({
    ...req.body,
  });

  res.status(204).send('');
}

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '4mb' // Set desired value here
      }
  }
}
