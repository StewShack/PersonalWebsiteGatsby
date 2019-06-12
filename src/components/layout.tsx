import React from "react"

import Header from "./header"
import Navigation from "./navigation"
import Footer from "./footer"
import MainStyle from "../styles/main.module.css"

const Layout = (props) => {
    return (
        <div id="Main">
            <Header />
            <Navigation />
            <div className={MainStyle.content}>
                { props.children }
                <Footer />
            </div>
        </div>
    )
}

export default Layout