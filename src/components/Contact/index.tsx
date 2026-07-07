import { Badge, Center, Container, Stack, Text, Title } from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandLinkedin,
  IconBrandTwitter,
} from '@tabler/icons-react';
import styles from './index.module.css';
import React from 'react';

const Index: React.FC = () => {
  return (
    <Container className={styles.container}>
      <Title c="black">Contact</Title>
      <Text>One can contact me at:</Text>

      <Center>
        <Text fw="bold">contact (at) [the-name-of-this-site] (dot) com</Text>
      </Center>
      <Text>Bear in mind that one can also find me on the following platforms:</Text>

      <Center>
        <Stack w={'20rem'}>
          <a target="_blank" href="https://www.linkedin.com/in/marcolotz/" type="button">
            <Badge
              className={styles.badge}
              leftSection={<IconBrandLinkedin size="1.5rem" />}
              size="xl"
              radius="0.3rem"
              variant="outline"
            >
              <Text ml="3.5rem">LinkedIn</Text>
            </Badge>
          </a>

          <a target="_blank" href="https://twitter.com/lotzmarco" type="button">
            <Badge
              className={styles.badge}
              leftSection={<IconBrandTwitter size="1.5rem" />}
              size="xl"
              radius="0.3rem"
              variant="outline"
            >
              <Text ml="3.5rem">Twitter</Text>
            </Badge>
          </a>

          <a target="_blank" href="https://github.com/marcolotz" type="button">
            <Badge
              className={styles.badge}
              leftSection={<IconBrandGithub size="1.5rem" />}
              size="xl"
              radius="0.3rem"
              variant="outline"
            >
              <Text ml="3.8rem">Github</Text>
            </Badge>
          </a>

          <a
            target="_blank"
            href="https://scholar.google.com/citations?hl=en&view_op=list_works&gmla=AJsN-F5QS1KdMYiF5OV9acpzgB_1h-RalA6WUxpgjxB5CRaeuyyprGL3AGfqiKKGpdpgqtCCIk-v4htT06LUuFkQKlC_k3yRFw&user=TeyCW8MAAAAJ"
            type="button"
          >
            <Badge
              className={styles.badge}
              leftSection={<IconBrandGoogle size="1.5rem" />}
              size="xl"
              radius="0.3rem"
              variant="outline"
            >
              <Text ml="1.3rem">Google Scholar</Text>
            </Badge>
          </a>
        </Stack>
      </Center>
    </Container>
  );
};

export default Index;
