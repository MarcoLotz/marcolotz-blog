import { Badge, Center, Container, createStyles, Stack, Text, Title } from '@mantine/core';
import { IconBrandGithub, IconBrandGoogle, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons-react';
import React from 'react';

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: "white",
    borderRadius: "0.5rem",
    padding: "2rem",
    color: "#616161",
    border: "0.0625rem solid #ced4da",
    marginBottom: "7rem",
    marginTop: "4rem",

    display: "flex",
    flexDirection: "column",
    gap: "1rem",

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

  badge: {
    maxWidth: "17rem",
    height: "2.5rem",

    display: "flex",

    justifyContent: "left",
    alignItems: "center",


    color: "#79b458",
    borderColor: "#79b458",

    lineHeight: "1rem",
  },
}));

const Contact: React.FC = () => {
  const { classes } = useStyles();

  return <Container className={classes.container}>
    <Title color="black">
      Contact
    </Title>
    <Text>
      One can contact me at:
    </Text>

    <Center>
      <Text fw="bold">
        contact (at) marcolotz (dot) com
      </Text>
    </Center>
    <Text>
      Bear in mind that one can also find me on the following platforms:
    </Text>

    <Center>
      <Stack w={"20rem"}>
        <a target="_blank" href="https://www.linkedin.com/in/marcolotz/" type="button">
          <Badge className={classes.badge} leftSection={<IconBrandLinkedin size="1.5rem" />} size="xl" radius="0.3rem" variant="outline">
            <Text ml="3.5rem">LinkedIn</Text>
          </Badge>
        </a>

        <a target="_blank" href="https://twitter.com/lotzmarco" type="button">
          <Badge className={classes.badge} leftSection={<IconBrandTwitter size="1.5rem" />} size="xl" radius="0.3rem" variant="outline">
            <Text ml="3.5rem">Twitter</Text>
          </Badge>
        </a>

        <a target="_blank" href="https://github.com/marcolotz" type="button">
          <Badge className={classes.badge} leftSection={<IconBrandGithub size="1.5rem" />} size="xl" radius="0.3rem" variant="outline">
            <Text ml="3.8rem">Github</Text>
          </Badge>
        </a>

        <a target="_blank" href="https://scholar.google.com/citations?hl=en&view_op=list_works&gmla=AJsN-F5QS1KdMYiF5OV9acpzgB_1h-RalA6WUxpgjxB5CRaeuyyprGL3AGfqiKKGpdpgqtCCIk-v4htT06LUuFkQKlC_k3yRFw&user=TeyCW8MAAAAJ" type="button">
          <Badge className={classes.badge} leftSection={<IconBrandGoogle size="1.5rem" />} size="xl" radius="0.3rem" variant="outline">
            <Text ml="1.3rem">Google Scholar</Text>
          </Badge>
        </a>

      </Stack>
    </Center>
  </Container >;
}

export default Contact;
