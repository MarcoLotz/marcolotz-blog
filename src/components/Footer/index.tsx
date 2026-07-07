import { ActionIcon, Container, Group } from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandLinkedin,
  IconBrandTwitter,
} from '@tabler/icons-react';
import styles from './index.module.css';
import React from 'react';

const Footer: React.FC = () => {
  const date = new Date().getFullYear();
  return (
    <div className={styles.footer}>
      <Container className={styles.inner}>
        <span>© {date} by Marco Aurélio Lotz</span>
        <Group gap={0} className={styles.links} justify="flex-end" wrap="nowrap">
          <ActionIcon
            variant="subtle"
            color="gray"
            component="a"
            href="https://www.linkedin.com/in/marcolotz/"
            target="_blank"
            size="lg"
            aria-label="Marco Lotz's Linkedin"
          >
            <IconBrandLinkedin size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="gray"
            component="a"
            href="https://twitter.com/lotzmarco"
            target="_blank"
            size="lg"
            aria-label="Marco Lotz's Twitter"
          >
            <IconBrandTwitter size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="gray"
            component="a"
            href="https://github.com/marcolotz"
            target="_blank"
            size="lg"
            aria-label="Marco Lotz's GitHub"
          >
            <IconBrandGithub size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="gray"
            component="a"
            href="https://scholar.google.com/citations?hl=en&view_op=list_works&gmla=AJsN-F5QS1KdMYiF5OV9acpzgB_1h-RalA6WUxpgjxB5CRaeuyyprGL3AGfqiKKGpdpgqtCCIk-v4htT06LUuFkQKlC_k3yRFw&user=TeyCW8MAAAAJ"
            target="_blank"
            size="lg"
            aria-label="Marco Lotz's Google Scholar"
          >
            <IconBrandGoogle size="1.05rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
};

export default Footer;
