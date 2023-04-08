import { useCallback, useEffect } from 'react';
import { TextInput, Button, Group, Box, Container, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from '@/hooks/useAuth';
import Router from 'next/router';
import styles from './index.module.css'

interface Request {
  username: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { authData, signIn } = useAuth();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (value) => (value ? null : 'Invalid Username'),
      password: (value) => (value ? null : 'Invalid Password'),
    },
  });

  const hadleSignIn = useCallback(async (request: Request) => {
    try {
      await signIn(request);
      Router.push('/');
    } catch {
      form.setFieldError('password', 'Wrong username/password');
    }
  }, [form, signIn]);


  useEffect(() => {
    if (!!authData.signedIn) {
      Router.push('/');
    };
  }, [authData.signedIn]);

  return (
    <Container >
      <Box className={styles.container} maw={300} mx="auto">
        <Title size="md" mb="lg">Sign In</Title>
        <form onSubmit={form.onSubmit((values: Request) => hadleSignIn(values))}>
          <TextInput
            withAsterisk
            label="Username"
            placeholder="username"
            {...form.getInputProps('username')}
          />

          <TextInput
            withAsterisk
            label="Password"
            placeholder="password"
            type="password"
            {...form.getInputProps('password')}
          />

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </Container>
  );
}

export default SignIn;
