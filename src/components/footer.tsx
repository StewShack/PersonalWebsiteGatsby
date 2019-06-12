import React from "react"

import { graphql, useStaticQuery } from "gatsby"

const Footer = () => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    github,
                    linkedin,
                    twitter
                }
            }
        }`);
    return (
        <footer>
        <ul>
        <li><a href={data.site.siteMetadata.github}>Github</a></li>
        <li><a href={data.site.siteMetadata.linkedin}>LinkedIn</a></li>
        <li><a href={data.site.siteMetadata.twitter}>Twotter</a></li>
        </ul>
        </footer>
    )
}

export default Footer;