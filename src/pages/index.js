import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/layout';
import Head from '../components/head';

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark (fields: { slug: { eq: "_index" }}) {
        frontmatter {
          title,
          description,
          activemenu
        },
        html
      }
  }`);

  return (
    <Layout activemenu={data.markdownRemark.frontmatter.activemenu}>
      <Head title={data.markdownRemark.frontmatter.title} description={data.markdownRemark.frontmatter.description} />
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </Layout>
  );
};

export default IndexPage;
