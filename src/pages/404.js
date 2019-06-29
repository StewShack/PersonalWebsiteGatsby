import React from "react"

import { Link } from "gatsby"

import Layout from "../components/layout"
import Head from "../components/head"

const NotFound = () => {
    return (
        <Layout>
        <Head title="Page not found" />
        <p>Page not found</p>
        <p><Link to="/">Home</Link></p>
        </Layout>
    )
}

export default NotFound