import Editor from '@/components/Editor';
import { useAuth } from '@/hooks/useAuth';
import { useEditPost } from '@/hooks/useEdit';
import api from '@/services/api';
import { Button, Container, Flex, MultiSelect, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';

interface Request {
  title: string;
  category: string[];
  body: string;
}

const dataURItoBlob = (dataURI: string) => {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ab], {type: mimeString});
  return blob;
}

const resize = (file: File, max_height: number): Promise<Blob> => {
  return new Promise(resolve => {
    let fileLoader = new FileReader(),
    context: CanvasRenderingContext2D | null = null,
    imageObj = new Image(),
    blob = null;

    if (file.type.match('image.*')) {
        fileLoader.readAsDataURL(file);
    } else {
        alert('File is not an image');
    }
    fileLoader.onload = function() {
        const data = this.result;
        imageObj.src = data as string;
    };

    imageObj.onload = () => {

        if(imageObj.width == 0 || imageObj.height == 0){
            alert('Image is empty');
        } else {
            const heightProportion = max_height / imageObj.height;
            const resizedWidth = imageObj.width * heightProportion;
            const resizedHeight = imageObj.height * heightProportion;
            const canvas = document.createElement('canvas');
            canvas.id     = "hiddenCanvas";
            canvas.width  = resizedWidth;
            canvas.height = resizedHeight;
            canvas.style.visibility   = "hidden";
            document.body.appendChild(canvas);
            context = canvas.getContext('2d');

            context?.clearRect(0, 0, resizedWidth, resizedHeight);
            context?.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, 0, 0, resizedWidth, resizedHeight);

            blob = dataURItoBlob(canvas.toDataURL('image/jpeg'));

            resolve(blob);
        }
    };

    imageObj.onerror = () => {
        alert("An error occured while loading image.");
    };
  })
}

const NewPost: React.FC = () => {
  const router = useRouter();
  const { authData } = useAuth();
  const { editPost } = useEditPost();

  const form = useForm({
    initialValues: {
      title: editPost?.title || '',
      category: editPost ? editPost.category.split(', ') : [],
      body: editPost?.body || ''
    },

    validate: {
      title: (value) => !!value ? null : 'Invalid title',
    },
  });

  const handleSubmit = useCallback(async (data: Request) => {
    const url = editPost ? '/api/updatePost' : '/api/newPost';
    const requestMethod = editPost ? api.put : api.post;

    await requestMethod(url, {
      ...data,
      category: data.category.join(', '),
      id: editPost?.id,
    })
    router.push('/');
  }, [editPost]);

  const handleImageUpload = async (file: File) => {
    const resizedFile = await resize(file, 500);
    return await getBase64FromFile(resizedFile);
  };

  const getBase64FromFile = useCallback(async (file: File | Blob): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data as string);
      }
    });
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
