import { Container, Group, Input, Pagination } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import Post from '@/components/Post';
import { getAllPosts, type Post as PostData } from '@/lib/posts';
import { filterPosts } from '@/lib/search';
import styles from '@/styles/Home.module.css';

/** Must stay at 3: legacy /?pageIndex=N permalinks assume this page size. */
const PAGE_SIZE = 3;

export const getStaticProps: GetStaticProps<{ posts: PostData[] }> = () => ({
  props: { posts: getAllPosts() },
});

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);

  const filteredPosts = useMemo(() => filterPosts(posts, searchText), [posts, searchText]);
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const currentPage = Math.min(pageIndex, totalPages);
  const visiblePosts = filteredPosts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Legacy permalinks: /?pageIndex=N&postId=<id>. On a static export the
  // query string only becomes available after hydration, so syncing it into
  // state from an effect is unavoidable; it runs once and then clears the URL.
  // The page containing the post is derived from the post list so stale
  // pageIndex values still land on the right post.
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { postId, pageIndex: rawPageIndex } = router.query;
    if (typeof postId !== 'string' && typeof rawPageIndex !== 'string') {
      return;
    }

    let targetPage = typeof rawPageIndex === 'string' ? Number.parseInt(rawPageIndex, 10) : NaN;
    if (typeof postId === 'string') {
      const position = posts.findIndex((post) => post.id === postId);
      if (position >= 0) {
        targetPage = Math.floor(position / PAGE_SIZE) + 1;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time URL → state sync
        setPendingScrollId(postId);
      }
    }

    if (!Number.isNaN(targetPage)) {
      setPageIndex(Math.min(Math.max(targetPage, 1), Math.ceil(posts.length / PAGE_SIZE)));
    }

    void router.replace('/', undefined, { shallow: true });
  }, [router, router.isReady, router.query, posts]);

  // Runs after the target page has rendered, so the shared post exists in the DOM.
  useEffect(() => {
    if (!pendingScrollId) {
      return;
    }

    document.getElementById(pendingScrollId)?.scrollIntoView();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- clears the one-shot scroll target
    setPendingScrollId(null);
  }, [pendingScrollId, currentPage]);

  const handleSearch = (value: string) => {
    setSearchText(value);
    setPageIndex(1);
  };

  const pagination = (label: string) => (
    <Pagination.Root
      total={totalPages}
      value={currentPage}
      onChange={setPageIndex}
      classNames={{ control: styles.paginationControl }}
      getItemProps={() => ({ 'aria-label': label })}
    >
      <Group m="lg" ml="0" mt="0">
        <Pagination.Previous aria-label={label} />
        <Pagination.Items />
        <Pagination.Next aria-label={label} />
      </Group>
    </Pagination.Root>
  );

  return (
    <>
      <Head>
        <title>Marco Aurélio Lotz | Home</title>
        <meta
          name="description"
          content="Marcolotz.com: Thoughts about Big Data and Embedded Systems"
        />
      </Head>
      <Container>
        {pagination('top-pagination')}
        <Input
          m="lg"
          ml="0"
          maw="400px"
          leftSection={<IconSearch size={16} />}
          placeholder="Search"
          value={searchText}
          onChange={(event) => handleSearch(event.currentTarget.value)}
        />
        {visiblePosts.map((post) => (
          <Post key={post.id} post={post} pageIndex={searchText ? undefined : currentPage} />
        ))}
        {pagination('bottom-pagination')}
      </Container>
    </>
  );
}
