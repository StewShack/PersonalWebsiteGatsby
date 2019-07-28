import React from 'react';
import Layout from '../components/layout';
import Head from '../components/head';
import Styles from '../styles/mouse.module.css';

const MousePage = () => {
  return (
    <Layout activemenu="web">
      <Head title="Mouse Pointers" description="Example mouse pointer icons using CSS" />
      <h1>Mouse Pointers</h1>
      <p>
        Using CSS you can modify the mouse pointers that a user sees.
      </p>
      <div className="clearfix">
        <div className={Styles.mousePointers}>
          <div className="cursor: auto;">cursor: auto;</div>
          <div className={Styles.cursorcrosshair}>cursor: crosshair;</div>
          <div className={Styles.cursordefault}>cursor: default;</div>
          <div className={Styles.cursorpointer}>cursor: pointer;</div>
          <div className={Styles.cursormove}>cursor: move;</div>
          <div className={Styles.cursoreresize}>cursor: e-resize;</div>
          <div className={Styles.cursorneresize}>cursor: ne-resize;</div>
          <div className={Styles.cursornwresize}>cursor: nw-resize;</div>
          <div className={Styles.cursornresize}>cursor: n-resize;</div>
          <div className={Styles.cursorseresize}>cursor: se-resize;</div>
          <div className={Styles.cursorswresize}>cursor: sw-resize;</div>
          <div className={Styles.cursorsresize}>cursor: s-resize;</div>
          <div className={Styles.cursorwresize}>cursor: w-resize;</div>
          <div className={Styles.cursortext}>cursor: text;</div>
          <div className={Styles.cursorwait}>cursor: wait;</div>
          <div className={Styles.cursorhelp}>cursor: help;</div>
        </div>
      </div>
    </Layout>
  )
}

export default MousePage;