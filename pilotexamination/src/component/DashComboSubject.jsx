import React from 'react'
import { useState } from 'react';
import { subjectCards } from "../assets/ComboData";
import './ComboSubject.css'
import LoginModal from './LoginModal';
function ComboSubject({title , withSpacing = true}) {
    const [showLogin, setShowLogin] = useState(false);
    return (
        <>
        <div className={`${withSpacing ? "container combo-subject-section " : "container-fluid combo-subject-section mt-0 pt-0"}`}>
            {title && <h1 className='fw-bold main-title '>{title}</h1>}
            <div className="combo-subjects green-border mt-5">
                <div className="green-bg">
                    <div className="row green-bg-text">
                        <div className="col-md-9 col-sm-7">
                            <h4>DGCA - Three Subject Combo</h4>
                            <p>Consists of 3 subjects </p>
                            <span>Combo</span>
                        </div>
                        <div className="col-md-3 col-sm-5 text-center">
                            <h5>Prices Starting at
                                <br className="hide_mobile_br" />
                                ₹ 999
                            </h5>
                            
                                <button className='btn btn-warning black-btn mt-2 form-control'
                                onClick={()=>setShowLogin(true)}>
                                    Subscribe Now
                                </button>
                        </div>
                    </div>
                </div>
                {/* combosubject data */}
                <div className='row inner-combo-section'>
                    <div className="">
                        <div className="row">
                            {subjectCards.map((subject) => (
                                <div className="col-md-6 mb-3" key={subject.id}>
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
                                             <div className="col-md-6 text-end "><a href="#" style={{color:"black" , fontWeight:"bold"}} className='details-hover'>View Details</a></div>
                                            </div>
                                            <ul>
                                                {subject.topics.map((topic, i) => (
                                                <li key={i}><h6>{topic}</h6></li>
                                            ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <LoginModal show={showLogin} handleClose={()=>{setShowLogin(false)}}/>
        </>
    )
}

export default ComboSubject