require("bootstrap/dist/css/bootstrap.min.css")

import React from "react"
import Navigation from "./navigation"
import Container from 'react-bootstrap/Container'
import Footer from "./footer"
import Styles from "../styles/main.module.css"
import PropTypes from 'prop-types';

const Layout = (props) => {
    return (
        <Container>
            <div className={Styles.headerImage}></div>
            <Navigation activemenu={props.activemenu} />
            <div className={Styles.content}>
                { props.children }
                <Footer />
            </div>
        </Container>
    )
}

Layout.propTypes = {
  activemenu: PropTypes.string,
  children: PropTypes.any
};

export default Layout