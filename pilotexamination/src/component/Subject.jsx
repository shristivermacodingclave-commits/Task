// import React from 'react'
// import './Subject.css'
// import { useState } from 'react';
// import { subjects } from "../assets/Subject";
// import RegisterModal from './RegisterModal';
// import LoginModal from './LoginModal';

// function Subject({ title, subtitle, showDescription = true, withSpacing = true}) {
//     const [showLogin, setShowLogin] = useState(false);
//     const [showRegister, setShowRegister] = useState(false);
//     const toggleModal = () => setShowRegister(!showRegister);
//     return (
//         <>
//             <div className={`${withSpacing ? "container subject-section " : "container-fluid subject-section mt-0 pt-0"}`}>
//                {title && showDescription &&  <h1 className='main-title'>{title}</h1>}
//                 {
//                     showDescription && <p className="sub-title ">
//                     {subtitle}
//                 </p>
//                 }
//             <div className={`${withSpacing ? " container py-5 " : "container-fluid p-0"}`}>
//                 <div className="row">
//                     {subjects.map((sub) => (
//                         <div className="col-md-4 col-sm-6 mb-4" key={sub.id}>
//                             <div
//                                 className="p-3"
//                                 style={{
//                                     background: sub.color,
//                                     borderRadius: "16px",
//                                     border: "1px solid #E7E7E7",
//                                 }}
//                             >
//                                 <div className="d-flex align-items-center gap-2 mb-3">
//                                     <img
//                                         src={sub.subject_image}
//                                         alt={sub.subject_name}
//                                         width="32"
//                                         height="32"
//                                     />
//                                     <h5 className="m-0">{sub.subject_name}</h5>
//                                 </div>

//                                 <ul>
//                                     {sub.topics.map((t, i) => (
//                                         <li key={i}>{t}</li>
//                                     ))}
//                                 </ul>

//                                 <p className="text-success mt-3 fw-bold">
//                                     ⚡ Prices Starting at just ₹{sub.price}
//                                 </p>

//                                 <button className="btn btn-dark w-100 mb-2"
//                                 onClick={()=>setShowRegister(true)}>Enroll Now</button>
//                                 <button className="btn btn-link w-100"
//                                   onClick={()=>setShowLogin(true)}>View Demo</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//              </div>
//              <RegisterModal show={showRegister} handleClose={toggleModal}/>
//              <LoginModal show={showLogin} handleClose={() => setShowLogin(false)}/>
//         </>
//     )
// }

// export default Subject


// import React from 'react'
// import './Subject.css'
// import { useState } from 'react';
// import { DashSubjects } from '../assets/DashSubjects';
// import RegisterModal from './RegisterModal';
// import LoginModal from './LoginModal';
// import Button from '../component/Button';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// function Subject({ title, subtitle, showDescription = true, withSpacing = true }) {
//     const [showLogin, setShowLogin] = useState(false);
//     const [showRegister, setShowRegister] = useState(false);
//     const toggleModal = () => setShowRegister(!showRegister);

//   const navigate = useNavigate();

//   const goToPlans = (path) => {
//     navigate(path); 
//   };

//     return (
//         <>
//             <div className={`${withSpacing ? "container subject-section " : "container-fluid subject-section mt-0 pt-0"}`}>
//                 {title && showDescription && <h1 className='main-title'>{title}</h1>}
//                 {
//                     showDescription && <p className="sub-title ">
//                         {subtitle}
//                     </p>
//                 }
//                 <div className={`${withSpacing ? " container py-5 " : "container-fluid p-0"}`}>
//                     <div className="row">
//                         {DashSubjects.map((subject) => (
//                             <div className="col-md-4 mb-3" key={subject.id}>
//                                 <div className="subject-card">
//                                     {/* Header */}
//                                     <div
//                                         className="subject-header py-4"
//                                         style={{ backgroundColor: subject.bg_color }}
//                                     >
//                                         <h4 className="subject-title">{subject.name}</h4>
//                                         <img
//                                             src={subject.icon}
//                                             alt={subject.name}
//                                             className="subject-icon"
//                                         />
//                                     </div>
//                                     {/* Topics */}
//                                     <div className="subject-topics">
                                       
//                                         <ul>
//                                             {subject.topics.map((topic, i) => (
//                                                 <li key={i}><h6>{topic}</h6></li>
//                                             ))}
//                                         </ul>
//                                     </div>

//                             <hr />
//                                 <div className='text-center' style={{padding:"1.25rem"}}>
//                                            <p className="text-success mt-3 fw-bold">
//                                     ⚡ Prices Starting at just ₹{subject.price}
//                                 </p>

//                                 <Button name="Enroll Now" className='btn-dark fs-6 form-control mb-2 subscribe-button'  onClick={()=>setShowRegister(true)}/>
//                                 <button className="btn btn-link w-100 details-hover"
//                                   onClick={()=>setShowLogin(true)} style={{color:"black" , fontWeight:"500"}}>Take Demo MockTest</button>
//                                 </div>
                                
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             <RegisterModal show={showRegister} handleClose={toggleModal} />
//             <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
//         </>
//     )
// }

// export default Subject








// import React, { useEffect, useState } from 'react';
// import './Subject.css';
// import axios from 'axios';
// import RegisterModal from './RegisterModal';
// import LoginModal from './LoginModal';
// import Button from '../component/Button';
// import { useNavigate } from 'react-router-dom';

// function Subject({ title, subtitle, showDescription = true, withSpacing = true }) {
//     const [showLogin, setShowLogin] = useState(false);
//     const [showRegister, setShowRegister] = useState(false);
//     const [subjects, setSubjects] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const navigate = useNavigate();
//     const toggleModal = () => setShowRegister(!showRegister);

//     const BASE_URL = 'http://development.pilotexaminations.com/';

//     useEffect(() => {
//         axios
//             .get(`${BASE_URL}api/subjects`)
//             .then((response) => {
//                 if (!response.data.error) {
//                     setSubjects(response.data.data);
//                 } else {
//                     setError('Error fetching subjects');
//                 }
//             })
//             .catch((err) => {
//                 console.error(err);
//                 setError('Failed to load subjects');
//             })
//             .finally(() => setLoading(false));
//     }, []);

//     if (loading) return <p className="text-center py-5">Loading subjects...</p>;
//     if (error) return <p className="text-center text-danger py-5">{error}</p>;

//     return (
//         <>
//             <div className={`${withSpacing ? "container subject-section " : "container-fluid subject-section mt-0 pt-0"}`}>
//                 {title && showDescription && <h1 className='main-title'>{title}</h1>}
//                 {showDescription && <p className="sub-title">{subtitle}</p>}

//                 <div className={`${withSpacing ? " container py-5 " : "container-fluid p-0"}`}>
//                     <div className="row">
//                         {subjects.map((subject) => {
//                             // Split description into topics array (using " / " as separator)
//                             const topics = subject.description
//                                 ? subject.description.split('/').map(t => t.trim()).filter(Boolean)
//                                 : [];

//                             // Show only first 3 topics
//                             const displayedTopics = topics.slice(0, 3);
//                             const hasMore = topics.length > 3;

//                             return (
//                                 <div className="col-md-4 mb-3" key={subject.subject_id}>
//                                     <div className="subject-card">
                                        
//                                         {/* ===== Header ===== */}
//                                         <div
//                                             className="subject-header py-4"
//                                             style={{ backgroundColor: subject.title_color || '#f9f9f9' }}
//                                         >
//                                             <h4 className="subject-title">{subject.subject_name}</h4>
//                                             <img
//                                                 src={subject.icon}
//                                                 alt={subject.subject_name}
//                                                 className="subject-icon"
//                                                 onError={(e) => (e.target.style.display = 'none')}
//                                             />
//                                         </div>

//                                         {/* ===== Topics List ===== */}
//                                         <div className="subject-topics">
//                                             <ul>
//                                                 {displayedTopics.map((topic, i) => (
//                                                     <li key={i}><h6>{topic}</h6></li>
//                                                 ))}
//                                                 {hasMore && <li className="text-muted">+ more topics...</li>}
//                                             </ul>
//                                         </div>

//                                         <hr />

//                                         {/* ===== Footer ===== */}
//                                         <div className='text-center' style={{ padding: "1.25rem" }}>
//                                             <p className="text-success mt-3 fw-bold">
//                                                 ⚡ Prices Starting at just ₹{subject.starting_price || 0}
//                                             </p>

//                                             <Button
//                                                 name="Enroll Now"
//                                                 className='btn-dark fs-6 form-control mb-2 subscribe-button'
//                                                 onClick={() => setShowRegister(true)}
//                                             />
                                            
//                                             <button
//                                                 className="btn btn-link w-100 details-hover"
//                                                 onClick={() => setShowLogin(true)}
//                                                 style={{ color: "black", fontWeight: "500" }}
//                                             >
//                                                 Take Demo MockTest
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>

//             {/* ===== Modals ===== */}
//             <RegisterModal show={showRegister} handleClose={toggleModal} />
//             <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
//         </>
//     );
// }

// export default Subject;



import React, { useEffect, useState } from 'react';
import './Subject.css';
import axios from 'axios';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import Button from '../component/Button';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

function Subject({ title, subtitle, showDescription = true, withSpacing = true }) {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const toggleModal = () => setShowRegister(!showRegister);

    const BASE_URL = 'http://development.pilotexaminations.com/';

    useEffect(() => {
        axios
            .get(`${BASE_URL}api/subjects`)
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

    if (loading) return <Loader message="Loading subjects..." />;
    if (error) return <p className="text-center text-danger py-5">{error}</p>;

    return (
        <>
            <div className={`${withSpacing ? "container subject-section " : "container-fluid subject-section mt-0 pt-0"}`}>
                {title && showDescription && <h1 className='main-title'>{title}</h1>}
                {showDescription && <p className="sub-title">{subtitle}</p>}

                <div className={`${withSpacing ? " container py-5 " : "container-fluid p-0"}`}>
                    <div className="row">
                        {subjects.map((subject) => {
                            // Split description into an array using "/"
                            const topics = subject.description
                                ? subject.description.split('/').map(t => t.trim()).filter(Boolean)
                                : [];

                            const totalTopics = topics.length;
                            const topicsToShow = topics.slice(0, 3); // show first 3 topics
                            const remainingCount = totalTopics > 3 ? totalTopics - 3 : 0;

                            return (
                                <div className="col-md-4 mb-3" key={subject.subject_id}>
                                    <div className="subject-card d-flex flex-column h-100">
                                        
                                        {/* ===== Header ===== */}
                                        <div
                                            className="subject-header py-4"
                                            style={{ backgroundColor: subject.title_color || '#f9f9f9' }}
                                        >
                                            <h4 className="subject-title" style={{fontSize: "1.5rem", fontWeight:"normal" , color:"black"}}>{subject.subject_name}</h4>
                                            <img
                                                src={subject.icon}
                                                alt={subject.subject_name}
                                                className="subject-icon"
                                                onError={(e) => (e.target.style.display = 'none')}
                                                style={{height:"50px" , width:"50px"}}
                                            />
                                        </div>

                                        {/* ===== Topics List ===== */}
                                        <div className="subject-topics flex-grow-1">
                                            <ul>
                                                {topicsToShow.map((topic, i) => (
                                                    <li key={i}><h6 style={{fontWeight:"normal"}}>{topic}</h6></li>
                                                ))}
                                                {remainingCount > 0 && (
                                                    <p className="text-muted">
                                                        +{remainingCount} more topics...
                                                    </p>
                                                )}
                                            </ul>
                                        </div>

                                        <hr />

                                        {/* ===== Footer ===== */}
                                        <div className='text-center' style={{ padding: "0.5rem 1.5rem" }}>
                                            <p className=" mt-3 fw-semibold" style={{color:"#20ba5c"}}>
                                                ⚡ Prices Starting at just ₹{subject.starting_price || 0}
                                            </p>

                                            <Button
                                                name="Enroll Now"
                                                className='btn-dark fs-6 form-control mb-2 subscribe-button'
                                                onClick={() => setShowRegister(true)}
                                            />

                                            <button
                                                className="btn btn-link w-100 details-hover"
                                                onClick={() => setShowLogin(true)}
                                                style={{ color: "black", fontWeight: "500" }}
                                            >
                                               View Demo
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ===== Modals ===== */}
            <RegisterModal show={showRegister} handleClose={toggleModal} />
            <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
        </>
    );
}

export default Subject;
