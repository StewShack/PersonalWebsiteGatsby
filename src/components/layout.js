require("bootstrap/dist/css/bootstrap.min.css")

import React from "react"
import Navigation from "./navigation"
import Container from 'react-bootstrap/Container'
import Footer from "./footer"
import Styles from "../styles/main.module.css"

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

export default Layout