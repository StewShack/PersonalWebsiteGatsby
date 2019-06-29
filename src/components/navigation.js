import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask } from '@fortawesome/free-solid-svg-icons/faFlask';
import { faBeer } from '@fortawesome/free-solid-svg-icons/faBeer';
import { faCode } from '@fortawesome/free-solid-svg-icons/faCode';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faGoodreads } from '@fortawesome/free-brands-svg-icons/faGoodreads';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube';

const Navigation = (props) => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    github,
                    goodreads,
                    linkedin,
                    twitter,
                    youtube
                }
            }
        }`)
        
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/" eventKey="home">Dan Stewart</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" activeKey={props.activemenu}>
                    <Nav.Link href="/post/qa" eventKey="testing"><FontAwesomeIcon icon={faFlask} size="lg" /> Tester</Nav.Link>
                    <Nav.Link href="/post/sc" eventKey="web"><FontAwesomeIcon icon={faCode} size="lg" /> Developer</Nav.Link>
                    <Nav.Link href="/post/brew" eventKey="brewing"><FontAwesomeIcon icon={faBeer} size="lg" /> Homebrewer</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href={data.site.siteMetadata.github}><FontAwesomeIcon icon={faGithub} size="lg" /></Nav.Link>
                    <Nav.Link href={data.site.siteMetadata.goodreads}><FontAwesomeIcon icon={faGoodreads} size="lg" /></Nav.Link>
                    <Nav.Link href={data.site.siteMetadata.linkedin}><FontAwesomeIcon icon={faLinkedin} size="lg" /></Nav.Link>
                    <Nav.Link href={data.site.siteMetadata.twitter}><FontAwesomeIcon icon={faTwitter} size="lg" /></Nav.Link>
                    <Nav.Link href={data.site.siteMetadata.youtube}><FontAwesomeIcon icon={faYoutube} size="lg" /></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation;