import Head from 'next/head';
import { Container, Input, Pagination, Skeleton } from '@mantine/core';
import Post from '@/components/Post';
import React, { useCallback, useEffect, useState } from 'react';
import { PostData, PostsResponse } from './api/posts';
import api from '@/services/api';
import { IconSearch } from '@tabler/icons-react';
import { debounce } from 'lodash';
import { getPostsInPage } from '@/services/getPosts';
import { useRouter } from "next/router";
import { NextPageContext } from 'next';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const getPagedPosts = async (pageIndex: number, searchText: string = ''): Promise<PostsResponse> => {
  const { data: data } = await api.get<PostsResponse>('/api/posts', {
    params: {
      pageIndex,
      searchText
    }
  });

  return data;
};

// Server Side rendering due to query params
export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;
  const pageIndex = query.pageIndex ? Number.parseInt(query.pageIndex as string) : 1;

  const page = await getPostsInPage(pageIndex);

  return {
    props: {
      data: page
    }
  }
}

interface PageData {
  pageIndex: number;
  totalNumberOfPages: number;
}

type PagedPostsResponse = PageData & PostsResponse;

export default function Home({ data }: { data: PagedPostsResponse }) {
  const [windowManager, setWindowManager] = useState<Window | undefined>(undefined);
  const [posts, setPosts] = useState<PostData[]>(data.items);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState<PageData>({
    pageIndex: data.pageIndex,
    totalNumberOfPages: data.totalNumberOfPages,
  });

  const { query } = useRouter();

  const debouncedSetSearchText = debounce((text: string) => {
    setSearchText(text);
  }, 500);

  const handlePageData = useCallback(() => {
    setLoading(true);

    if (pageData.pageIndex === 1 && !searchText) {
      getPagedPosts(pageData.pageIndex)
        .then(res => {
          setPosts(res.items);
          setPageData(prev => ({ ...prev, totalPages: data.totalNumberOfPages }));
          setLoading(false);
        });
    }
    else
      getPagedPosts(pageData.pageIndex, searchText)
        .then(res => {
          setPosts(res.items);
          setPageData(prev => ({ ...prev, totalPages: data.totalNumberOfPages }));
          setLoading(false);
        });
  }, [pageData.pageIndex, searchText]);

  const handleScroll = useCallback(() => {
    if (typeof windowManager === 'undefined')
      return;

    const { postId } = query;

    if (!postId)
      return;

    const post = document.getElementById(postId as string);

    post && windowManager.scrollTo(post.offsetLeft, post.offsetTop + 260);
  }, [query.postId, windowManager]);

  useEffect(() => {
    handlePageData();
  }, [handlePageData]);

  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  useEffect(() => {
    if (typeof windowManager === 'undefined')
      setWindowManager(window);
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Head>
        <title>Marco Aurélio Lotz | Home</title>
        <meta name="description" content="Thoughts about Big Data and Embedded Systems"/>
      </Head>
      <Container sx={{
        '.mantine-Pagination-control[data-active]': {
          background: '#79b458',
          ':hover': {
            background: '#5e8b44',
          }
        }
      }}>

        <Pagination
          color="green"
          m="lg"
          ml="0"
          mt="0"
          value={pageData.pageIndex}
          onChange={page => setPageData(prev => ({ ...prev, pageIndex: page }))}
          total={pageData.totalNumberOfPages}
        />
        <Input
          m="lg"
          ml="0"
          maw="400px"
          icon={<IconSearch />}
          placeholder="Search"
          onChange={({ target }) => debouncedSetSearchText(target.value)}
        />
        <Skeleton visible={loading}>
          {posts.map(post => (
            <Post
              id={post.id}
              key={post.id}
              author={post.author}
              body={post.body}
              category={post.category}
              createdAt={post.createdAt}
              title={post.title}
              pageIndex={(pageData.pageIndex && !searchText) ? pageData.pageIndex : undefined}
            />
          ))}
        </Skeleton>

        <Pagination
          color="green"
          m="lg"
          ml="0"
          mt="0"
          value={pageData.pageIndex}
          onChange={page => setPageData(prev => ({ ...prev, pageIndex: page }))}
          total={pageData.totalNumberOfPages}
        />
      </Container>
    </>
  )
}
