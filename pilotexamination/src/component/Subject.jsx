// import React, { useEffect, useState } from 'react';
// import './Subject.css';
// import axios from 'axios';
// import RegisterModal from './RegisterModal';
// import LoginModal from './LoginModal';
// import Button from '../component/Button';
// import { useNavigate } from 'react-router-dom';
// import Loader from './Loader';

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
//             .post(`${BASE_URL}api/subjects`,{user_id:user_id})
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

    
//      if (loading) return <Loader message="Loading....." />;
//     if (error) return <p className="text-center text-danger py-5">{error}</p>;

//     return (
//         <>
//             <div className={`${withSpacing ? "container subject-section " : "container-fluid subject-section mt-0 pt-0"}`}>
//                 {title && showDescription && <h1 className='main-title'>{title}</h1>}
//                 {showDescription && <p className="sub-title">{subtitle}</p>}

//                 <div className={`${withSpacing ? " container py-5 " : "container-fluid p-0"}`}>
//                     <div className="row">
//                         {subjects.map((subject) => {
//                             // Split description into an array using "/"
//                             const topics = subject.description
//                                 ? subject.description.split('/').map(t => t.trim()).filter(Boolean)
//                                 : [];

//                             const totalTopics = topics.length;
//                             const topicsToShow = topics.slice(0, 3); // show first 3 topics
//                             const remainingCount = totalTopics > 3 ? totalTopics - 3 : 0;

//                             return (
//                                 <div className="col-md-4 mb-3" key={subject.subject_id}>
//                                     <div className="subject-card d-flex flex-column h-100">
                                        
//                                         {/* ===== Header ===== */}
//                                         <div
//                                             className="subject-header py-4"
//                                             style={{ backgroundColor: subject.title_color || '#f9f9f9' }}
//                                         >
//                                             <h4 className="subject-title" style={{fontSize: "1.5rem", fontWeight:"normal" , color:"black"}}>{subject.subject_name}</h4>
//                                             <img
//                                                 src={subject.icon}
//                                                 alt={subject.subject_name}
//                                                 className="subject-icon"
//                                                 onError={(e) => (e.target.style.display = 'none')}
//                                                 style={{height:"50px" , width:"50px"}}
//                                             />
//                                         </div>

//                                         {/* ===== Topics List ===== */}
//                                         <div className="subject-topics flex-grow-1">
//                                             <ul>
//                                                 {topicsToShow.map((topic, i) => (
//                                                     <li key={i}><h6 style={{fontWeight:"normal"}}>{topic}</h6></li>
//                                                 ))}
//                                                 {remainingCount > 0 && (
//                                                     <p className="text-muted">
//                                                         +{remainingCount} more topics...
//                                                     </p>
//                                                 )}
//                                             </ul>
//                                         </div>

//                                         <hr />

//                                         {/* ===== Footer ===== */}
//                                         <div className='text-center' style={{ padding: "0.5rem 1.5rem" }}>
//                                             <p className=" mt-3 fw-semibold" style={{color:"#20ba5c"}}>
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
//                                                View Demo
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




// import React, { useEffect, useState } from 'react';
// import './Subject.css';
// import axios from 'axios';
// import RegisterModal from './RegisterModal';
// import LoginModal from './LoginModal';
// import Button from '../component/Button';
// import { useNavigate } from 'react-router-dom';
// import Loader from './Loader';

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
//         // ---- GET USER ID FROM LOCAL STORAGE ----
//         const stored = localStorage.getItem("user");
//         let userId = null;

//         if (stored) {
//             try {
//                 const parsed = JSON.parse(stored);
//                 userId = parsed?.id || parsed?.user_id || parsed?.data?.id;
//             } catch {
//                 console.warn("Invalid user data in localStorage");
//             }
//         }

//         if (!userId) {
//             console.warn("User ID not found in localStorage");
//             setError("User not logged in");
//             setLoading(false);
//             return;
//         }

//         // ---- API CALL: POST METHOD ----
//         axios
//             .post(`${BASE_URL}api/subjects` ,{})
//             .then((response) => {
//                 console.log("Subjects API Response:", response.data);

//                 if (!response.data.error) {
//                    setSubjects(response.data.subjects || []);

//                 } else {
//                     setError("Error fetching subjects");
//                 }
//             })
//             .catch((err) => {
//                 console.error(err);
//                 setError("Failed to load subjects");
//             })
//             .finally(() => setLoading(false));

//     }, []);

//     if (loading) return <Loader message="Loading....." />;
//     if (error) return <p className="text-center text-danger py-5">{error}</p>;

//     return (
//         <>
//             <div className={`${withSpacing ? "container subject-section " : "container-fluid subject-section mt-0 pt-0"}`}>
//                 {title && showDescription && <h1 className='main-title'>{title}</h1>}
//                 {showDescription && <p className="sub-title">{subtitle}</p>}

//                 <div className={`${withSpacing ? " container py-5 " : "container-fluid p-0"}`}>
//                     <div className="row">

//                         {subjects.map((subject) => {
//                           const topics = Array.isArray(subject.topics) ? subject.topics : [];
//                             const topicsToShow = topics.slice(0, 3);
//                             const remainingCount = topics.length > 3 ? topics.length - 3 : 0;

//                             return (
//                                 <div className="col-md-4 mb-3" key={subject.subject_id}>
//                                     <div className="subject-card d-flex flex-column h-100">

//                                         {/* Header */}
//                                         <div
//                                             className="subject-header py-4"
//                                             style={{ backgroundColor: subject.title_color || '#f9f9f9' }}
//                                         >
//                                             <h4 className="subject-title" style={{fontSize: "1.5rem", fontWeight:"normal", color:"black"}}>
//                                                 {subject.subject_name}
//                                             </h4>

//                                             <img
//                                                 src={subject.icon}
//                                                 alt={subject.subject_name}
//                                                 onError={(e) => (e.target.style.display = 'none')}
//                                                 style={{ height:"50px", width:"50px" }}
//                                             />
//                                         </div>

//                                         {/* Topics */}
//                                         <div className="subject-topics flex-grow-1">
//                                             <ul>
//                                                 {topicsToShow.map((topic, index) => (
//                                                     <li key={index}><h6 style={{fontWeight:"normal"}}>{topic}</h6></li>
//                                                 ))}

//                                                 {remainingCount > 0 && (
//                                                     <p className="text-muted">
//                                                         +{remainingCount} more topics...
//                                                     </p>
//                                                 )}
//                                             </ul>
//                                         </div>

//                                         <hr />

//                                         {/* Footer */}
//                                         <div className='text-center mt-auto' style={{ padding: "0.5rem 1.5rem" }}>
//                                             <p className=" mt-3 fw-semibold" style={{color:"#20ba5c"}}>
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
//                                                View Demo
//                                             </button>
//                                         </div>

//                                     </div>
//                                 </div>
//                             );
//                         })}

//                     </div>
//                 </div>
//             </div>

//             {/* Modals */}
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
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

function Subject({ title, subtitle, showDescription = true, withSpacing = true }) {

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const toggleModal = () => setShowRegister(!showRegister);

    // ⭐ FIXED — USE HTTPS
    const BASE_URL = 'https://development.pilotexaminations.com/';

    useEffect(() => {
        
        setError(null); // clear errors

        // ⭐ SUBJECT API DOES NOT REQUIRE USER ID
        axios
            .post(`${BASE_URL}api/subjects`, {})
            .then((response) => {
                console.log("Subjects API Response:", response.data);

                if (!response.data.error) {
                    setSubjects(response.data.subjects || []);
                } else {
                    setError("Error fetching subjects");
                }
            })
            .catch((err) => {
                console.error("Subject API Error:", err);
                setError("Failed to load subjects");
            })
            .finally(() => setLoading(false));

    }, []);

    if (loading) return <Loader message="Loading....." />;
    if (error) return <p className="text-center text-danger py-5">{error}</p>;

    return (
        <>
            <div className={`${withSpacing ? "container subject-section" : "container-fluid subject-section mt-0 pt-0"}`}>
                
                {title && showDescription && <h1 className='main-title'>{title}</h1>}
                {showDescription && <p className="sub-title">{subtitle}</p>}

                <div className={`${withSpacing ? "container py-5" : "container-fluid p-0"}`}>
                    <div className="row">

                        {subjects.map((subject) => {
                            const topics = Array.isArray(subject.topics) ? subject.topics : [];
                            const topicsToShow = topics.slice(0, 3);
                            const remainingCount = topics.length > 3 ? topics.length - 3 : 0;

                            return (
                                <div className="col-md-4 mb-3" key={subject.subject_id}>
                                    <div className="subject-card d-flex flex-column h-100">

                                        {/* HEADER */}
                                        <div
                                            className="subject-header py-4"
                                            style={{ backgroundColor: subject.title_color || '#f9f9f9' }}
                                        >
                                            <h4 className="subject-title" style={{ fontSize: "1.5rem", fontWeight: "normal", color: "black" }}>
                                                {subject.subject_name}
                                            </h4>

                                            <img
                                                src={subject.icon}
                                                alt={subject.subject_name}
                                                onError={(e) => (e.target.style.display = 'none')}
                                                style={{ height: "50px", width: "50px" }}
                                            />
                                        </div>

                                        {/* TOPICS */}
                                        <div className="subject-topics flex-grow-1">
                                            <ul>
                                                {topicsToShow.map((topic, index) => (
                                                    <li key={index}>
                                                        <h6 style={{ fontWeight: "normal" }}>{topic}</h6>
                                                    </li>
                                                ))}

                                                {remainingCount > 0 && (
                                                    <p className="text-muted">+{remainingCount} more topics...</p>
                                                )}
                                            </ul>
                                        </div>

                                        <hr />

                                        {/* FOOTER */}
                                        <div className='text-center mt-auto' style={{ padding: "0.5rem 1.5rem" }}>
                                            <p className="mt-3 fw-semibold" style={{ color: "#20ba5c" }}>
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

            {/* MODALS */}
            <RegisterModal show={showRegister} handleClose={toggleModal} />
            <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
        </>
    );
}

export default Subject;
