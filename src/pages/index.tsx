import Head from 'next/head';
import {Container, Input, Pagination, Skeleton} from '@mantine/core';
import Post from '@/components/Post';
import React, {useCallback, useEffect, useState} from 'react';
import {PostData, PostsResponse} from './api/posts';
import {IconSearch} from '@tabler/icons-react';
import {debounce} from 'lodash';
import {useRouter} from "next/router";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '@/services/api';
import { getPostsInPage } from '@/services/getPosts';

const getPagedPosts = async (pageIndex: number, searchText: string = ''): Promise<PostsResponse> => {
  const urlParameter = {
    pageIndex,
    searchText
  };

  const posts = await api.get<PostsResponse>('/api/posts', urlParameter);

  return posts;
};

interface PageData {
  pageIndex: number;
  totalNumberOfPages: number;
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
// Note: In development it runs on every request
export async function getStaticProps() {

  // Pre-loads the latest page
  const page = await getPostsInPage(1);

  return {
    props: {
      data: page
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 1 hour
    revalidate: 60 * 60, // In seconds
  }
}

type PagedPostsResponse = PageData & PostsResponse;


export default function Home({data}: { data: PagedPostsResponse }) {
  const [windowManager, setWindowManager] = useState<Window | undefined>(undefined);
  const [posts, setPosts] = useState<PostData[]>(data.items);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pageData, setPageData] = useState<PageData>({
    pageIndex: data.pageIndex,
    totalNumberOfPages: data.totalNumberOfPages,
  });

  const {query} = useRouter();

  // Used to prevent text entries from sending API queries before the wait time
  const debouncedSetSearchText = debounce((text: string) => {
    setSearchText(text);
  }, 500);

  const handlePageData = useCallback(() => {
    // First page is pre-rendered on server-side, no need to loading
    if (pageData.pageIndex === 1 && !searchText) {
      getPagedPosts(pageData.pageIndex)
        .then(res => {
          setPosts(res.items);
          setPageData(prev => ({...prev, totalPages: data.totalNumberOfPages}));
        });
    } else {
      // Generate "loading" while API call retrieves the data
      setIsLoading(true);
      getPagedPosts(pageData.pageIndex, searchText)
        .then(res => {
          setPosts(res.items);
          setPageData(prev => ({...prev, totalPages: data.totalNumberOfPages}));
          setIsLoading(false);
        });
    }
  }, [pageData.pageIndex, pageData.totalNumberOfPages, searchText]);

  // This is used to handle share, that will scroll all the way from the original page to the
  // intended step:
  // e.g. https://www.marcolotz.com/?pageIndex=1&postId=HigfhDPyMIaiKggRNFnc
  const handleScroll = useCallback(() => {
    if (typeof windowManager === 'undefined')
      return;

    const {postId} = query;

    if (!postId)
      return;

    const post = document.getElementById(postId as string);

    post && windowManager.scrollTo(post.offsetLeft, post.offsetTop + 260);
  }, [windowManager, query]);

  useEffect(() => {
    handlePageData();
  }, [handlePageData]);

  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  useEffect(() => {
    if (typeof windowManager === 'undefined')
      setWindowManager(window);
  }, [windowManager]);

  return (
    <>
      <Head>
        <title>Marco Aurélio Lotz | Home</title>
        <meta name="description"
              content="Marcolotz.com: Thoughts about Big Data and Embedded Systems"/>
      </Head>
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
      <Container
        sx={{
          '.mantine-Pagination-control[data-active]': {
            background: '#56813C',
            ':hover': {
              background: '#5e8b44',
            }
          }
        }}
      >

        <Pagination
          color="green"
          m="lg"
          ml="0"
          mt="0"
          value={pageData.pageIndex}
          onChange={page => setPageData(prev => ({...prev, pageIndex: page}))}
          total={pageData.totalNumberOfPages}
          getItemProps={(page) => ({
            'aria-label': 'top-pagination'
          })}
        />
        <Input
          m="lg"
          ml="0"
          maw="400px"
          icon={<IconSearch/>}
          placeholder="Search"
          onChange={({target}) => debouncedSetSearchText(target.value)}
        />
        <Skeleton visible={isLoading}>
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
          onChange={page => setPageData(prev => ({...prev, pageIndex: page}))}
          total={pageData.totalNumberOfPages}
          getItemProps={(page) => ({
            'aria-label': 'bottom-pagination'
          })}
        />
      </Container>
    </>
  )
}
