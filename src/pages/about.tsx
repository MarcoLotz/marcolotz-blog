import About from '@/components/About';
import Head from 'next/head';
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Marco Aurélio Lotz | About</title>
        <meta name="description" content="About Marco Lotz" />
      </Head>
      <About />
    </>
  );
};

export default AboutPage;
