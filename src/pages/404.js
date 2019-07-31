import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import Head from '../components/head';

const NotFound = () => {
  return (
    <Layout>
      <Head title="Page not found" />
      <h1>Are you lost?</h1>
      <p>The page you are looking for cannot be found.</p>
      <p><Link to="/"><img src="/images/woods.jpg" alt="Lost in the woods" /></Link></p>
      <p><Link to="/">Return Home</Link></p>
    </Layout>
  );
};

export default NotFound;
