// import React, { useMemo, useState } from "react";
// import './AtgPlan.css'
// import Button from '../Button'
// import lock from '../../assets/images/lock.svg'
// import lockpad from '../../assets/images/lock-pad.svg'
// import ATGlogo from '../../assets/images/ATGLogo.png'
// import NegLogo from '../../assets/images/AirNeg.svg'

// const COURSE = {
//     title: "Air Navigation",
//     description:
//         "Air navigation is navigation while flying. It is used by pilots in aircraft to know their exact position and find their way. That is important because if they get lost, they can hit a mountain or fly into a dangerous area or not find a place to land.",
//     stats: [
//         { label: "Topics Covered", value: 59 },
//         { label: "Questions", value: 3692 },
//         { label: "Happy Students", value: 6 },
//     ],
//     tabs: [
//         "Principles Of Flight (POF)",
//         "Aircraft Airframes and Systems",
//         "Electrics and Electronics",
//         "PowerPlant",
//         "Important Questions",
//     ],
//     topics: new Array(10).fill(null).map((_, i) => ({
//         id: i + 1,
//         title: i === 0 ? "Basic" : `Topic ${i + 1}`,
//     })),
// };

// export default function NavigationPlan() {
//     const [activeTab, setActiveTab] = useState(0);
//     const tabItems = useMemo(() => COURSE.tabs, []);

//     return (
//         <div className="bg-light min-vh-100 mt-3">
//             {/* HERO CARD */}

//             <div className="container-fluid pb-3">
//                 <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
//                     {/* === Top Row === */}
//                     <div className="py-4" style={{ backgroundColor: "#fff7f0" }}>
//                         <div className="container-fluid">
//                             <div className="row align-items-center">
//                                 {/* Left Column (Logo) */}
//                                 <div className="col-md-2 d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
//                                     <img
//                                         src={NegLogo}
//                                         alt="ATGlogo"
//                                         style={{ height: "100px", width: "200px", objectFit: "contain" }}
//                                     />
//                                 </div>

//                                 {/* Right Column (Title + Description) */}
//                                 <div className="col-md-10">
//                                     <h1 className="h2 mb-2 fw-semibold">{COURSE.title}</h1>
//                                     <p className="mb-0 text-dark">{COURSE.description}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* === Bottom Row === */}
//                     <div className="py-4" style={{ backgroundColor: "#fff3e7", minHeight: "130px" }}>
//                         <div className="container-fluid">
//                             <div className="row align-items-center">
//                                 {/* Left Column (Empty) */}
//                                 <div className="col-md-1"></div>

//                                 {/* Right Column (Stats + Button) */}
//                                 <div className="col-md-11 border-red ">
//                                     <div className="row  align-items-center">
//                                         {/* Stats Section */}
//                                         <div className="col-12 col-md-8">
//                                             <div className="row row-cols-3 text-center m-0">
//                                                 {COURSE.stats.map((s, i) => (
//                                                     <div key={i} className="col">
//                                                         <div className="fs-6 fw-semibold lh-1 py-2">{s.value}</div>
//                                                         <div className="small fs-6 ">{s.label}</div>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>

//                                         {/* Enroll Button */}
//                                         <div className="col-12 col-md-4 text-md-center mt-3 mt-md-0 ">
//                                             <Button name="Enroll now" className="btn-dark w-100 " />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>


//             {/* Tabs with separators */}
//             <div className="container-fluid">
//                 <div className="border-bottom pb-3 d-flex flex-wrap align-items-center">
//                     {tabItems.map((t, i) => (
//                         <div key={t} className="d-flex align-items-center me-2">
//                             <button
//                                 type="button"
//                                 onClick={() => setActiveTab(i)}
//                                 className={`btn btn-link px-0 text-decoration-none ${i === activeTab ? "fw-semibold text-dark" : "text-dark"
//                                     }`}
//                             >
//                                 {t}
//                             </button>
//                             {i < tabItems.length - 1 && (
//                                 <span className="mx-2 text-secondary">|</span>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Topics header */}
//             <div className="container-fluid pt-4">
//                 <div className="h6 text-secondary mb-3">Topics (10)</div>
//             </div>

//             {/* Topics list (cards) */}
//             <div className="container-fluid">
//                 <div className="d-flex flex-column gap-3">
//                     {COURSE.topics.map((topic) => {
//                         const isFree = topic.id === 1;
//                         return (
//                             <div
//                                 key={topic.id}
//                                 className="rounded-2 "
//                                 style={{
//                                     background: "#ffffff",
//                                     border: "none",
//                                 }}
//                             >
//                                 <div
//                                     className="px-4 d-flex align-items-center justify-content-between atg-plans-card"
//                                     style={{
//                                         minHeight: 100, // a little taller
//                                         paddingTop: 12,
//                                         paddingBottom: 12,
//                                     }}
//                                 >
//                                     <div className="d-flex align-items-center gap-3">
//                                         <div
//                                             className="rounded-circle"
//                                             style={{
//                                                 width: 36,
//                                                 height: 36,
//                                                 background: "#fff3cd",
//                                                 color: "#856404",
//                                                 fontWeight: 600,
//                                                 display: "grid",
//                                                 placeItems: "center",
//                                             }}
//                                         >
//                                             {topic.id}
//                                         </div>
//                                         <div className="fs-5">{topic.title}</div>
//                                     </div>

//                                     {isFree ? (
//                                         <button className="btn btn-outline-dark rounded-3 px-4 py-2">
//                                             Attempt For Free
//                                         </button>
//                                     ) : (
//                                         <span className="fs-4" aria-hidden="true" title="Locked">
//                                             <img src={lock} alt="lock" />
//                                         </span>
//                                     )}
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>

//             <div className="container-fluid my-5">

//                 <div className="card border-0 mb-4 atg-plans-card">
//                     <div className="card-body d-flex flex-column justify-content-center align-items-center text-center py-4">
//                         <p className="mb-4">
//                             Practice Test for <b>Principles Of Flight (POF)</b>
//                         </p>
//                         <img src={lock} alt="lock" />
//                     </div>
//                 </div>


//                 {/* Heading */}
//                 <h5 className="fw-semibold mb-3">
//                     Unlimited Access to Aircraft Technical General (ATG) Mock Tests
//                 </h5>

//                 {/* Blue plan card */}
//                 <div
//                     className="rounded-4 overflow-hidden shadow-sm py-3"
//                     style={{ background: "#bcd6ff" }}
//                 >
//                     {/* plan row */}
//                     <div className="d-flex align-items-center justify-content-between px-3 px-md-4 py-3">
//                         <div className="d-flex align-items-center gap-3">
//                             <div
//                                 className="d-flex align-items-center justify-content-center rounded-circle bg-white"
//                                 style={{ width: 44, height: 44 }}
//                             >
//                                 <img src={lockpad} alt="lockpad" />
//                             </div>
//                             <div>
//                                 <div className="fw-semibold">
//                                     Aircraft Technical General (ATG) - Full Syllabus Mocktest
//                                 </div>
//                                 <div className="small text-dark">
//                                     Every topic is included, following the DGCA&apos;s prescribed
//                                     format.
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="fs-5" aria-hidden="true">

//                             <img src={lock} alt="lock" />
//                         </div>
//                     </div>

//                     {/* price strip — right half & right-aligned */}

//                 </div>

//                 <div
//                     className="px-3 px-md-4 py-4"

//                 >

//                     {/* my code for bottom div */}

//                     <div className="row">
//                         <div className="col-sm-6"></div>
//                         <div className="col-sm-6 d-flex">
//                             <div className="text">
//                                 <h3 className=" fs-2">₹ 1083 / month</h3>
//                                 <p style={{ fontSize: "0.7rem" }}>When subscribed for 12 months plan</p>
//                             </div>
//                             <div className="ms-5">
//                                 <button className="btn rounded-pill px-4 fw-semibold" style={{ backgroundColor: "#d2f4c7", color: "#30904c" }}>Save Extra 50%</button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* enroll button */}
//                     <div className="row mt-3">
//                         <div className="col-sm-6"></div>
//                         <div className="col-sm-6">
//                             <Button name="Enroll now" className="btn-dark w-100 fs-6 " />
//                             <p className="text-center mt-3  fw-bold" style={{ fontSize: "0.8rem" }}> <span className="me-2" aria-hidden="true">⚡</span>Early Bird Discount for Limited Period Only</p>
//                         </div>
//                     </div>

//                 </div>

//             </div>
//             {/* ===== End Screenshot Section ===== */}
//         </div>
//     );
// }




import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AtgPlan.css";
import Button from "../Button";
import lock from "../../assets/images/lock.svg";
import lockpad from "../../assets/images/lock-pad.svg";
import axios from "axios";
import Loader from "../Loader";

export default function AtgPlan() {
    const [subject, setSubject] = useState(null);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();

    // ✅ Fetch API data for Navigation subject
    useEffect(() => {
        axios
            .get("https://development.pilotexaminations.com/api/subject/33")
            .then((res) => {
                if (!res.data.error) {
                    setSubject(res.data.subject);
                    setTopics(res.data.topics || []);
                } else {
                    setError("Error fetching subject data");
                }
            })
            .catch(() => setError("Failed to fetch data"))
            .finally(() => setLoading(false));
    }, []);

    const tabItems = useMemo(
        () => [
            "Principles Of Flight (POF)",
            "Aircraft Airframes and Systems",
            "Electrics and Electronics",
            "PowerPlant",
            "Important Questions",
        ],
        []
    );

    if (loading)
        return <Loader message="Loading subject details..." />;
    if (error)
        return (
            <p className="text-center text-danger py-5">
                {error || "Something went wrong"}
            </p>
        );

    const handleAttemptForFree = (topicName, topicId) => {
        if (!subject) return;
        const planIdentifier =
            subject.subject_id ??
            subject.subject_name?.toLowerCase().replace(/\s+/g, "-") ??
            "plan";
        navigate(`/dashboard/my-courses/e-test/${planIdentifier}`, {
            state: {
                subject: subject.subject_name,
                topic: topicName,
                topicId,
                subjectId: subject.subject_id,
                testType: "E-Test",
                planPath: "/dashboard/my-courses/atg-plans",
            },
        });
    };

    return (
        <div className="bg-light min-vh-100 mt-3">
            {/* HERO CARD */}
            <div className="container-fluid pb-3">
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    {/* === Top Row === */}
                    <div
                        className="py-4"
                        style={{ backgroundColor: subject.title_color || "#fff7f0" }}
                    >
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                {/* Left Column (Logo) */}
                                <div className="col-md-2 d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
                                    <img
                                        src={
                                            subject.subject_image?.startsWith("http")
                                                ? subject.subject_image
                                                : `https://development.pilotexaminations.com/${subject.icon}`
                                        }
                                        alt={subject.subject_name}
                                        style={{
                                            height: "100px",
                                            width: "200px",
                                            objectFit: "contain",
                                        }}
                                    />
                                </div>

                                {/* Right Column (Title + Description) */}
                                <div className="col-md-10">
                                    <h1 className="h2 mb-2 fw-semibold">
                                        {subject.subject_name}
                                    </h1>
                                    <p className="mb-0 text-dark">{subject.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* === Bottom Row === */}
                    <div
                        className="py-4"
                        style={{
                            backgroundColor: subject.body_color || "#fff3e7",
                            minHeight: "130px",
                        }}
                    >
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                <div className="col-md-1"></div>
                                <div className="col-md-11 border-red">
                                    <div className="row align-items-center">
                                        {/* Stats Section */}
                                        <div className="col-12 col-md-8">
                                            <div className="row row-cols-3 text-center m-0">
                                                <div className="col">
                                                    <div className="fs-6 fw-semibold lh-1 py-2">
                                                        {topics.length}
                                                    </div>
                                                    <div className="small fs-6">Topics Covered</div>
                                                </div>
                                                <div className="col">
                                                    <div className="fs-6 fw-semibold lh-1 py-2">{subject.total_questions}</div>
                                                    <div className="small fs-6">Questions</div>
                                                </div>
                                                <div className="col">
                                                    <div className="fs-6 fw-semibold lh-1 py-2">{subject.happy_students}</div>
                                                    <div className="small fs-6">Happy Students</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Enroll Button */}
                                        <div className="col-12 col-md-4 text-md-center mt-3 mt-md-0">
                                            <Button name="Enroll now" className="btn-dark w-100" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="container-fluid">
                <div className="border-bottom pb-3 d-flex flex-wrap align-items-center">
                    {tabItems.map((t, i) => (
                        <div key={t} className="d-flex align-items-center me-2">
                            <button
                                type="button"
                                onClick={() => setActiveTab(i)}
                                className={`btn btn-link px-0 text-decoration-none ${i === activeTab ? "fw-semibold text-dark" : "text-dark"
                                    }`}
                            >
                                {t}
                            </button>
                            {i < tabItems.length - 1 && (
                                <span className="mx-2 text-secondary">|</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Topics header */}
            <div className="container-fluid pt-4">
                <div className="h6 text-secondary mb-3">
                    Topics ({topics.length})
                </div>
            </div>

            {/* Topics list */}
            <div className="container-fluid">
                <div className="d-flex flex-column gap-3">
                    {topics.map((topic, index) => {
                        const isFree = index === 0; // first topic free
                        return (
                            <div
                                key={topic.topic_id}
                                className="rounded-2"
                                style={{ background: "#ffffff", border: "none" }}
                            >
                                <div
                                    className="px-4 d-flex align-items-center justify-content-between atg-plans-card"
                                    style={{
                                        minHeight: 100,
                                        paddingTop: 12,
                                        paddingBottom: 12,
                                    }}
                                >
                                    <div className="d-flex align-items-center gap-5">
                                        <div
                                            className="rounded-circle"
                                            style={{
                                                width: 36,
                                                height: 36,
                                                background: "#fff3cd",
                                                color: "#856404",
                                                fontWeight: 600,
                                                display: "grid",
                                                placeItems: "center",
                                            }}
                                        >
                                            {index + 1}
                                        </div>
                                        <div className="fs-5 fw-semibold">
                                            {topic.topic_name}
                                            <div className="fw-normal fs-6">
                                                Questions({topic.no_of_questions})
                                            </div>
                                        </div>
                                    </div>

                                    {isFree ? (
                                        <button
                                            className="btn btn-outline-dark rounded-3 px-4 py-2"
                                            onClick={() =>
                                                handleAttemptForFree(
                                                    topic.topic_name,
                                                    topic.topic_id
                                                )
                                            }
                                        >
                                            Attempt For Free
                                        </button>
                                    ) : (
                                        <span className="fs-4" aria-hidden="true" title="Locked">
                                            <img src={lock} alt="lock" />
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Section */}
            <div className="container-fluid my-5">
                <div className="card border-0 mb-4 atg-plans-card">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center text-center py-4">
                        <p className="mb-4">
                            Practice Test for <b>Principles Of Flight (POF)</b>
                        </p>
                        <img src={lock} alt="lock" />
                    </div>
                </div>

                {/* Heading */}
                <h5 className="fw-semibold mb-3">
                    Unlimited Access to {subject.subject_name} Mock Tests
                </h5>

                {/* Blue plan card */}
                <div
                    className="rounded-4 overflow-hidden shadow-sm py-3"
                    style={{ background: "#bcd6ff" }}
                >
                    <div className="d-flex align-items-center justify-content-between px-3 px-md-4 py-3">
                        <div className="d-flex align-items-center gap-3">
                            <div
                                className="d-flex align-items-center justify-content-center rounded-circle bg-white"
                                style={{ width: 44, height: 44 }}
                            >
                                <img src={lockpad} alt="lockpad" />
                            </div>
                            <div>
                                <div className="fw-semibold">
                                    {subject.subject_name} - Full Syllabus Mocktest
                                </div>
                                <div className="small text-dark">
                                    Every topic is included, following the DGCA&apos;s prescribed format.
                                </div>
                            </div>
                        </div>
                        <div className="fs-5" aria-hidden="true">
                            <img src={lock} alt="lock" />
                        </div>
                    </div>
                </div>

                {/* Bottom price & enroll */}
                <div className="px-3 px-md-4 py-4">
                    <div className="row">
                        <div className="col-sm-6"></div>
                        <div className="col-sm-6 d-flex">
                            <div className="text">
                                <h3 className=" fs-2">₹ 1083 / month</h3>
                                <p style={{ fontSize: "0.7rem" }}>
                                    When subscribed for 12 months plan
                                </p>
                            </div>
                            <div className="ms-5">
                                <button
                                    className="btn rounded-pill px-4 fw-semibold"
                                    style={{ backgroundColor: "#d2f4c7", color: "#30904c" }}
                                >
                                    Save Extra 50%
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-sm-6"></div>
                        <div className="col-sm-6">
                            <Button name="Enroll now" className="btn-dark w-100 fs-6" />
                            <p
                                className="text-center mt-3 fw-bold"
                                style={{ fontSize: "0.8rem" }}
                            >
                                <span className="me-2" aria-hidden="true">
                                    ⚡
                                </span>
                                Early Bird Discount for Limited Period Only
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
