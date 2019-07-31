import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Head from '../components/head';
import Layout from '../components/layout';

export const query = graphql`
  query ($slug: String!) {
    markdownRemark (fields: { slug: { eq: $slug }}) {
      frontmatter {
        title,
        description,
        activemenu
      },
      html
    }
  }`;

const post = (props) => {
  return (
    <Layout activemenu={props.data.markdownRemark.frontmatter.activemenu}>
      <Head title={props.data.markdownRemark.frontmatter.title} description={props.data.markdownRemark.frontmatter.description} />
      <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }} />
    </Layout>
  );
};

post.propTypes = {
  data: PropTypes.any,
  markdownRemark: PropTypes.any,
  frontmatter: PropTypes.any,
  activemenu: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  html: PropTypes.string,
};

post.defaultProps = {
  data: PropTypes.any,
  markdownRemark: PropTypes.any,
  frontmatter: PropTypes.any,
  activemenu: 'Home',
  title: '',
  description: '',
  html: '',
};

export default post;
