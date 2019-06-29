import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const Head = ({ title, description }) => {
    const data = useStaticQuery(graphql`
    query {
        site {
            siteMetadata {
                title,
                themeColor
            }
        }
    }`)
    
    return (
        <Helmet>
            <meta charset="utf-8" />  
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
            <meta name="msapplication-tap-highlight" content="no" />
            <meta name="msapplication-TileColor" content={`${data.site.siteMetadata.themeColor}`} />
            <meta name="theme-color" content={`${data.site.siteMetadata.themeColor}`} />
            <meta name="Description" content={`${description}`} />
            <title>{`${data.site.siteMetadata.title} - ${title}`}</title> 
            <link rel="stylesheet" href="/styles/site.css" />
            <link rel="author" href="/humans.txt" />
            <link rel="manifest" href="/manifest.json" />
        </Helmet>
    )
}

export default Head