import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

const Navigation = () => {
    const data = useStaticQuery(graphql`
        query {
          site {
            siteMetadata {
              author
            }
          }
        }`);
    return (
        <nav>
          <Link to="/">{data.site.siteMetadata.author}</Link>
          <div>
            <ul>
              <li id="home"><Link to="/">Home</Link></li>
              <li id="testing"><Link to="/qa/">Testing</Link></li>
              <li id="web"><Link to="/sc/">Development</Link></li>
              <li id="brewing"><Link to="/brew/">Home Brewing</Link></li>
              <li id="links"><Link to="/links/">Links</Link></li>
              <li id="contact"><Link to="/contact/">Contact</Link></li>
              <li id="privacy"><Link to="/privacy/">Privacy Policy</Link></li>
            </ul>
          </div>
        </nav>
    )
}

export default Navigation;