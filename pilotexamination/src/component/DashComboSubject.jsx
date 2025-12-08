
// import React, { useEffect, useState } from "react";
// import "./ComboSubject.css";
// import axios from "axios";
// import LoginModal from "./LoginModal";
// import { subjectPaths } from "../assets/subjectPaths";

// function ComboSubject({ title, withSpacing = true }) {
//   const [showLogin, setShowLogin] = useState(false);
//   const [comboSubjects, setComboSubjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const BASE_URL = "http://development.pilotexaminations.com/";

//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}api/combo-subjects`)
//       .then((response) => {
//         if (!response.data.error) {
//           setComboSubjects(response.data.data);
//         } else {
//           setError("Error fetching combo subjects");
//         }
//       })
//       .catch(() => setError("Failed to load combo subjects"))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <p className="text-center py-5">Loading combo subjects...</p>;
//   if (error) return <p className="text-center text-danger py-5">{error}</p>;

//   return (
//     <>
//       <div
//         className={`${
//           withSpacing
//             ? "container combo-subject-section"
//             : "container-fluid combo-subject-section mt-0 pt-0"
//         }`}
//       >
//         {title && <h1 className="fw-bold main-title ">{title}</h1>}
//         <div className="combo-subjects green-border mt-5">
//           <div className="green-bg">
//             <div className="row green-bg-text">
//               <div className="col-md-9 col-sm-7">
//                 <h4>DGCA - Three Subject Combo</h4>
//                 <p>Consists of 3 subjects</p>
//                 <span>Combo</span>
//               </div>
//               <div className="col-md-3 col-sm-5 text-center">
//                 <h5>
//                   Prices Starting at
//                   <br className="hide_mobile_br" />
//                   ₹ 999
//                 </h5>

//                 <button
//                   className="btn btn-warning black-btn mt-2 form-control"
//                   onClick={() => setShowLogin(true)}
//                 >
//                   Subscribe Now
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* combo subjects data */}
//           <div className="row inner-combo-section">
//             <div className="">
//               <div className="row">
//                 {comboSubjects.map((subject) => {
//                   const topics = subject.topics || [];
//                   const topicsToShow = topics.slice(0, 5); // show first 5 topics
//                   const remainingCount =
//                     topics.length > 5 ? topics.length - 5 : 0;

//                   return (
//                     <div className="col-md-6 mb-3" key={subject.subject_id}>
//                       <div className="subject-card">
//                         {/* Header */}
//                         <div
//                           className="subject-header py-4"
//                           style={{
//                             backgroundColor: subject.title_color || "#f9f9f9",
//                           }}
//                         >
//                           <h4 className="subject-title" style={{fontSize: "1.5rem", fontWeight:"normal" , color:"black"}}>
//                             {subject.subject_name}
//                           </h4>
//                           <img
//                             src={
//                               subject.icon?.startsWith("http")
//                                 ? subject.icon
//                                 : BASE_URL + subject.icon
//                             }
//                             alt={subject.subject_name}
//                             className="subject-icon"
//                             onError={(e) => (e.target.style.display = "none")}
//                             style={{height:"50px" , width:"50px"}}
//                           />
//                         </div>

//                         {/* Topics */}
//                         <div className="subject-topics">
//                           <div className="row mb-2">
//                             <div className="col-md-6">
//                               <h6>Topic Covered</h6>
//                             </div>
//                             <div className="col-md-6 text-end">
//                               <a
//                                 href="#"
//                                 style={{ color: "black", fontWeight: "bold" }}
//                                 className="details-hover"
//                               >
//                                 View Details
//                               </a>
//                             </div>
//                           </div>
//                           <ul>
//                             {topicsToShow.map((topic, i) => (
//                               <li key={i}>
//                                 <h6>{topic}</h6>
//                               </li>
//                             ))}
//                             {remainingCount > 0 && (
//                               <li className="text-muted">
//                                 +{remainingCount} more topics...
//                               </li>
//                             )}
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
//     </>
//   );
// }

// export default ComboSubject;



// import React, { useEffect, useState } from "react";
// import "./ComboSubject.css";
// import axios from "axios";
// import { subjectPaths } from "../assets/subjectPaths";
// import { useNavigate } from "react-router-dom";
// import Loader from "./Loader";

// function ComboSubject({ title, withSpacing = true }) {
//   const [comboSubjects, setComboSubjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();
//   const BASE_URL = "http://development.pilotexaminations.com/";

//   useEffect(() => {
//     axios
//       .get(`${BASE_URL}api/combo-subjects`)
//       .then((response) => {
//         if (!response.data.error) {
//           setComboSubjects(response.data.data);
//         } else {
//           setError("Error fetching combo subjects");
//         }
//       })
//       .catch(() => setError("Failed to load combo subjects"))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <Loader message="Loading combo subjects..." />;
//   if (error) return <p className="text-center text-danger py-5">{error}</p>;

//   return (
//     <>
//       <div
//         className={`${
//           withSpacing
//             ? "container combo-subject-section"
//             : "container-fluid combo-subject-section mt-0 pt-0"
//         }`}
//       >
//         {title && <h1 className="fw-bold main-title ">{title}</h1>}

//         <div className="combo-subjects green-border mt-5">
//           <div className="green-bg">
//             <div className="row green-bg-text">
//               <div className="col-md-9 col-sm-7">
//                 <h4>DGCA - Three Subject Combo</h4>
//                 <p>Consists of 3 subjects</p>
//                 <span>Combo</span>
//               </div>

            
//               <div className="col-md-3 col-sm-5 text-center">
//                 <h5>
//                   Prices Starting at
//                   <br className="hide_mobile_br" />
//                   ₹ 999
//                 </h5>

//                 <button
//                   className="btn btn-warning black-btn mt-2 form-control"
//                   onClick={() => navigate("/plans/combo-subject")}
//                 >
//                   Subscribe Now
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/*Combo subjects data */}
//           <div className="inner-combo-section">
//             <div className="">
//               <div className="row">
//                 {comboSubjects.map((subject) => {
//                   const topics = subject.topics || [];
//                   const topicsToShow = topics.slice(0, 5);
//                   const remainingCount =
//                     topics.length > 5 ? topics.length - 5 : 0;

//                   // Get correct paths
//                   const paths = subjectPaths[subject.subject_name] || {};
//                   const viewPath = paths.viewDetailPath || "#";
//                   const enrollPath = paths.enrollplanPath || "#";

//                   return (
//                     <div className="col-md-6 mb-3" key={subject.subject_id}>
//                       <div className="subject-card">
//                         {/* Header */}
//                         <div
//                           className="subject-header py-4"
//                           style={{
//                             backgroundColor: subject.title_color || "#f9f9f9",
//                           }}
//                         >
//                           <h4
//                             className="subject-title"
//                             style={{
//                               fontSize: "1.5rem",
//                               fontWeight: "normal",
//                               color: "black",
//                             }}
//                           >
//                             {subject.subject_name}
//                           </h4>
//                           <img
//                             src={
//                               subject.icon?.startsWith("http")
//                                 ? subject.icon
//                                 : BASE_URL + subject.icon
//                             }
//                             alt={subject.subject_name}
//                             className="subject-icon"
//                             onError={(e) => (e.target.style.display = "none")}
//                             style={{ height: "50px", width: "50px" }}
//                           />
//                         </div>

//                         {/* Topics */}
//                         <div className="subject-topics">
//                           <div className="row mb-2">
//                             <div className="col-md-6">
//                               <h6>Topic Covered</h6>
//                             </div>

//                             {/*  View Details link */}
//                             <div className="col-md-6 text-end">
//                               <a
//                                 onClick={() => navigate(viewPath)}
//                                 style={{
//                                   color: "black",
//                                   fontWeight: "bold",
//                                   cursor: "pointer",
//                                 }}
//                                 className="details-hover"
//                               >
//                                 View Details
//                               </a>
//                             </div>
//                           </div>

//                           <ul>
//                             {topicsToShow.map((topic, i) => (
//                               <li key={i}>
//                                 <h6>{topic}</h6>
//                               </li>
//                             ))}
//                             {remainingCount > 0 && (
//                               <p className="text-muted">
//                                 +{remainingCount} more topics...
//                               </p>
//                             )}
//                           </ul>

//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ComboSubject;




import React, { useEffect, useState } from "react";
import "./ComboSubject.css";
import axios from "axios";
import { subjectPaths } from "../assets/subjectPaths";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function ComboSubject({ title, withSpacing = true }) {
  const [comboSubjects, setComboSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const BASE_URL = "http://development.pilotexaminations.com/";

  useEffect(() => {
    // Get user_id from localStorage
    const storedUser = localStorage.getItem("user");
    let userId = null;

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        userId = parsed?.id || parsed?.user_id || parsed?.data?.id;
      } catch {}
    }

    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    // 🔹 POST API (replacing GET)
    axios
      .post(`${BASE_URL}api/combo-subjects`, { user_id: userId })
      .then((response) => {
        console.log("Combo Subjects API:", response.data);

        if (!response.data.error) {
          // backend returns `subjects`
          setComboSubjects(response.data.subjects || []);
        } else {
          setError("Error fetching combo subjects");
        }
      })
      .catch(() => setError("Failed to load combo subjects"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader message="Loading combo subjects..." />;
  if (error) return <p className="text-center text-danger py-5">{error}</p>;

  return (
    <>
      <div
        className={`${
          withSpacing
            ? "container combo-subject-section"
            : "container-fluid combo-subject-section mt-0 pt-0"
        }`}
      >
        {title && <h1 className="fw-bold main-title ">{title}</h1>}

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
                  className="btn btn-warning black-btn mt-2 form-control"
                  onClick={() => navigate("/plans/combo-subject")}
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>

          {/* Combo subjects data */}
          <div className="inner-combo-section">
            <div className="">
              <div className="row">
                {comboSubjects.map((subject) => {
                  const topics = subject.topics || [];
                  const topicsToShow = topics.slice(0, 5);
                  const remainingCount =
                    topics.length > 5 ? topics.length - 5 : 0;

                  const paths = subjectPaths[subject.subject_name] || {};
                  const viewPath = paths.viewDetailPath || "#";

                  return (
                    <div className="col-md-6 mb-3" key={subject.subject_id}>
                      <div className="subject-card">
                        {/* Header */}
                        <div
                          className="subject-header py-4"
                          style={{
                            backgroundColor: subject.title_color || "#f9f9f9",
                          }}
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
                              <h6>Topic Covered</h6>
                            </div>

                            <div className="col-md-6 text-end">
                              <a
                                onClick={() => navigate(`/dashboard/my-courses/plan/${subject.subject_id}`)}
                                style={{
                                  color: "black",
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                }}
                                className="details-hover"
                              >
                                View Details
                              </a>
                            </div>
                          </div>

                          <ul>
                            {topicsToShow.map((topic, i) => (
                              <li key={i}>
                                <h6>{topic}</h6>
                              </li>
                            ))}

                            {remainingCount > 0 && (
                              <p className="text-muted">
                                +{remainingCount} more topics...
                              </p>
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
      </div>
    </>
  );
}

export default ComboSubject;
