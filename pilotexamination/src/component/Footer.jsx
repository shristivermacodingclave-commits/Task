import React from 'react'
import './Footer.css'
import footerlogo from '../assets/images/footer-logo.svg'
import SubFooter from './SubFooter';
function Footer() {
    
    return (
        <>
            <footer className="pe-footer">
                <div className="container">
                    <div className="row gy-4 align-items-start">             
                        <div className="col-md-5 col-lg-5 col-sm-12">
                            <div className="d-flex align-items-start gap-3">
                                <img
                                    className="pe-logo"
                                    src={footerlogo}
                                    alt="PilotExaminations"
                                    width="150"
                                    height="auto"
                                />
                            </div>

                            <address className="pe-address mt-3 mb-0">
                                Property No. 1635, Gali No-4, Sheetal Nagar,
                                Rohtak, Tehsil & Distt-Rohtak,<br />
                                Haryana, 124001
                            </address>
                        </div>

                        {/* Useful Links */}
                        <div className="col-md-2 col-lg-2 col-sm-12">
                            <h6 className="pe-heading">Useful Links</h6>
                            <ul className="pe-list">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Notification</a></li>
                                <li><a href="#">Terms Of Service</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Refund Policy</a></li>
                            </ul>
                        </div>

                        {/* Social Media */}
                        <div className="col-md-2 col-lg-2 col-sm-12">
                            <h6 className="pe-heading">Social Media</h6>
                            <ul className="pe-list">
                                <li><a href="#">Facebook</a></li>
                                <li><a href="#">LinkedIn</a></li>
                                <li><a href="#">Instagram</a></li>
                                <li><a href="#">Twitter</a></li>
                                <li><a href="#">Youtube</a></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="col-md-3 col-sm-12 col-lg-3">
                            <h6 className="pe-heading">Contact Us</h6>
                            <ul className="pe-list pe-contact">
                                <li><a href="tel:+918447814070">+91-8447814070</a></li>
                                <li><a href="mailto:pilotexaminations@gmail.com">pilotexaminations@gmail.com</a></li>
                            </ul>
                        </div>
                    </div>

                    <hr className="pe-divider" />

                    <div className="row">
                        <div className="col-12">
                            <p className="pe-copy mb-2">
                                © {new Date().getFullYear()} PilotExaminations | All Rights Reserved
                            </p>
                            <p className="pe-disclaimer mb-0">
                                This content is Copyrighted by PilotExaminations. The use of any content is
                                subject to payment and compliance with PilotExaminations License
                                Agreement. Any non-compliance amounts to copyright infringement,
                                which is a very serious civil and criminal offence allowing court
                                to sentence you for the imprisonment up to 3 years.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        <SubFooter/>
           
        </>
    )
}

export default Footer