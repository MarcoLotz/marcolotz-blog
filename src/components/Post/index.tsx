import { ActionIcon, Badge, Button, Container, createStyles, Flex, Text, Title, TypographyStylesProvider } from '@mantine/core';
import { IconCalendarTime, IconEdit, IconFolder, IconShare, IconTrash, IconUser } from '@tabler/icons-react';
import sanitizeHtml from 'sanitize-html';
import { toast } from 'react-toastify';


import React, { useCallback } from 'react';
import Router from 'next/router';
import api from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { useEditPost } from '@/hooks/useEdit';

interface PostData {
  id: string;
  title: string;
  author: string;
  body: string;
  category: string;
  createdAt: string;
  pageIndex?: number; // not static on search
}

const useStyles = createStyles(() => ({
  container: {
    backgroundColor: "white",
    borderRadius: "0.5rem",
    padding: "2rem",
    marginBottom: "1.5rem",
    border: "0.0625rem solid #ced4da",
  },

  badgeContainer: {
    '@media screen and (max-width: 600px)': {
      flexDirection: 'column'
    }
  },

  badge: {
    '.mantine-Badge-inner': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
    }
  },
  htmlProvider: {
    'figure, img': {
      textAlign: 'center',
      margin: '0 auto',
      'maxHeight': '500px',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    "pre": {
      backgroundColor: "#e9ebe8"
    },
  }

}));

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'long'
});

const Post: React.FC<PostData> = ({ id, title, author, body, category, createdAt, pageIndex }) => {
  const { classes } = useStyles();
  const { authData } = useAuth();
  const { setEditPost } = useEditPost();

  const copyLink = useCallback(() => {
    const link = `https://www.marcolotz.com/?pageIndex=${pageIndex}&postId=${id}`
    navigator.clipboard.writeText(link).then(_ => {
      toast.info('Url copied to clipboard!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  }, [pageIndex, id]);

  const handleDelete = useCallback(async () => {
    if (!confirm('Do you really want to delete this post?'))
      return;

    await api.delete('/api/deletePost', {
      params: {
        id,
      }
    });
    Router.reload();
  }, [id, Router]);

  const handleEdit = useCallback(() => {
    setEditPost({
      id,
      title,
      body,
      category,
    });
    Router.push('/admin/newPost');
  }, [Router, setEditPost]);

  return <Container id={id} className={classes.container}>
    <Flex justify="space-between">
      <Title mb="1.0rem">{title}</Title>
      {
        authData.signedIn &&
        <Flex gap="0.5rem">
        <ActionIcon onClick={handleDelete} color="red" variant="filled"><IconTrash /></ActionIcon>
        <ActionIcon onClick={handleEdit} color="yellow" variant="filled"><IconEdit /></ActionIcon>
      </Flex>
      }
    </Flex>
    <Flex className={classes.badgeContainer} gap='0.5rem' mb="md">
      <Badge className={classes.badge} color="lime" size="lg" radius="sm" variant="outline">
        <IconCalendarTime size={16} />
        <Text mt={2.3}>{dateFormatter.format(new Date(createdAt))}</Text>
      </Badge>
      <Badge className={classes.badge} color="lime" size="lg" radius="sm" variant="outline">
        <IconUser size={16} />
        <Text mt={2.3}>{author}</Text>
      </Badge>
      {
        category &&
        <Badge className={classes.badge} color="lime" size="lg" radius="sm" variant="outline">
        <IconFolder size={16} />
        <Text mt={2.3}>{category}</Text>
      </Badge>}

      {!!pageIndex && <Button
        onClick={() => copyLink()}
        h={26}
        w={30}
        p={6}
        variant="outline"
        color="lime"
        radius="sm"
        compact>
        <IconShare />
      </Button>}
    </Flex>

    <TypographyStylesProvider className={classes.htmlProvider}>
      <div
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(body, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
            allowedSchemes: sanitizeHtml.defaults.allowedSchemes.concat(['data']),
            allowedAttributes: {
              ...sanitizeHtml.defaults.allowedAttributes,
              span: [ 'style'],
              p: [ 'style']
            },
          })
        }}
      />
    </TypographyStylesProvider>
  </Container >;
}

export default Post;
