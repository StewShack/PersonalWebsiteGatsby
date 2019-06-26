require("bootstrap/dist/css/bootstrap.min.css");

import React from "react"
import Navigation from "./navigation"
import MainStyle from "../styles/main.module.css"
import Container from 'react-bootstrap/Container';

const Layout = (props) => {
    return (
        <Container>
            <div className={MainStyle.headerImage}></div>
            <Navigation />
            <div className={MainStyle.content}>
                { props.children }
            </div>
        </Container>
    )
}

export default Layout