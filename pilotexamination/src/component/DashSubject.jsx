
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const toggleModal = () => setShowRegister(!showRegister);

    const BASE_URL = 'http://development.pilotexaminations.com/';

   
   

    const goToPlans = (path) => navigate(path);

    // 🔹 Fetch subjects from API
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
            .catch(() => setError('Failed to load subjects'))
            .finally(() => setLoading(false));
    }, []);

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
                            // ✅ Map subject paths
                            const paths =
                                subjectPaths[subject.subject_name] || {
                                    enrollplanPath: "/plans",
                                    viewDetailPath: "/dashboard/my-courses",
                                };

                            // ✅ Prepare topics
                            const topics = subject.description
                                ? subject.description.split('/').map((t) => t.trim()).filter(Boolean)
                                : [];
                            const topicsToShow = topics.slice(0, 3);
                            const remainingCount = topics.length > 3 ? topics.length - 3 : 0;

                            return (
                                <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={subject.subject_id}>
                                    <div className="subject-card">
                                        {/* ===== Header ===== */}
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
                                                    subject.icon?.startsWith('http')
                                                        ? subject.icon
                                                        : BASE_URL + subject.icon
                                                }
                                                alt={subject.subject_name}
                                                className="subject-icon"
                                                onError={(e) => (e.target.style.display = 'none')}
                                                style={{ height: "50px", width: "50px" }}
                                            />
                                        </div>

                                        {/* ===== Topics ===== */}
                                        <div className="subject-topics">
                                            <div className="row mb-2">
                                                <div className="col-md-6">
                                                    <h6>Topic Covered</h6>
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
                                        {/* ===== Footer ===== */}
                                        <div className="text-center" style={{ padding: '1.25rem' }}>
                                            <p className="mt-3 fw-semibold" style={{ color: "#20ba5c" }}>
                                                ⚡ Prices Starting at just ₹{subject.starting_price || 0}
                                            </p>

                                            {/* ✅ Enroll Now (same as Demo path) */}
                                            <Button
                                                name="Enroll Now"
                                                className="btn-dark fs-6 form-control mb-2 subscribe-button"
                                                onClick={() => goToPlans(paths.enrollplanPath)}
                                            />

                                            {/* ✅ Take Demo MockTest (same path as Enroll) */}
                                            <button
                                                className="btn btn-link w-100 details-hover"
                                                onClick={() => goToPlans(paths.enrollplanPath)}
                                                style={{ color: 'black', fontWeight: '500' }}
                                            >
                                                Take Demo MockTest
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
