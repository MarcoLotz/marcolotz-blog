import Editor from '@/components/Editor';
import { useAuth } from '@/hooks/useAuth';
import { Button, Container, Flex, MultiSelect, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const NewPost: React.FC = () => {
  const form = useForm({
    initialValues: {
      title: '',
      category: [],
      body: ''
    },

    validate: {
      title: (value) => !!value ? null : 'Invalid title',
    },
  });

  const router = useRouter();
  const { authData } = useAuth();


  useEffect(() => {
    if (!authData.signedIn)
      router.push('/admin');
  }, []);

  return authData.signedIn ? <Container>
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Flex mb="2rem" justify="space-between">
        <Button onClick={() => router.push('/')} bg="white" color="red" w="9rem" ml="1rem" variant="outline">
          <IconX /> <Text ml="0.8rem" size={20}>Cancel</Text>
        </Button>
        <Button bg="white" type='submit' color="green" w="8rem" mr="1rem" variant="outline">
          <IconDeviceFloppy /> <Text ml="0.8rem" size={20}>Save</Text>
        </Button>
      </Flex>
      <TextInput
        label="Title"
        ml="1rem"
        mr="1rem"
        mb="1rem"
        required {...form.getInputProps('title')} />
      <MultiSelect
        ml="1rem" mr="1rem" mb="2rem"
        data={[
          { value: 'Big Data', label: 'Big Data' },
          { value: 'Embedded Systems', label: 'Embedded Systems' },
        ]}
        label="Categories"
        placeholder="Pick all that you want"
        {...form.getInputProps('category')}
      />
      <Editor {...form.getInputProps('body')} />
    </form>
  </Container> :
    null
}

export default NewPost;
