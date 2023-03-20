import { useCallback, useEffect } from 'react';
import { TextInput, Button, Group, Box, createStyles, Container, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from '@/hooks/useAuth';
import Router from 'next/router';

const useStyles = createStyles(() => ({
  container: {
    backgroundColor: "white",
    borderRadius: "0.5rem",
    padding: "2rem",
    marginBottom: "1.5rem",
    border: "0.0625rem solid #ced4da",
    marginTop: "5rem"
  }
}));

interface Request {
  username: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { classes } = useStyles();
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
  }, []);


  useEffect(() => {
    if (!!authData.signedIn) {
      Router.push('/');
    };
  }, []);

  return (
    <Container >
      <Box className={classes.container} maw={300} mx="auto">
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
