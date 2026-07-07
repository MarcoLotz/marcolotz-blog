import {
  Badge,
  Button,
  Container,
  Flex,
  Text,
  Title,
  TypographyStylesProvider,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCalendarTime, IconCheck, IconFolder, IconShare, IconUser } from '@tabler/icons-react';
import React from 'react';
import type { Post as PostData } from '@/lib/posts';
import styles from './index.module.css';

interface PostProps {
  post: PostData;
  /** Page the post is rendered on; undefined while searching (not linkable). */
  pageIndex?: number;
}

// Fixed locale: with a static export the date is rendered at build time and
// hydrated in the browser, so it must not depend on the runtime locale.
const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' });

const Post: React.FC<PostProps> = ({ post, pageIndex }) => {
  const clipboard = useClipboard({ timeout: 2000 });

  const copyLink = () => {
    clipboard.copy(`https://www.marcolotz.com/?pageIndex=${pageIndex}&postId=${post.id}`);
  };

  return (
    <Container id={post.id} className={styles.container}>
      <Flex justify="space-between">
        <Title mb="1.0rem" mr="1.5rem">
          {post.title}
        </Title>
      </Flex>
      <Flex className={styles.badgeContainer} gap="0.5rem" mb="md">
        <Badge className={styles.badge} size="lg" radius="sm" variant="outline">
          <IconCalendarTime size={16} />
          <Text mt={2.3}>{dateFormatter.format(new Date(post.createdAt))}</Text>
        </Badge>
        <Badge className={styles.badge} size="lg" radius="sm" variant="outline">
          <IconUser size={16} />
          <Text mt={2.3}>{post.author}</Text>
        </Badge>
        {post.category && (
          <Badge className={styles.badge} size="lg" radius="sm" variant="outline">
            <IconFolder size={16} />
            <Text mt={2.3}>{post.category}</Text>
          </Badge>
        )}
        {!!pageIndex && (
          <Button
            className={styles.badge}
            onClick={copyLink}
            h={26}
            w={30}
            p={6}
            variant="outline"
            radius="sm"
            aria-label="share button"
            size="compact-sm"
          >
            {clipboard.copied ? <IconCheck /> : <IconShare />}
          </Button>
        )}
      </Flex>

      <TypographyStylesProvider className={styles.htmlProvider}>
        {/* Bodies are sanitized ahead of time by scripts/extract-posts.mjs. */}
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </TypographyStylesProvider>
    </Container>
  );
};

export default Post;
