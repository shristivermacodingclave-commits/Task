// import React, { useMemo, useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import "./AtgPlan.css";
// import Button from "../Button";
// import lock from "../../assets/images/lock.svg";
// import lockpad from "../../assets/images/lock-pad.svg";
// import axios from "axios";
// import Loader from "../Loader";
// import { usePurchase } from "../../context/PurchaseContext";

// export default function PlanPage() {
//     const { subjectId } = useParams();               // ⭐ GET subject ID dynamically
//     const [subject, setSubject] = useState(null);
//     const [topics, setTopics] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [activeTab, setActiveTab] = useState(0);
//     const navigate = useNavigate();


//     const location = useLocation();
//     const from = location.state?.from;



//     // Purchase context
//     const { purchasedIds, loadingPurchase } = usePurchase();

//     // Fetch subject data dynamically
//     useEffect(() => {
//         axios
//             .get(`https://development.pilotexaminations.com/api/subject/${subjectId}`)
//             .then((res) => {
//                 if (!res.data.error) {
//                     setSubject(res.data.subject);
//                     setTopics(res.data.topics || []);
//                 } else setError("Error fetching subject data");
//             })
//             .catch(() => setError("Failed to fetch data"))
//             .finally(() => setLoading(false));
//     }, [subjectId]);

//     const tabItems = useMemo(
//         () => [
//             "Principles Of Flight (POF)",
//             "Aircraft Airframes and Systems",
//             "Electrics and Electronics",
//             "PowerPlant",
//             "Important Questions",
//         ],
//         []
//     );

//     if (loading || loadingPurchase) return <Loader message="Loading subject details..." />;
//     if (error) return <p className="text-center text-danger py-5">{error}</p>;

//     const isPurchased = purchasedIds.includes(subject.subject_id);

//     const showViewResult = isPurchased && from === "test";

//     // ⭐ Topic-wise free test or paid test
//     const handleAttemptForFree = (topicName, topicId) => {
//         navigate(`/dashboard/my-courses/e-test/${subject.subject_id}`, {
//             state: {
//                 subject: subject.subject_name,
//                 topic: topicName,
//                 topicId,
//                 subjectId: subject.subject_id,
//                 testType: "e-test",
//                 planPath: `/dashboard/my-courses/plan/${subject.subject_id}`,
//             },
//         });
//     };

//     //  Full Mock Test (subject-wise only)
//     const handleMockTest = () => {
//         navigate(`/dashboard/my-courses/mock-test/${subject.subject_id}`, {
//             state: {
//                 subjectId: subject.subject_id,
//                 subjectName: subject.subject_name,
//                 testType: "Mock-Test",
//                 planPath: `/dashboard/my-courses/plan/${subject.subject_id}`,
//             },
//         });
//     };

//     // handle Practice Test
//     const handlePracticeTest = () => {
//         navigate(`/dashboard/my-courses/e-test/${subject.mini_subject_id}`, {
//             state: {                     
//                 miniSubjectId: subject.mini_subject_id|| 1,   // 🔥 main ID for API
//                 topic: subject.mini_subject_name,         // Heading (UI only)
//                 subject: subject.subject_name,            // Optional for UI
//                 testType: "practice-test",                // For Plan Page button
//                 planPath: `/dashboard/my-courses/plan/${subject.subject_id}`,
//             },
//         });
//     };


//     return (
//         <div className="bg-light min-vh-100 mt-3">

//             {/* HERO CARD */}
//             <div className="container-fluid pb-3">
//                 <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
//                     <div className="py-4" style={{ backgroundColor: subject.title_color }}>
//                         <div className="container-fluid">
//                             <div className="row align-items-center">
//                                 <div className="col-md-2 text-center mb-3 mb-md-0">
//                                     <img
//                                         src={
//                                             subject.subject_image?.startsWith("http")
//                                                 ? subject.subject_image
//                                                 : `https://development.pilotexaminations.com/${subject.icon}`
//                                         }
//                                         alt={subject.subject_name}
//                                         style={{
//                                             height: "100px",
//                                             width: "200px",
//                                             objectFit: "contain",
//                                         }}
//                                     />
//                                 </div>

//                                 <div className="col-md-10">
//                                     <h1 className="h2 mb-2 fw-semibold">{subject.subject_name}</h1>
//                                     <p className="mb-0 text-dark">{subject.description}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Bottom Section */}
//                     <div className="py-4" style={{ backgroundColor: subject.body_color }}>
//                         <div className="container-fluid">
//                             <div className="row align-items-center">
//                                 <div className="col-md-1"></div>

//                                 <div className="col-md-11">
//                                     <div className="row align-items-center">

//                                         {/* Stats */}
//                                         <div className="col-12 col-md-8">
//                                             <div className="row row-cols-3 text-center m-0">
//                                                 <div className="col">
//                                                     <div className="fs-6 fw-semibold py-2">{topics.length}</div>
//                                                     <div className="small fs-6">Topics Covered</div>
//                                                 </div>

//                                                 <div className="col">
//                                                     <div className="fs-6 fw-semibold py-2">{subject.total_questions}</div>
//                                                     <div className="small fs-6">Questions</div>
//                                                 </div>

//                                                 <div className="col">
//                                                     <div className="fs-6 fw-semibold py-2">{subject.happy_students}</div>
//                                                     <div className="small fs-6">Happy Students</div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* Right Side Button */}
//                                         <div className="col-12 col-md-4 mt-3 mt-md-0 text-md-center">
//                                             {/* {!isPurchased ? (
//                                                 <Button name="Enroll now" className="btn-dark w-100" />
//                                             ) : (
//                                                 <Button
//                                                     name="Attempt MockTest"
//                                                     className="btn-dark w-100"
//                                                     onClick={handleMockTest}
//                                                 />
//                                             )} */}

//                                             {!isPurchased ? (

//                                                 <Button name="Enroll now" className="btn-dark w-100" />

//                                             ) : showViewResult ? (

//                                                 <Button
//                                                     name="View Result"
//                                                     className="btn-dark w-100"
//                                                     onClick={() =>
//                                                         navigate(`/dashboard/mocktest/result/${subject.subject_id}`)
//                                                     }
//                                                 />

//                                             ) : (

//                                                 <Button
//                                                     name="Attempt MockTest"
//                                                     className="btn-dark w-100"
//                                                     onClick={handleMockTest}
//                                                 />

//                                             )}

//                                         </div>

//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>

//             {/* TABS */}
//             <div className="container-fluid">
//                 <div className="border-bottom pb-3 d-flex flex-wrap">
//                     {tabItems.map((t, i) => (
//                         <div key={i} className="d-flex align-items-center me-2">
//                             <button
//                                 className={`btn btn-link px-0 text-decoration-none ${i === activeTab ? "fw-semibold text-dark" : "text-dark"
//                                     }`}
//                                 onClick={() => setActiveTab(i)}
//                             >
//                                 {t}
//                             </button>
//                             {i < tabItems.length - 1 && <span className="mx-2 text-secondary">|</span>}
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* TOPIC LIST */}
//             <div className="container-fluid pt-4">
//                 <h6 className="text-secondary mb-3">Topics ({topics.length})</h6>
//             </div>

//             <div className="container-fluid">
//                 <div className="d-flex flex-column gap-3">

//                     {topics.map((topic, index) => {
//                         const isFree = index === 0;

//                         return (
//                             <div key={topic.topic_id} className="rounded-2 bg-white">
//                                 <div className="px-4 d-flex align-items-center justify-content-between atg-plans-card" style={{ minHeight: 100 }}>

//                                     <div className="d-flex align-items-center gap-5">
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
//                                             {index + 1}
//                                         </div>

//                                         <div className="fs-5 fw-semibold">
//                                             {topic.topic_name}
//                                             <div className="fw-normal fs-6">
//                                                 Questions({topic.no_of_questions})
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Right Side Buttons */}
//                                     {!isPurchased ? (
//                                         isFree ? (
//                                             <button
//                                                 className="btn btn-outline-dark rounded-3 px-4 py-2"
//                                                 onClick={() =>
//                                                     handleAttemptForFree(topic.topic_name, topic.topic_id)
//                                                 }
//                                             >
//                                                 Attempt For Free
//                                             </button>
//                                         ) : (
//                                             <img src={lock} alt="locked" />
//                                         )
//                                     ) : (
//                                         <button
//                                             className="btn btn-outline-dark rounded-3 px-4 py-2"
//                                             onClick={() =>
//                                                 handleAttemptForFree(topic.topic_name, topic.topic_id)
//                                             }
//                                         >
//                                             Answer E-Test
//                                         </button>
//                                     )}

//                                 </div>
//                             </div>
//                         );
//                     })}

//                 </div>
//             </div>

//             {/* ===========================================================
//                 BOTTOM SECTION (MOCK TEST + PRICE)
//             ============================================================ */}

//             {!isPurchased && (
//                 <div className="container-fluid my-5">

//                     <div className="card border-0 mb-4 atg-plans-card">
//                         <div className="card-body text-center py-4">
//                             <p className="mb-4">
//                                 Practice Test for <b>{tabItems[activeTab]}</b>
//                             </p>
//                             <img src={lock} alt="locked" />
//                         </div>
//                     </div>

//                     <h5 className="fw-semibold mb-3">
//                         Unlimited Access to {subject.subject_name} Mock Tests
//                     </h5>

//                     <div className="rounded-4 overflow-hidden shadow-sm py-3" style={{ background: "#bcd6ff" }}>
//                         <div className="d-flex align-items-center justify-content-between px-4 py-3">

//                             <div className="d-flex align-items-center gap-5">
//                                 <div
//                                     className="rounded-circle bg-white d-flex align-items-center justify-content-center"
//                                     style={{ width: 44, height: 44 }}
//                                 >
//                                     <img src={lockpad} alt="locked" />
//                                 </div>
//                                 <div>
//                                     <div className="fw-semibold">
//                                         {subject.subject_name} - Full Syllabus Mocktest
//                                     </div>
//                                     <div className="small text-dark">
//                                         Every topic is included.
//                                     </div>
//                                 </div>
//                             </div>

//                             <img src={lock} alt="locked" />
//                         </div>
//                     </div>

//                     {/* Price Section */}
//                     <div className="px-4 py-4">
//                         <div className="row">
//                             <div className="col-sm-6"></div>

//                             <div className="col-sm-6 d-flex">
//                                 <div>
//                                     <h3 className="fs-2">₹ 1083 / month</h3>
//                                     <p style={{ fontSize: "0.7rem" }}>
//                                         When subscribed for 12 months plan
//                                     </p>
//                                 </div>

//                                 <div className="ms-5">
//                                     <button
//                                         className="btn rounded-pill px-4 fw-semibold"
//                                         style={{ backgroundColor: "#d2f4c7", color: "#30904c" }}
//                                     >
//                                         Save Extra 50%
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="row mt-3">
//                             <div className="col-sm-6"></div>

//                             <div className="col-sm-6">
//                                 <Button name="Enroll now" className="btn-dark w-100 fs-6" />
//                                 <p className="text-center mt-3 fw-bold" style={{ fontSize: "0.8rem" }}>
//                                     ⚡ Early Bird Discount for Limited Period Only
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             )}

//             {/* WHEN PURCHASED */}
//             {isPurchased && (
//                 <div className="container-fluid my-5">

//                     <div className="card border-0 mb-4 atg-plans-card">
//                         <div className="card-body text-center py-4">
//                             <p className="mb-4">Practice Test (Subject Wise)</p>

//                             <Button
//                                 name="Start Practice Test"
//                                 className="btn-dark"
//                                 onClick={handlePracticeTest}
//                             />
//                         </div>
//                     </div>

//                     <h5 className="fw-semibold mb-3">
//                         Unlimited Access to {subject.subject_name} Mock Tests
//                     </h5>

//                     <div className="rounded-4 overflow-hidden shadow-sm py-3" style={{ background: "#bcd6ff" }}>
//                         <div className="d-flex align-items-center justify-content-between px-4 py-3">

//                             <div className="d-flex align-items-center gap-5">
//                                 <div
//                                     className="rounded-circle bg-white d-flex align-items-center justify-content-center"
//                                     style={{ width: 44, height: 44 }}
//                                 >
//                                     <img src={lockpad} alt="unlocked" />
//                                 </div>
//                                 <div>
//                                     <div className="fw-semibold">
//                                         {subject.subject_name} - Full Syllabus Mocktest
//                                     </div>
//                                     <div className="small text-dark">Every topic is included.</div>
//                                 </div>
//                             </div>

//                             <Button
//                                 name="Start Full MockTest"
//                                 className="btn-dark"
//                                 onClick={handleMockTest}
//                             />
//                         </div>
//                     </div>

//                 </div>
//             )}

//         </div>
//     );
// }







// current code logic 


import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./AtgPlan.css";
import Button from "../Button";
import lock from "../../assets/images/lock.svg";
import lockpad from "../../assets/images/lock-pad.svg";
import axios from "axios";
import Loader from "../Loader";
import { usePurchase } from "../../context/PurchaseContext";

export default function PlanPage() {
    const { subjectId } = useParams();
    const [subject, setSubject] = useState(null);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();

    const location = useLocation();
    const from = location.state?.from;

    const { purchasedIds, loadingPurchase } = usePurchase();

    // Fetch subject
    useEffect(() => {
        axios
            .get(`https://development.pilotexaminations.com/api/subject/${subjectId}`)
            .then((res) => {
                if (!res.data.error) {
                    setSubject(res.data.subject);
                    setTopics(res.data.topics || []);
                } else setError("Error fetching subject data");
            })
            .catch(() => setError("Failed to fetch data"))
            .finally(() => setLoading(false));
    }, [subjectId]);

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

    if (loading || loadingPurchase) return <Loader message="Loading subject details..." />;
    if (error) return <p className="text-center text-danger py-5">{error}</p>;

    const isPurchased = purchasedIds.includes(subject.subject_id);
    const showViewResult = isPurchased && from === "test";

    // ⭐ E-TEST navigation
    const handleAttemptForFree = (topicName, topicId) => {
        navigate(`/dashboard/my-courses/e-test/${topicId}`, {
            state: {
                type: "e-test",                 // ⭐ Required for PlanEtest logic
                subject: subject.subject_name,
                topic: topicName,
                topicId,
                planPath: `/dashboard/my-courses/plan/${subject.subject_id}`,
                testType: "E-Test",             // UI label only
            },
        });
    };

    // ⭐ Mock Test navigation
    const handleMockTest = () => {
        navigate(`/dashboard/my-courses/mock-test/${subject.subject_id}`, {
            state: {
                type: "mock-test",              // ⭐ Required for logic
                subjectId: subject.subject_id,
                subjectName: subject.subject_name,
                planPath: `/dashboard/my-courses/plan/${subject.subject_id}`,
                testType: "Mock Test",
            },
        });
    };

    // ⭐ Practice Test navigation
    const handlePracticeTest = () => {
        navigate(`/dashboard/my-courses/e-test/${subject.subject_id}`, {
            state: {
                type: "practice-test",           // ⭐ Required for PlanEtest logic
                miniSubjectId: subject.mini_subject_id || 1, // Default until DB updated
                topic: subject.mini_subject_name || "Practice Test",
                subject: subject.subject_name,
                planPath: `/dashboard/my-courses/plan/${subject.subject_id}`,
                testType: "Practice Test",       // UI label only
            },
        });
    };

    return (
        <div className="bg-light min-vh-100 mt-3">

            {/* HERO CARD */}
            <div className="container-fluid pb-3">
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="py-4" style={{ backgroundColor: subject.title_color }}>
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                <div className="col-md-2 text-center mb-3 mb-md-0">
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

                                <div className="col-md-10">
                                    <h1 className="h2 mb-2 fw-semibold">{subject.subject_name}</h1>
                                    <p className="mb-0 text-dark">{subject.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Body Section */}
                    <div className="py-4" style={{ backgroundColor: subject.body_color }}>
                        <div className="container-fluid">

                            <div className="row align-items-center">
                                <div className="col-md-1"></div>

                                <div className="col-md-11">
                                    <div className="row align-items-center">

                                        {/* Stats */}
                                        <div className="col-12 col-md-8">
                                            <div className="row row-cols-3 text-center m-0">
                                                <div className="col">
                                                    <div className="fs-6 fw-semibold py-2">{topics.length}</div>
                                                    <div className="small fs-6">Topics Covered</div>
                                                </div>

                                                <div className="col">
                                                    <div className="fs-6 fw-semibold py-2">{subject.total_questions}</div>
                                                    <div className="small fs-6">Questions</div>
                                                </div>

                                                <div className="col">
                                                    <div className="fs-6 fw-semibold py-2">{subject.happy_students}</div>
                                                    <div className="small fs-6">Happy Students</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Buttons */}
                                        <div className="col-12 col-md-4 mt-3 mt-md-0 text-md-center">

                                            {!isPurchased ? (
                                                <Button name="Enroll now" className="btn-dark w-100" />
                                            ) : showViewResult ? (
                                                <Button
                                                    name="View Result"
                                                    className="btn-dark w-100"
                                                    onClick={() =>
                                                        navigate(`/dashboard/mocktest/result/${subject.subject_id}`)
                                                    }
                                                />
                                            ) : (
                                                <Button
                                                    name="Attempt MockTest"
                                                    className="btn-dark w-100"
                                                    onClick={handleMockTest}
                                                />
                                            )}

                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* TABS */}
            <div className="container-fluid">
                <div className="border-bottom pb-3 d-flex flex-wrap">
                    {tabItems.map((t, i) => (
                        <div key={i} className="d-flex align-items-center me-2">
                            <button
                                className={`btn btn-link px-0 text-decoration-none ${
                                    i === activeTab ? "fw-semibold text-dark" : "text-dark"
                                }`}
                                onClick={() => setActiveTab(i)}
                            >
                                {t}
                            </button>
                            {i < tabItems.length - 1 && <span className="mx-2 text-secondary">|</span>}
                        </div>
                    ))}
                </div>
            </div>

            {/* TOPICS */}
            <div className="container-fluid pt-4">
                <h6 className="text-secondary mb-3">Topics ({topics.length})</h6>
            </div>

            <div className="container-fluid">
                <div className="d-flex flex-column gap-3">
                    {topics.map((topic, index) => {
                        const isFree = index === 0;

                        return (
                            <div key={topic.topic_id} className="rounded-2 bg-white">
                                <div
                                    className="px-4 d-flex align-items-center justify-content-between atg-plans-card"
                                    style={{ minHeight: 100 }}
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

                                    {/* Buttons */}
                                    {!isPurchased ? (
                                        isFree ? (
                                            <button
                                                className="btn btn-outline-dark rounded-3 px-4 py-2"
                                                onClick={() =>
                                                    handleAttemptForFree(topic.topic_name, topic.topic_id)
                                                }
                                            >
                                                Attempt For Free
                                            </button>
                                        ) : (
                                            <img src={lock} alt="locked" />
                                        )
                                    ) : (
                                        <button
                                            className="btn btn-outline-dark rounded-3 px-4 py-2"
                                            onClick={() =>
                                                handleAttemptForFree(topic.topic_name, topic.topic_id)
                                            }
                                        >
                                            Answer E-Test
                                        </button>
                                    )}

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* PRACTICE TEST SECTION */}
            {isPurchased && (
                <div className="container-fluid my-5">
                    <div className="card border-0 mb-4 atg-plans-card">
                        <div className="card-body text-center py-4">
                            <p className="mb-4">Practice Test (Subject Wise)</p>

                            <Button
                                name="Start Practice Test"
                                className="btn-dark"
                                onClick={handlePracticeTest}
                            />
                        </div>
                    </div>

                    <h5 className="fw-semibold mb-3">
                        Unlimited Access to {subject.subject_name} Mock Tests
                    </h5>

                    <div className="rounded-4 overflow-hidden shadow-sm py-3" style={{ background: "#bcd6ff" }}>
                        <div className="d-flex align-items-center justify-content-between px-4 py-3">

                            <div className="d-flex align-items-center gap-5">
                                <div
                                    className="rounded-circle bg-white d-flex align-items-center justify-content-center"
                                    style={{ width: 44, height: 44 }}
                                >
                                    <img src={lockpad} alt="unlocked" />
                                </div>
                                <div>
                                    <div className="fw-semibold">
                                        {subject.subject_name} - Full Syllabus Mocktest
                                    </div>
                                    <div className="small text-dark">Every topic is included.</div>
                                </div>
                            </div>

                            <Button
                                name="Start Full MockTest"
                                className="btn-dark"
                                onClick={handleMockTest}
                            />
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
