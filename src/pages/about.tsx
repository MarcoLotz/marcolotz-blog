import About from '@/components/About';
import Head from 'next/head';
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Marco Aurélio Lotz | About</title>
      </Head>
      <About />
    </>
  );
}

export default AboutPage;
