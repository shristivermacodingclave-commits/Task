import React from 'react'
import './Subject.css'
import { useState } from 'react';
import { DashSubjects } from '../assets/DashSubjects';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import Button from '../component/Button';

function Subject({ title, subtitle, showDescription = true, withSpacing = true }) {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const toggleModal = () => setShowRegister(!showRegister);
    return (
        <>
            <div className={`${withSpacing ? "container subject-section " : "container-fluid subject-section mt-0 pt-0"}`}>
                {title && showDescription && <h1 className='main-title'>{title}</h1>}
                {
                    showDescription && <p className="sub-title ">
                        {subtitle}
                    </p>
                }
                <div className={`${withSpacing ? " container py-5 " : "container-fluid p-0"}`}>
                    <div className="row">
                        {DashSubjects.map((subject) => (
                            <div className="col-md-4 mb-3" key={subject.id}>
                                <div className="subject-card">
                                    {/* Header */}
                                    <div
                                        className="subject-header py-4"
                                        style={{ backgroundColor: subject.bg_color }}
                                    >
                                        <h4 lassName="subject-title">{subject.name}</h4>
                                        <img
                                            src={subject.icon}
                                            alt={subject.name}
                                            className="subject-icon"
                                        />
                                    </div>
                                    {/* Topics */}
                                    <div className="subject-topics">
                                        <div className="row mb-2" >
                                            <div className="col-md-6"><h6>Topic Covered</h6></div>
                                            <div className="col-md-6 text-end"><a href="#" style={{ color: "black", fontWeight: "bold" }} className='details-hover'>View Details</a></div>
                                        </div>
                                        <ul>
                                            {subject.topics.map((topic, i) => (
                                                <li key={i}><h6>{topic}</h6></li>
                                            ))}
                                        </ul>
                                    </div>

                            <hr />
                                <div className='text-center' style={{padding:"1.25rem"}}>
                                           <p className="text-success mt-3 fw-bold">
                                    ⚡ Prices Starting at just ₹{subject.price}
                                </p>

                                <Button name="Enroll Now" className='btn-dark fs-6 form-control mb-2 subscribe-button' />
                                <button className="btn btn-link w-100 details-hover"
                                  onClick={()=>setShowLogin(true)} style={{color:"black" , fontWeight:"500"}}>Take Demo MockTest</button>
                                </div>
                                
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <RegisterModal show={showRegister} handleClose={toggleModal} />
            <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
        </>
    )
}

export default Subject




