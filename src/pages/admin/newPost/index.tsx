import Editor from '@/components/Editor';
import { Button, Container, Flex, Text, TextInput } from '@mantine/core';
import { IconDeviceFloppy, IconHomeCancel, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';

const NewPost: React.FC = () => {
  const [body, setBody] = useState('');

  return <Container>
    <Flex mb="2rem" justify="space-between">
      <Button bg="white" color="red" w="9rem" ml="1rem" variant="outline">
        <IconX /> <Text ml="0.8rem" size={20}>Cancel</Text>
      </Button>
      <Button bg="white" color="green" w="8rem" mr="1rem" variant="outline">
        <IconDeviceFloppy /> <Text ml="0.8rem" size={20}>Save</Text>
      </Button>
    </Flex>
    <TextInput label="Title" ml="1rem" mr="1rem" mb="2rem" required />
    <Editor value={body} onChange={value => setBody(value)} />
  </Container>
}

export default NewPost;
