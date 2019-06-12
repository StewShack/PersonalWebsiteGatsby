import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from '../components/layout';
import Head from "../components/head"

const IndexPage = () => {
    const data = useStaticQuery(graphql`
        query {
          allMarkdownRemark {
            edges {
              node {
                id,
                frontmatter {
                  title
                },
                fields {
                    slug
                }
              }
            }
          }
        }`);
        
    return (
    <Layout>
    <Head title="Dan Stewart" />
    <ol>
        {data.allMarkdownRemark.edges.map((edge) => {
            return (
        <li>
        <Link to={`/blog/${edge.node.fields.slug}`}>
           <h2>{edge.node.frontmatter.title}</h2>
        </Link>
        </li>     
            )
        })}
    </ol>
    </Layout>
    )
}

export default IndexPage; 