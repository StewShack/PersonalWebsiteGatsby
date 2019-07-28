import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserShield } from '@fortawesome/free-solid-svg-icons/faUserShield'

const Footer = () => {
  return (
    <div className="alert alert-dark text-right">
      <a href="/post/privacy"><FontAwesomeIcon icon={faUserShield} size="lg" /> Privacy Policy</a>
    </div>
  )
}

export default Footer