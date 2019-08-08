import React from "react"
import Container from "react-bootstrap/Container"
import PropTypes from "prop-types"
import Footer from "./footer"
import Navigation from "./navigation"
import Styles from "../styles/main.module.css"
import "../styles/site.scss"

const Layout = props => (
  <Container>
    <div className={Styles.headerImage} />
    <Navigation activemenu={props.activemenu} />
    <div className={Styles.container}>
      {props.children}
      <Footer />
    </div>
  </Container>
)

Layout.propTypes = {
  activemenu: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
  activemenu: `Home`,
}

export default Layout
