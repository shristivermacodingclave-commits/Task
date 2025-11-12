// import React from 'react'
// import { useState } from 'react';
// import { subjectCards } from "../assets/ComboData";
// import './ComboSubject.css'
// import LoginModal from './LoginModal';
// function ComboSubject({title , withSpacing = true}) {
//     const [showLogin, setShowLogin] = useState(false);
//     return (
//         <>
//         <div className={`${withSpacing ? "container mx-auto px-3 px-sm-4 px-md-5 px-lg-6 px-xl-8 px-xxl-10 combo-subject-section " : "container-fluid combo-subject-section mt-0 pt-0"}`}>
//             {title && <h1 className='fw-bold main-title '>{title}</h1>}
//             <div className="combo-subjects green-border mt-5">
//                 <div className="green-bg">
//                     <div className="row green-bg-text">
//                         <div className="col-md-9 col-sm-7">
//                             <h4>DGCA - Three Subject Combo</h4>
//                             <p>Consists of 3 subjects </p>
//                             <span>Combo</span>
//                         </div>
//                         <div className="col-md-3 col-sm-5 text-center">
//                             <h5>Prices Starting at
//                                 <br className="hide_mobile_br" />
//                                 ₹ 999
//                             </h5>
                            
//                                 <button className='btn btn-warning black-btn mt-2 form-control'
//                                 onClick={()=>setShowLogin(true)}>
//                                     Subscribe Now
//                                 </button>
//                         </div>
//                     </div>
//                 </div>
//                 {/* combosubject data */}
//                 <div className='row  inner-combo-section'>
//                     <div className="">
//                         <div className="row">
//                             {subjectCards.map((subject) => (
//                                 <div className="col-md-4 mb-3" key={subject.id}>
//                                     <div className="subject-card">
//                                         {/* Header */}
//                                         <div
//                                             className="subject-header"
//                                             style={{ backgroundColor: subject.bg_color }}
//                                         >
//                                             <h5 className="subject-title">{subject.name}</h5>
//                                             <img
//                                                 src={subject.icon}
//                                                 alt={subject.name}
//                                                 className="subject-icon"
//                                             />
//                                         </div>

//                                         {/* Topics */}
//                                         <ul className="subject-topics">
//                                             {subject.topics.map((topic, i) => (
//                                                 <li key={i}>{topic}</li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//             </div>

//         </div>
//         <LoginModal show={showLogin} handleClose={()=>{setShowLogin(false)}}/>
//         </>
//     )
// }

// export default ComboSubject





import React, { useEffect, useState } from 'react';
import './ComboSubject.css';
import axios from 'axios';
import LoginModal from './LoginModal';

function ComboSubject({ title, withSpacing = true }) {
    const [showLogin, setShowLogin] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASE_URL = 'http://development.pilotexaminations.com/';

    useEffect(() => {
        axios.get(`${BASE_URL}api/combo-subjects`)
            .then((response) => {
                if (!response.data.error) {
                    setSubjects(response.data.data);
                } else {
                    setError('Error fetching subjects');
                }
            })
            .catch((err) => {
                console.error(err);
                setError('Failed to load subjects');
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-center py-5">Loading combo subjects...</p>;
    if (error) return <p className="text-center text-danger py-5">{error}</p>;

    return (
        <>
            <div className={`${withSpacing ? "container mx-auto px-3 px-sm-4 px-md-5 px-lg-6 px-xl-8 px-xxl-10 combo-subject-section " : "container-fluid combo-subject-section mt-0 pt-0"}`}>
                {title && <h1 className='fw-bold main-title '>{title}</h1>}

                {/* ===== Combo Header Section ===== */}
                <div className="combo-subjects green-border mt-5">
                    <div className="green-bg">
                        <div className="row green-bg-text">
                            <div className="col-md-9 col-sm-7">
                                <h4>DGCA - Three Subject Combo</h4>
                                <p>Consists of 3 subjects</p>
                                <span>Combo</span>
                            </div>
                            <div className="col-md-3 col-sm-5 text-center">
                                <h5>
                                    Prices Starting at
                                    <br className="hide_mobile_br" />
                                    ₹ 999
                                </h5>

                                <button
                                    className='btn btn-warning black-btn mt-2 form-control'
                                    onClick={() => setShowLogin(true)}
                                >
                                    Subscribe Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ===== Subject Cards Section ===== */}
                    <div className='row inner-combo-section'>
                        <div className="row">
                            {subjects.map((subject) => {
                                const topics = subject.topics || [];
                                const topicsToShow = topics.slice(0, 5);
                                const remainingCount = topics.length > 5 ? topics.length - 5 : 0;

                                return (
                                    <div className="col-md-4 mb-3" key={subject.subject_id}>
                                        <div className="subject-card ">
                                            {/* ===== Header ===== */}
                                            <div
                                                className="subject-header"
                                                style={{ backgroundColor: subject.title_color || '#f9f9f9' }}
                                            >
                                                <h4 className="subject-title"  style={{fontSize:"1.5rem"}}>{subject.subject_name}</h4>
                                                <img
                                                    src={`${BASE_URL}${subject.icon}`}
                                                    alt={subject.subject_name}
                                                    className="subject-icon"
                                                    onError={(e) => (e.target.style.display = 'none')}
                                                    style={{height:"50px" ,  width:"50px"}}
                                                />
                                            </div>

                                            {/* ===== Topics List ===== */}
                                            <div className="subject-topics flex-grow-1">
                                            <ul className="subject-topics ">
                                                {topicsToShow.map((topic, i) => (
                                                    <li key={i}><h6 style={{fontWeight:"normal"}}>{topic}</h6></li>
                                                ))}
                                                {remainingCount > 0 && (
                                                    <p className="text-muted">+{remainingCount} more topics...</p>
                                                )}
                                            </ul>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== Modal ===== */}
            <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
        </>
    );
}

export default ComboSubject;
