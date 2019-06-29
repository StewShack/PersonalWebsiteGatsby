import React from "react"
import { graphql } from "gatsby"

import Head from "../components/head"
import Layout from "../components/layout"

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
}`

const post = (props) => {
    return (
        <Layout activemenu={props.data.markdownRemark.frontmatter.activemenu}>
            <Head title={props.data.markdownRemark.frontmatter.title} 
                description={props.data.markdownRemark.frontmatter.description} />
            <div dangerouslySetInnerHTML={{__html: props.data.markdownRemark.html}}>
            </div>
        </Layout>
    )
}

export default post