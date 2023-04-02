import firebaseClient from "./firebaseClient";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface SignInData {
  username: string;
  password: string;
}

interface User {
  name: string;
  username: string;
  passwordHash: string;
}

if (!process.env.SECRET)
  throw new Error('SECREV env variable not defined.');

const defaultErrorMessage = 'Invalid Username or password';

export default async function signIn(data: SignInData) {
  const user = await requestUser(data.username);
  const valid = bcrypt.compareSync(data.password, user.passwordHash);

  if (!valid)
    throw new Error(defaultErrorMessage);

  const payload = JSON.stringify({
    sub: user.username,
    name: user.name
  });

  const token = jwt.sign(payload, process.env.SECRET || '');

  return {
    token,
    username: user.username,
    name: user.name
  };
}

async function requestUser(username: string) {
  const response = await firebaseClient.collection('users')
    .where('username', '==', username)
    .limit(1)
    .get();

  if (response.size == 0)
    throw new Error(defaultErrorMessage);

  const [user,] = response.docs
    .map(doc => {
      const data = doc.data();
      return {
        name: data.name,
        username: data.username,
        passwordHash: data.passwordHash,
      } as User;
    });

  return user;
}
