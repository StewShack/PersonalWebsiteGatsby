require("bootstrap/dist/css/bootstrap.min.css");

import React from "react"
import Navigation from "./navigation"
import Container from 'react-bootstrap/Container';
import Footer from "./footer"

const Layout = (props) => {
    return (
        <Container>
            <div className="headerImage"></div>
            <Navigation activemenu={props.activemenu} />
            <div className="content">
                { props.children }
                <Footer />
            </div>
        </Container>
    )
}

export default Layout