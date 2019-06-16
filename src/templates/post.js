import React from "react"
import { graphql } from "gatsby"

import Head from "../components/head"
import Layout from "../components/layout"

export const query = graphql`
query ($slug: String!) {
  markdownRemark (fields: { slug: { eq: $slug }}) {
    frontmatter {
      title,
      description
    },
    html
  }
}`

const post = (props) => {
    return (
        <Layout>
            <Head title={props.data.markdownRemark.frontmatter.title} 
                description={props.data.markdownRemark.frontmatter.description} />
            <h1>{props.data.markdownRemark.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{__html: props.data.markdownRemark.html}}>
            </div>
        </Layout>
    )
}

export default post