import React from 'react'
import { useState } from 'react';
import './Banner.css';
import CustomNavbar from './CustomNavbar';
import './CustomNavbar.css'
import RegisterModal from './RegisterModal';

function Banner() {
    const [showRegister, setShowRegister] = useState(false);
    const toggleModal = () => setShowRegister(!showRegister);
    return (
        <>
       
        <div className="banner-section pt-4 ">
            <CustomNavbar />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className=''>Crack DGCA <span>CPL,ATPL </span>Papers <br />
                            In Your Very First Attempt
                        </h1>
                        <p>Practice unlimited mock test to Ace your DGCA exam</p>
                        <br />
                        <button className='btn btn-warning btn-outline-warning login-btn1 enrolll animate__animated animate__fadeInUp'
                            onClick={()=>{setShowRegister(true)}}>
                            Enroll Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <RegisterModal show={showRegister} handleClose={toggleModal} />
        </>

        

    )
}

export default Banner;