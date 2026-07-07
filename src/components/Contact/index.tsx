import { Badge, Center, Container, Stack, Text, Title } from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandLinkedin,
  IconBrandTwitter,
} from '@tabler/icons-react';
import styles from './index.module.css';
import React from 'react';

const PLATFORMS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/marcolotz/',
    icon: IconBrandLinkedin,
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/lotzmarco',
    icon: IconBrandTwitter,
  },
  {
    label: 'Github',
    href: 'https://github.com/marcolotz',
    icon: IconBrandGithub,
  },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?hl=en&view_op=list_works&gmla=AJsN-F5QS1KdMYiF5OV9acpzgB_1h-RalA6WUxpgjxB5CRaeuyyprGL3AGfqiKKGpdpgqtCCIk-v4htT06LUuFkQKlC_k3yRFw&user=TeyCW8MAAAAJ',
    icon: IconBrandGoogle,
  },
];

const Contact: React.FC = () => {
  return (
    <Container className={styles.container}>
      <Title c="black">Contact</Title>
      <Text>One can contact me at:</Text>

      <Center>
        <Text fw="bold">contact (at) [the-name-of-this-site] (dot) com</Text>
      </Center>
      <Text>Bear in mind that one can also find me on the following platforms:</Text>

      <Center>
        <Stack align="center">
          {PLATFORMS.map(({ label, href, icon: Icon }) => (
            <a key={label} target="_blank" rel="noopener noreferrer" href={href}>
              <Badge
                classNames={{ root: styles.badge, section: styles.badgeSection }}
                leftSection={<Icon size="1.5rem" />}
                size="xl"
                radius="0.3rem"
                variant="outline"
              >
                {label}
              </Badge>
            </a>
          ))}
        </Stack>
      </Center>
    </Container>
  );
};

export default Contact;
