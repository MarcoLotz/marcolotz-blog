import firebaseClient from "./firebaseClient";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface SignInData {
  username: string;
  password: string;
}

export default async function signIn(data: SignInData) {
  const defaultErrorMessage = 'Invalid Username or password';

  const response = await firebaseClient.collection('users')
    .where('username', '==', data.username)
    .limit(1)
    .get();

  if (response.size == 0)
    throw new Error(defaultErrorMessage);

  const [user,] = response.docs
    .map(doc => {
      const data = doc.data();
      return {
        username: data.username,
        password: data.password
      } as SignInData;
    });

  const valid = bcrypt.compareSync(data.password, user.password);

  if (!valid)
    throw new Error(defaultErrorMessage);

  const payload = JSON.stringify({
    sub: user.username
  });
  const token = jwt.sign(payload, process.env.SECRET || '');

  return {
    token,
  };
}
