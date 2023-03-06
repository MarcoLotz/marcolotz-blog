import { Badge, Container, createStyles, Flex, Text, Title, TypographyStylesProvider } from '@mantine/core';
import { IconCalendarTime, IconFolder, IconUser } from '@tabler/icons-react';
import sanitizeHtml from 'sanitize-html';


import React from 'react';

// import { Container } from './styles';

interface PostData {
  title: string;
  author: string;
  body: string;
  category: string;
  createdAt: Date;
}

const useStyles = createStyles((theme) => ({
  container: {
    backgroundColor: "white",
    borderRadius: "0.5rem",
    padding: "2rem",
    "pre": {
      backgroundColor: "#e9ebe8"
    }
  },

  badge: {
    '.mantine-Badge-inner': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    }
  }

}));

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'long'
});

const Post: React.FC<PostData> = ({ title, author, body, category, createdAt }) => {
  const { classes } = useStyles();

  return <Container className={classes.container}>
    <Title mb="1.5rem">{title}</Title>
    <Flex gap='0.5rem'>
      <Badge className={classes.badge} color="lime" size="lg" radius="sm" variant="outline">
        <IconCalendarTime size={16} />
        <Text mt={2.3}>{dateFormatter.format(createdAt)}</Text>
      </Badge>
      <Badge className={classes.badge} color="lime" size="lg" radius="sm" variant="outline">
        <IconUser size={16} />
        <Text mt={2.3}>{author}</Text>
      </Badge>
      <Badge className={classes.badge} color="lime" size="lg" radius="sm" variant="outline">
        <IconFolder size={16} />
        <Text mt={2.3}>{category}</Text>
      </Badge>
    </Flex>

    <TypographyStylesProvider>
      <div
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(body, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
          })
        }}
      />
    </TypographyStylesProvider>
  </Container>;
}

export default Post;
