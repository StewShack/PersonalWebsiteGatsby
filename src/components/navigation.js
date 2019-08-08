import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFlask } from "@fortawesome/free-solid-svg-icons/faFlask"
import { faBeer } from "@fortawesome/free-solid-svg-icons/faBeer"
import { faCode } from "@fortawesome/free-solid-svg-icons/faCode"
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub"
import { faGoodreads } from "@fortawesome/free-brands-svg-icons/faGoodreads"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin"
import { faMix } from "@fortawesome/free-brands-svg-icons/faMix"
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter"
import { faYoutube } from "@fortawesome/free-brands-svg-icons/faYoutube"

const Navigation = props => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          github
          goodreads
          linkedin
          mix
          twitter
          youtube
        }
      }
    }
  `)

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Dan Stewart</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" activeKey={props.activemenu}>
          <Nav.Link href="/post/qa" eventKey="testing">
            <FontAwesomeIcon icon={faFlask} size="lg" />
          </Nav.Link>
          <Nav.Link href="/post/qa" eventKey="testing">
            Tester
          </Nav.Link>
          <Nav.Link href="/post/sc" eventKey="web">
            <FontAwesomeIcon icon={faCode} size="lg" />
          </Nav.Link>
          <Nav.Link href="/post/sc" eventKey="web">
            Developer
          </Nav.Link>
          <Nav.Link href="/post/brew" eventKey="brewing">
            <FontAwesomeIcon icon={faBeer} size="lg" />
          </Nav.Link>
          <Nav.Link href="/post/brew" eventKey="brewing">
            Homebrewer
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href={data.site.siteMetadata.github}>
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </Nav.Link>
          <Nav.Link href={data.site.siteMetadata.goodreads}>
            <FontAwesomeIcon icon={faGoodreads} size="lg" />
          </Nav.Link>
          <Nav.Link href={data.site.siteMetadata.linkedin}>
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </Nav.Link>
          <Nav.Link href={data.site.siteMetadata.mix}>
            <FontAwesomeIcon icon={faMix} size="lg" />
          </Nav.Link>
          <Nav.Link href={data.site.siteMetadata.twitter}>
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </Nav.Link>
          <Nav.Link href={data.site.siteMetadata.youtube}>
            <FontAwesomeIcon icon={faYoutube} size="lg" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

Navigation.propTypes = {
  activemenu: PropTypes.string,
}

Navigation.defaultProps = {
  activemenu: `Home`,
}

export default Navigation
