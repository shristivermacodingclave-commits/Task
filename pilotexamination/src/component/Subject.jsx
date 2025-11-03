import React from 'react'
import './Subject.css'
import { useState } from 'react';
import { subjects } from "../assets/Subject";
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

function Subject({ title, subtitle, showDescription = true, withSpacing = true}) {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const toggleModal = () => setShowRegister(!showRegister);
    return (
        <>
            <div className={`${withSpacing ? "container subject-section " : "container-fluid subject-section mt-0 pt-0"}`}>
               {title && showDescription &&  <h1 className='main-title'>{title}</h1>}
                {
                    showDescription && <p className="sub-title ">
                    {subtitle}
                </p>
                }
            <div className={`${withSpacing ? " container py-5 " : "container-fluid p-0"}`}>
                <div className="row">
                    {subjects.map((sub) => (
                        <div className="col-md-4 col-sm-6 mb-4" key={sub.id}>
                            <div
                                className="p-3"
                                style={{
                                    background: sub.color,
                                    borderRadius: "16px",
                                    border: "1px solid #E7E7E7",
                                }}
                            >
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <img
                                        src={sub.subject_image}
                                        alt={sub.subject_name}
                                        width="32"
                                        height="32"
                                    />
                                    <h5 className="m-0">{sub.subject_name}</h5>
                                </div>

                                <ul>
                                    {sub.topics.map((t, i) => (
                                        <li key={i}>{t}</li>
                                    ))}
                                </ul>

                                <p className="text-success mt-3 fw-bold">
                                    ⚡ Prices Starting at just ₹{sub.price}
                                </p>

                                <button className="btn btn-dark w-100 mb-2"
                                onClick={()=>setShowRegister(true)}>Enroll Now</button>
                                <button className="btn btn-link w-100"
                                  onClick={()=>setShowLogin(true)}>View Demo</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
             </div>
             <RegisterModal show={showRegister} handleClose={toggleModal}/>
             <LoginModal show={showLogin} handleClose={() => setShowLogin(false)}/>
        </>
    )
}

export default Subject




