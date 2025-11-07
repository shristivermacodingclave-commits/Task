import React from 'react'
import './Contact.css'
import headset from '../assets/images/headset.svg'
function Contact() {
    return (
        <div className="contact-section mt-5 mb-3 container mx-auto px-3 px-sm-4 px-md-5 px-lg-6 px-xl-8 px-xxl-10">
            <div className="row" >
                <div className="col-md-12 col-sm-12 contact-inner">
                    <span>Contact Details</span>
                    <div className="row">
                        <div className="col-md-4 col-sm-6">
                            <h2 className='mt-2'>Customer care
                                <br />
                                <a href="tel:+918447814070">
                                    +91-8447814070
                                </a>
                            </h2>
                        </div>
                        <div className="col-md-8 col-sm-8">
                            <h2 className="mt-2">
                                Email
                                <br />
                                <a href="mailto:pilotexaminations@gmail.com">
                                    pilotexaminations@gmail.com
                                </a>
                            </h2>

                        </div>

                    </div>
                    <p className='mt-4'>Note that customer line is available from Mon - Fri 9am -6pm only</p>
                    <img src={headset} />
                </div>
            </div>
        </div>

    )
}

export default Contact