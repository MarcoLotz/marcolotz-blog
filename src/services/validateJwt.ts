import jwt, { JwtPayload } from 'jsonwebtoken';


export default function validateJwt(token: string) {
  const payload = jwt.verify(token, process.env.SECRET || '') as JwtPayload;

  return {
    name: payload.name,
    sub: payload.sub
  };
}
