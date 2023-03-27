import getSignedUrl from "@/services/getSignedUrl";
import validateJwt from "@/services/validateJwt";
import { NextApiRequest, NextApiResponse } from "next";

interface SignedUrlResponse {
  url: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignedUrlResponse>
) {
  try {
    const [_, token] = req.headers.authorization?.split(' ') as string[];
    validateJwt(token);
  } catch {
    res.status(401).json({} as SignedUrlResponse);
    return;
  }

  const path = req.query.path as string;

  if (!path) {
    res.status(400).json({} as SignedUrlResponse);
    return;
  }

  const url = await getSignedUrl(path);

  res.status(200).json({
    url
  });
}
