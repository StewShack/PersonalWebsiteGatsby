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
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="msapplication-tap-highlight" content="no" />
            <meta name="msapplication-TileColor" content={`${data.site.siteMetadata.themeColor}`} />
            <meta name="theme-color" content={`${data.site.siteMetadata.themeColor}`} />
            <meta name="Description" content={`${description}`} />
            <title>{`${data.site.siteMetadata.title} - ${title}`}</title> 
            <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css" crossorigin="anonymous" />
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />
            <link rel="author" href="/humans.txt" />
            <link rel="manifest" href="/manifest.json" />
        </Helmet>
    )
}

export default Head