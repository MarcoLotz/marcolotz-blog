import Editor from '@/components/Editor';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
import { Button, Container, Flex, MultiSelect, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';

interface Request {
  title: string;
  category: never[];
  body: string;
}

const NewPost: React.FC = () => {
  const form = useForm({
    initialValues: {
      title: '',
      category: [],
      body: '<h1>Type</h1>'
    },

    validate: {
      title: (value) => !!value ? null : 'Invalid title',
    },
  });

  const router = useRouter();
  const { authData } = useAuth();

  const handleSubmit = useCallback(async (data: Request) => {
    await api.post('/api/newPost', data)
    router.push('/');
  }, []);

  const handleImageUpload = async (file: File) => {
    /*const { data } = await api.get('/api/signedUrl', {
      params: {
        path: `${new Date().toISOString()}/${file.name}`
      }
    });
    await uploadByUrl(data.url, file);

    return (data.url as string).split('?')[0];*/

    return URL.createObjectURL(file);
  };

  const uploadByUrl = useCallback(async (url: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    await axios.post(url, '', {
      headers: {
        'Content-Type': file.type,
        'x-goog-resumable': 'start'
      }
    });
    await axios.put(url, formData);
  }, []);

  useEffect(() => {
    if (!authData.signedIn)
      router.push('/admin');
  }, []);

  return authData.signedIn ? <Container>
    <form onSubmit={form.onSubmit(handleSubmit)}>
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
      <Editor onImageUpload={handleImageUpload} {...form.getInputProps('body')} />
    </form>
  </Container> :
    null
}

export default NewPost;
