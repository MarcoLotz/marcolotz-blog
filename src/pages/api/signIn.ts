import signIn from '@/services/signIn';
import type { NextApiRequest, NextApiResponse } from 'next'

interface SignInData {
  username: string;
  password: string;
}

interface SignInResponse {
  token: string;
}

interface ErrorResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignInResponse | ErrorResponse>
) {
  const data: SignInData = req.body;

  try {
    const response = await signIn(data);
    res.status(200).json(response);

  } catch (err) {
    const error = err as Error;

    res.status(401).json({
      message: error.message
    })
  }
}
