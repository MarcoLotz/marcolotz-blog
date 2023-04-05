import Contact from '@/components/Contact';
import Head from 'next/head';
import React from 'react';


const ContactPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Marco Aurélio Lotz | Contact</title>
        <meta name="description" content="Contact Marco Lotz"/>
      </Head>
      <Contact />
    </>
  );
}

export default ContactPage;
