import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from 'prop-types';

const Head = ({title, description}) => {
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
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
            <meta name="msapplication-tap-highlight" content="no" />
            <meta name="msapplication-TileColor" content={`${data.site.siteMetadata.themeColor}`} />
            <meta name="theme-color" content={`${data.site.siteMetadata.themeColor}`} />
            <meta name="Description" content={`${description}`} />
            <title>{`${data.site.siteMetadata.title} - ${title}`}</title> 
            <link rel="author" href="/humans.txt" />
            <link rel="manifest" href="/manifest.json" />
        </Helmet>
    )
}

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

export default Head