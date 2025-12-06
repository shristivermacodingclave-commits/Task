
// import React, { useEffect, useState } from 'react';
// import './Subject.css';
// import RegisterModal from './RegisterModal';
// import LoginModal from './LoginModal';
// import Button from '../component/Button';
// import { useNavigate, Link } from 'react-router-dom';
// import { subjectPaths } from '../assets/subjectPaths';
// import axios from 'axios';
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

   
   

//     const goToPlans = (path) => navigate(path);

//     // 🔹 Fetch subjects from API
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
//             .catch(() => setError('Failed to load subjects'))
//             .finally(() => setLoading(false));
//     }, []);

//     if (loading) return <Loader message="Loading subjects..." />;
//     if (error) return <p className="text-center text-danger py-5">{error}</p>;

//     return (
//         <>
//             <div className={`${withSpacing ? 'container subject-section' : 'container-fluid subject-section mt-0 pt-0'}`}>
//                 {title && showDescription && <h1 className="main-title">{title}</h1>}
//                 {showDescription && <p className="sub-title ">{subtitle}</p>}

//                 <div className={`${withSpacing ? 'container py-5' : 'container-fluid p-0'}`}>
//                     <div className="row">
//                         {subjects.map((subject) => {
//                             // ✅ Map subject paths
//                             const paths =
//                                 subjectPaths[subject.subject_name] || {
//                                     enrollplanPath: "/plans",
//                                     viewDetailPath: "/dashboard/my-courses",
//                                 };

//                             // ✅ Prepare topics
//                             const topics = subject.description
//                                 ? subject.description.split('/').map((t) => t.trim()).filter(Boolean)
//                                 : [];
//                             const topicsToShow = topics.slice(0, 3);
//                             const remainingCount = topics.length > 3 ? topics.length - 3 : 0;

//                             return (
//                                 <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={subject.subject_id}>
//                                     <div className="subject-card">
//                                         {/* ===== Header ===== */}
//                                         <div
//                                             className="subject-header py-4"
//                                             style={{ backgroundColor: subject.title_color || '#f9f9f9' }}
//                                         >
//                                             <h4
//                                                 className="subject-title"
//                                                 style={{
//                                                     fontSize: "1.5rem",
//                                                     fontWeight: "normal",
//                                                     color: "black",
//                                                 }}
//                                             >
//                                                 {subject.subject_name}
//                                             </h4>
//                                             <img
//                                                 src={
//                                                     subject.icon?.startsWith('http')
//                                                         ? subject.icon
//                                                         : BASE_URL + subject.icon
//                                                 }
//                                                 alt={subject.subject_name}
//                                                 className="subject-icon"
//                                                 onError={(e) => (e.target.style.display = 'none')}
//                                                 style={{ height: "50px", width: "50px" }}
//                                             />
//                                         </div>

//                                         {/* ===== Topics ===== */}
//                                         <div className="subject-topics">
//                                             <div className="row mb-2">
//                                                 <div className="col-md-6">
//                                                     <h6>Topic Covered</h6>
//                                                 </div>
//                                                 <div className="col-md-6 text-end">
//                                                     <Link
//                                                         to={paths.viewDetailPath}
//                                                         style={{ color: 'black', fontWeight: 'bold' }}
//                                                         className="details-hover"
//                                                     >
//                                                         View Details
//                                                     </Link>
//                                                 </div>
//                                             </div>

//                                             <ul>
//                                                 {topicsToShow.map((topic, i) => (
//                                                     <li key={i}>
//                                                         <h6>{topic}</h6>
//                                                     </li>
//                                                 ))}
//                                                 {remainingCount > 0 && (
//                                                     <li className="text-muted">
//                                                         +{remainingCount} more topics...
//                                                     </li>
//                                                 )}
//                                             </ul>
//                                         </div>

//                                         <hr />
//                                         {/* ===== Footer ===== */}
//                                         <div className="text-center" style={{ padding: '1.25rem' }}>
//                                             <p className="mt-3 fw-semibold" style={{ color: "#20ba5c" }}>
//                                                 ⚡ Prices Starting at just ₹{subject.starting_price || 0}
//                                             </p>

//                                             {/* ✅ Enroll Now (same as Demo path) */}
//                                             <Button
//                                                 name="Enroll Now"
//                                                 className="btn-dark fs-6 form-control mb-2 subscribe-button"
//                                                 onClick={() => goToPlans(paths.enrollplanPath)}
//                                             />

//                                             {/* ✅ Take Demo MockTest (same path as Enroll) */}
//                                             <button
//                                                 className="btn btn-link w-100 details-hover"
//                                                 onClick={() => goToPlans(paths.viewDetailPath)}
//                                                 style={{ color: 'black', fontWeight: '500' }}
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



// import React, { useEffect, useState } from 'react';
// import './Subject.css';
// import RegisterModal from './RegisterModal';
// import LoginModal from './LoginModal';
// import Button from '../component/Button';
// import { useNavigate, Link } from 'react-router-dom';
// import { subjectPaths } from '../assets/subjectPaths';
// import axios from 'axios';
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

//     const goToPlans = (path) => navigate(path);

//     // 🔹 Fetch subjects using POST + user_id
//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         let userId = null;

//         if (storedUser) {
//             try {
//                 const parsedUser = JSON.parse(storedUser);
//                 userId = parsedUser?.id || parsedUser?.user_id || parsedUser?.data?.id;
//             } catch {
//                 console.warn("Invalid user data in localStorage");
//             }
//         }

//         if (!userId) {
//             console.error("No user id found");
//             setLoading(false);
//             return;
//         }

//         axios
//             .post(`${BASE_URL}api/subjects`, { user_id: userId })
//             .then((response) => {
//                 console.log("Subjects API:", response.data);

//                 if (!response.data.error) {
//                     setSubjects(response.data.subjects || []);
//                 } else {
//                     setError('Error fetching subjects');
//                 }
//             })
//             .catch(() => setError('Failed to load subjects'))
//             .finally(() => setLoading(false));
//     }, []);

//     if (loading) return <Loader message="Loading subjects..." />;
//     if (error) return <p className="text-center text-danger py-5">{error}</p>;

//     return (
//         <>
//             <div className={`${withSpacing ? 'container subject-section' : 'container-fluid subject-section mt-0 pt-0'}`}>
//                 {title && showDescription && <h1 className="main-title">{title}</h1>}
//                 {showDescription && <p className="sub-title ">{subtitle}</p>}

//                 <div className={`${withSpacing ? 'container py-5' : 'container-fluid p-0'}`}>
//                     <div className="row">
//                         {subjects.map((subject) => {
//                             // Subject paths mapping
//                             const paths =
//                                 subjectPaths[subject.subject_name] || {
//                                     enrollplanPath: "/plans",
//                                     viewDetailPath: "/dashboard/my-courses",
//                                 };

//                             // TOPICS — using new API
//                             const topics = Array.isArray(subject.topics) ? subject.topics : [];
//                             const topicsToShow = topics.slice(0, 3);
//                             const remainingCount = topics.length > 3 ? topics.length - 3 : 0;

//                             return (
//                                 <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={subject.subject_id}>
//                                     <div className="subject-card">

//                                         {/* Header */}
//                                         <div
//                                             className="subject-header py-4"
//                                             style={{ backgroundColor: subject.title_color || '#f9f9f9' }}
//                                         >
//                                             <h4
//                                                 className="subject-title"
//                                                 style={{
//                                                     fontSize: "1.5rem",
//                                                     fontWeight: "normal",
//                                                     color: "black",
//                                                 }}
//                                             >
//                                                 {subject.subject_name}
//                                             </h4>

//                                             <img
//                                                 src={
//                                                     subject.icon?.startsWith("http")
//                                                         ? subject.icon
//                                                         : BASE_URL + subject.icon
//                                                 }
//                                                 alt={subject.subject_name}
//                                                 className="subject-icon"
//                                                 onError={(e) => (e.target.style.display = "none")}
//                                                 style={{ height: "50px", width: "50px" }}
//                                             />
//                                         </div>

//                                         {/* Topics */}
//                                         <div className="subject-topics">
//                                             <div className="row mb-2">
//                                                 <div className="col-md-6">
//                                                     <h6>Topic Covered</h6>
//                                                 </div>
//                                                 <div className="col-md-6 text-end">
//                                                     <Link
//                                                         to={paths.viewDetailPath}
//                                                         style={{ color: 'black', fontWeight: 'bold' }}
//                                                         className="details-hover"
//                                                     >
//                                                         View Details
//                                                     </Link>
//                                                 </div>
//                                             </div>

//                                             <ul>
//                                                 {topicsToShow.map((topic, i) => (
//                                                     <li key={i}>
//                                                         <h6>{topic}</h6>
//                                                     </li>
//                                                 ))}

//                                                 {remainingCount > 0 && (
//                                                     <li className="text-muted">
//                                                         +{remainingCount} more topics...
//                                                     </li>
//                                                 )}
//                                             </ul>
//                                         </div>

//                                         <hr />

//                                         {/* Footer */}
//                                         <div className="text-center" style={{ padding: "1.25rem" }}>
//                                             <p className="mt-3 fw-semibold" style={{ color: "#20ba5c" }}>
//                                                 ⚡ Prices Starting at just ₹{subject.starting_price || 0}
//                                             </p>

//                                             {/* Enroll */}
//                                             <Button
//                                                 name="Enroll Now"
//                                                 className="btn-dark fs-6 form-control mb-2 subscribe-button"
//                                                 onClick={() => goToPlans(paths.enrollplanPath)}
//                                             />

//                                             {/* Demo */}
//                                             <button
//                                                 className="btn btn-link w-100 details-hover"
//                                                 onClick={() => goToPlans(paths.viewDetailPath)}
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

//             {/* Modals */}
//             <RegisterModal show={showRegister} handleClose={toggleModal} />
//             <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
//         </>
//     );
// }

// export default Subject;






import React, { useEffect, useState } from 'react';
import './Subject.css';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import Button from '../component/Button';
import { useNavigate, Link } from 'react-router-dom';
import { subjectPaths } from '../assets/subjectPaths';
import axios from 'axios';
import Loader from './Loader';

function Subject({ title, subtitle, showDescription = true, withSpacing = true }) {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [purchasedSubjects, setPurchasedSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const toggleModal = () => setShowRegister(!showRegister);

    const BASE_URL = 'http://development.pilotexaminations.com/';

    const goToPlans = (path) => navigate(path);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        let userId = null;

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                userId = parsedUser?.id || parsedUser?.user_id || parsedUser?.data?.id;
            } catch {
                console.warn("Invalid user data in localStorage");
            }
        }

        if (!userId) {
            console.error("No user id found");
            setLoading(false);
            return;
        }

        // 🟢 API 1 — Fetch Purchased Subjects
        const purchasedReq = axios.post(`${BASE_URL}api/mock/check-access`, {
            user_id: userId,
        });

        // 🟢 API 2 — Fetch All Subjects
        const subjectsReq = axios.post(`${BASE_URL}api/subjects`, {
            user_id: userId,
        });

        Promise.all([purchasedReq, subjectsReq])
            .then(([purchasedRes, subjectRes]) => {
                if (!purchasedRes.data.error) {
                    setPurchasedSubjects(purchasedRes.data.subjects || []);
                }

                if (!subjectRes.data.error) {
                    setSubjects(subjectRes.data.subjects || subjectRes.data.data || []);
                }
            })
            .catch(() => setError("Failed to load subjects"))
            .finally(() => setLoading(false));
    }, []);

    const isPurchased = (subjectId) => {
        return purchasedSubjects.some((p) => p.subject_id === subjectId);
    };

    if (loading) return <Loader message="Loading subjects..." />;
    if (error) return <p className="text-center text-danger py-5">{error}</p>;

    return (
        <>
            <div className={`${withSpacing ? 'container subject-section' : 'container-fluid subject-section mt-0 pt-0'}`}>
                {title && showDescription && <h1 className="main-title">{title}</h1>}
                {showDescription && <p className="sub-title ">{subtitle}</p>}

                <div className={`${withSpacing ? 'container py-5' : 'container-fluid p-0'}`}>
                    <div className="row">
                        {subjects.map((subject) => {
                            
                            const paths =
                                subjectPaths[subject.subject_name] || {
                                    enrollplanPath: "/plans",
                                    viewDetailPath: "/dashboard/my-courses",
                                };

                            const topics = Array.isArray(subject.topics) ? subject.topics : [];
                            const topicsToShow = topics.slice(0, 3);
                            const remainingCount = topics.length > 3 ? topics.length - 3 : 0;

                            const purchased = isPurchased(subject.subject_id);

                            return (
                                <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={subject.subject_id}>
                                    <div className="subject-card">

                                        {/* Header */}
                                        <div
                                            className="subject-header py-4"
                                            style={{ backgroundColor: subject.title_color || '#f9f9f9' }}
                                        >
                                            <h4
                                                className="subject-title"
                                                style={{
                                                    fontSize: "1.5rem",
                                                    fontWeight: "normal",
                                                    color: "black",
                                                }}
                                            >
                                                {subject.subject_name}
                                            </h4>

                                            <img
                                                src={
                                                    subject.icon?.startsWith("http")
                                                        ? subject.icon
                                                        : BASE_URL + subject.icon
                                                }
                                                alt={subject.subject_name}
                                                className="subject-icon"
                                                onError={(e) => (e.target.style.display = "none")}
                                                style={{ height: "50px", width: "50px" }}
                                            />
                                        </div>

                                        {/* Topics */}
                                        <div className="subject-topics">
                                            <div className="row mb-2">
                                                <div className="col-md-6">
                                                    <h6>Topics Covered</h6>
                                                </div>
                                                <div className="col-md-6 text-end">
                                                    <Link
                                                        to={paths.viewDetailPath}
                                                        style={{ color: 'black', fontWeight: 'bold' }}
                                                        className="details-hover"
                                                    >
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>

                                            <ul>
                                                {topicsToShow.map((topic, i) => (
                                                    <li key={i}>
                                                        <h6>{topic}</h6>
                                                    </li>
                                                ))}

                                                {remainingCount > 0 && (
                                                    <li className="text-muted">
                                                        +{remainingCount} more topics...
                                                    </li>
                                                )}
                                            </ul>
                                        </div>

                                        <hr />

                                        {/* Footer — Conditional Buttons */}
                                        <div className="text-center" style={{ padding: "1.25rem" }}>

                                            {!purchased && (
                                                <p className="mt-3 fw-semibold" style={{ color: "#20ba5c" }}>
                                                    ⚡ Prices Starting at just ₹{subject.starting_price || 0}
                                                </p>
                                            )}

                                            {purchased ? (
                                                <>
                                                    <Button
                                                        name="View / Attempt Test"
                                                        className="btn-dark fs-6 form-control mb-2 subscribe-button"
                                                        onClick={() => goToPlans(paths.viewDetailPath)}
                                                    />

                                                    <button
                                                        className="btn btn-link w-100 details-hover"
                                                        style={{ color: "black", fontWeight: "500" }}
                                                         onClick={() => goToPlans(paths.enrollplanPath)}
                                                    >
                                                        Extend Subscription
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button
                                                        name="Enroll Now"
                                                        className="btn-dark fs-6 form-control mb-2 subscribe-button"
                                                        onClick={() => goToPlans(paths.enrollplanPath)}
                                                    />

                                                    <button
                                                        className="btn btn-link w-100 details-hover"
                                                        onClick={() => goToPlans(paths.viewDetailPath)}
                                                        style={{ color: "black", fontWeight: "500" }}
                                                    >
                                                        Take Demo MockTest
                                                    </button>
                                                </>
                                            )}

                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <RegisterModal show={showRegister} handleClose={toggleModal} />
            <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
        </>
    );
}

export default Subject;
