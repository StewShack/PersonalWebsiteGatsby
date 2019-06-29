import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { faUserShield } from '@fortawesome/free-solid-svg-icons/faUserShield';

const Footer = () => {
    return (
        <div className="alert alert-dark text-right">
            <a href="/post/links"><FontAwesomeIcon icon={faLink} size="lg" /> Links</a>&nbsp;&nbsp;&nbsp; 
            <a href="/post/privacy"><FontAwesomeIcon icon={faUserShield} size="lg" /> Privacy Policy</a>
        </div>
    )
}

export default Footer