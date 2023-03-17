import { ActionIcon, Container, createStyles, Group, rem } from '@mantine/core';
import { IconBrandGithub, IconBrandGoogle, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons-react';
import React from 'react';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(60),
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
      }`,
    background: 'white',
    color: "#868e96",

    "a": {
      textDecoration: "none",
      color: "inherit",
      cursor: "pointer",

      ":hover": {
        transform: "scale(1.02)",
        transition: "0.5s transform"
      }
    }
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

const Footer: React.FC = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <span>@Marco Aurélio Lotz</span>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <a href="https://www.linkedin.com/in/marcolotz/" target="_blank">
            <ActionIcon size="lg">
              <IconBrandLinkedin size="1.05rem" stroke={1.5} />
            </ActionIcon>
          </a>
          <a href="https://twitter.com/lotzmarco" target="_blank">
            <ActionIcon size="lg">
              <IconBrandTwitter size="1.05rem" stroke={1.5} />
            </ActionIcon>
          </a>
          <a href="https://github.com/marcolotz" target="_blank">
            <ActionIcon size="lg">
              <IconBrandGithub size="1.05rem" stroke={1.5} />
            </ActionIcon>
          </a>
          <a href="https://scholar.google.com/citations?hl=en&view_op=list_works&gmla=AJsN-F5QS1KdMYiF5OV9acpzgB_1h-RalA6WUxpgjxB5CRaeuyyprGL3AGfqiKKGpdpgqtCCIk-v4htT06LUuFkQKlC_k3yRFw&user=TeyCW8MAAAAJ" target="_blank">
            <ActionIcon size="lg">
              <IconBrandGoogle size="1.05rem" stroke={1.5} />
            </ActionIcon>
          </a>
        </Group>
      </Container>
    </div>
  );
}

export default Footer;
