// import React from "react";
// import "./RecentPurchases.css"; 
// import Button from "../component/Button";
// import { Link } from "react-router-dom";

// function RecentPurchase() {
//   const purchasedSubjects = [
//     {
//       subject_id: 101,
//       subject_name: "Navigation Composite",
//       icon: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
//       title_color: "#f2f7ff",
//       description: "Topic 1 / Topic 2 / Topic 3 / Topic 4",
//       viewDetailPath: "/dashboard/my-courses",
//       attemptPath: "/dashboard/attempt-test",
//     },
//     {
//       subject_id: 102,
//       subject_name: "Air Regulation",
//       icon: "https://cdn-icons-png.flaticon.com/512/3144/3144456.png",
//       title_color: "#fff3e6",
//       description: "ICAO / DGCA / Rules / Safety",
//       viewDetailPath: "/dashboard/my-courses",
//       attemptPath: "/dashboard/attempt-test",
//     },
//   ];

//   return (
//     <div className="ontainer-fluidc subject-section mt-4">
//       <h3 className="fw-bold my-2 mb-4">Recent Purchases</h3>
//       <hr />

//       <div className="row">
//         {purchasedSubjects.map((subject) => {
//           const topics = subject.description
//             ? subject.description.split("/").map((t) => t.trim())
//             : [];

//           const topicsToShow = topics.slice(0, 3);
//           const remainingCount = topics.length > 3 ? topics.length - 3 : 0;

//           return (
//             <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={subject.subject_id}>
//               <div className="subject-card">
//                 {/* ===== Header ===== */}
//                 <div
//                   className="subject-header py-4"
//                   style={{ backgroundColor: subject.title_color || "#f9f9f9" }}
//                 >
//                   <h4
//                     className="subject-title"
//                     style={{
//                       fontSize: "1.5rem",
//                       fontWeight: "normal",
//                       color: "black",
//                     }}
//                   >
//                     {subject.subject_name}
//                   </h4>

//                   <img
//                     src={subject.icon}
//                     alt={subject.subject_name}
//                     className="subject-icon"
//                     onError={(e) => (e.target.style.display = "none")}
//                     style={{ height: "50px", width: "50px" }}
//                   />
//                 </div>

//                 {/* ===== Topics ===== */}
//                 <div className="subject-topics">
//                   <div className="row mb-2">
//                     <div className="col-md-6">
//                       <h6>Topic Covered</h6>
//                     </div>
//                     <div className="col-md-6 text-end">
//                       <Link
//                         to={subject.viewDetailPath}
//                         style={{ color: "black", fontWeight: "bold" }}
//                         className="details-hover"
//                       >
//                         View Details
//                       </Link>
//                     </div>
//                   </div>

//                   <ul>
//                     {topicsToShow.map((topic, i) => (
//                       <li key={i}>
//                         <h6>{topic}</h6>
//                       </li>
//                     ))}
//                     {remainingCount > 0 && (
//                       <li className="text-muted">
//                         +{remainingCount} more topics...
//                       </li>
//                     )}
//                   </ul>
//                 </div>

//                 <hr />

//                 {/* ===== Footer ===== */}
//                 <div className="text-center" style={{ padding: "1.25rem" }}>

//                   <Button
//                     name="View / Attempt Test"
//                     className="btn-dark fs-6 form-control mb-2 subscribe-button"
//                     onClick={() => console.log("Attempt Test")}
//                   />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default RecentPurchase;




// import React, { useEffect, useState } from "react";
// import "./RecentPurchases.css";
// import Button from "../component/Button";
// import { Link } from "react-router-dom";
// import axios from "axios";

// function RecentPurchase() {
//   const [purchasedSubjects, setPurchasedSubjects] = useState([]);

//   useEffect(() => {
//     axios
//       .post("https://development.pilotexaminations.com/api/mock/check-access", {
//         user_id: 27,
//       })
//       .then((response) => {
//         if (!response.data.error) {
//           setPurchasedSubjects(response.data.subjects);
//         }
//       })
//       .catch((err) => console.error("API Error:", err));
//   }, []);

//   return (
//     <div className="container-fluid subject-section mt-4">
//       <h3 className="fw-bold my-2 mb-4">Recent Purchases</h3>
//       <hr />

//       <div className="row">
//         {purchasedSubjects.map((subject) => {
//           // API gives: topics = [] and topics_count = 0
//           const topics = subject.topics?.map((t) => t.topic_name) || [];
//           const topicsToShow = topics.slice(0, 3);
//           const remainingCount =
//             topics.length > 3 ? topics.length - 3 : 0;

//           return (
//             <div
//               className="col-lg-4 col-md-6 col-sm-12 mb-3"
//               key={subject.subject_id}
//             >
//               <div className="subject-card">

//                 {/* ===== Header ===== */}
//                 <div
//                   className="subject-header py-4"
//                   style={{ backgroundColor: subject.title_color || "#f9f9f9" }}
//                 >
//                   <h4
//                     className="subject-title"
//                     style={{
//                       fontSize: "1.5rem",
//                       fontWeight: "normal",
//                       color: "black",
//                     }}
//                   >
//                     {subject.subject_name}
//                   </h4>

//                   <img
//                     src={`https://development.pilotexaminations.com/${subject.icon}`}
//                     alt={subject.subject_name}
//                     className="subject-icon"
//                     onError={(e) => (e.target.style.display = "none")}
//                     style={{ height: "50px", width: "50px" }}
//                   />
//                 </div>

//                 {/* ===== Topics Section ===== */}
//                 <div className="subject-topics">
//                   <div className="row mb-2">
//                     <div className="col-md-6">
//                       <h6>{subject.topics_covered_text}</h6>
//                     </div>
//                     <div className="col-md-6 text-end">
//                       <Link
//                         to="/dashboard/my-courses"
//                         style={{ color: "black", fontWeight: "bold" }}
//                         className="details-hover"
//                       >
//                         {subject.view_details_button}
//                       </Link>
//                     </div>
//                   </div>

//                   <ul>
//                     {topicsToShow.length > 0 ? (
//                       topicsToShow.map((topic, i) => (
//                         <li key={i}>
//                           <h6>{topic}</h6>
//                         </li>
//                       ))
//                     ) : (
//                       <li className="text-muted">No Topics Available</li>
//                     )}

//                     {remainingCount > 0 && (
//                       <li className="text-muted">
//                         +{remainingCount} more topics...
//                       </li>
//                     )}
//                   </ul>
//                 </div>

//                 <hr />

//                 {/* ===== Footer ===== */}
//                 <div className="text-center" style={{ padding: "1.25rem" }}>
//                   <Button
//                     name={subject.test_button}
//                     className="btn-dark fs-6 form-control mb-2 subscribe-button"
//                     onClick={() =>
//                       console.log(`Attempt Test: ${subject.subject_id}`)
//                     }
//                   />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default RecentPurchase;



// import React, { useEffect, useState } from "react";
// import "./RecentPurchases.css";
// import Button from "../component/Button";
// import { Link } from "react-router-dom";
// import axios from "axios";

// function RecentPurchases({ onData }) {
//   const [purchasedSubjects, setPurchasedSubjects] = useState([]);

//   useEffect(() => {
//     axios
//       .post("https://development.pilotexaminations.com/api/mock/check-access",{
//         user_id:27
//       })
//       .then((res) => {
//         console.log("API RAW RESPONSE = ", res.data);
//         const subjects = res.data.subjects || [];
//         setPurchasedSubjects(subjects);
//         onData(subjects); // send to DashboardHome
//       });
//   }, []);

//   if (purchasedSubjects.length === 0) return null;

//   return (
//     <div className="container-fluid subject-section mt-4">
//       <h3 className="fw-bold my-2 mb-4">Recent Purchases</h3>
//       <hr />

//       <div className="row">
//         {purchasedSubjects.map((subject) => {
//           // API gives: topics = [] and topics_count = 0
//           const topics = subject.topics?.map((t) => t.topic_name) || [];
//           const topicsToShow = topics.slice(0, 3);
//           const remainingCount =
//             topics.length > 3 ? topics.length - 3 : 0;

//           return (
//             <div
//               className="col-lg-4 col-md-6 col-sm-12 mb-3"
//               key={subject.subject_id}
//             >
//               <div className="subject-card">

//                 {/* ===== Header ===== */}
//                 <div
//                   className="subject-header py-4"
//                   style={{ backgroundColor: subject.title_color || "#f9f9f9" }}
//                 >
//                   <h4
//                     className="subject-title"
//                     style={{
//                       fontSize: "1.5rem",
//                       fontWeight: "normal",
//                       color: "black",
//                     }}
//                   >
//                     {subject.subject_name}
//                   </h4>

//                   <img
//                     src={`https://development.pilotexaminations.com/${subject.icon}`}
//                     alt={subject.subject_name}
//                     className="subject-icon"
//                     onError={(e) => (e.target.style.display = "none")}
//                     style={{ height: "50px", width: "50px" }}
//                   />
//                 </div>

//                 {/* ===== Topics Section ===== */}
//                 <div className="subject-topics">
//                   <div className="row mb-2">
//                     <div className="col-md-6">
//                       <h6>{subject.topics_covered_text}</h6>
//                     </div>
//                     <div className="col-md-6 text-end">
//                       <Link
//                         to="/dashboard/my-courses"
//                         style={{ color: "black", fontWeight: "bold" }}
//                         className="details-hover"
//                       >
//                         {subject.view_details_button}
//                       </Link>
//                     </div>
//                   </div>

//                   <ul>
//                     {topicsToShow.length > 0 ? (
//                       topicsToShow.map((topic, i) => (
//                         <li key={i}>
//                           <h6>{topic}</h6>
//                         </li>
//                       ))
//                     ) : (
//                       <li className="text-muted">No Topics Available</li>
//                     )}

//                     {remainingCount > 0 && (
//                       <li className="text-muted">
//                         +{remainingCount} more topics...
//                       </li>
//                     )}
//                   </ul>
//                 </div>

//                 <hr />

//                 {/* ===== Footer ===== */}
//                 <div className="text-center" style={{ padding: "1.25rem" }}>
//                   <Button
//                     name={subject.test_button}
//                     className="btn-dark fs-6 form-control mb-2 subscribe-button"
//                     onClick={() =>
//                       console.log(`Attempt Test: ${subject.subject_id}`)
//                     }
//                   />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default RecentPurchases;




import React, { useEffect, useState } from "react";
import "./RecentPurchases.css";
import Button from "../component/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { subjectPaths } from "../assets/subjectPaths";


function RecentPurchases({ onData }) {
  const [purchasedSubjects, setPurchasedSubjects] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    // get user from localStorage
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
      console.log("No user_id found in localStorage");
      onData([]); // no purchases
      return;
    }

    axios
      .post("https://development.pilotexaminations.com/api/mock/check-access", {
        user_id: userId
      })
      .then((res) => {
        console.log("Recent Purchases API Response =", res.data);

        const subjects = res.data.subjects || [];

        setPurchasedSubjects(subjects);
        onData(subjects); // send purchased subjects to dashboard
      })
      .catch((err) => {
        console.error("Error fetching purchases:", err);
        onData([]); // ensure parent receives empty
      });

  }, []);

  // Hide UI completely if no purchases
  if (purchasedSubjects.length === 0) return null;

  return (
    <div className="container-fluid subject-section mt-4">
      <h3 className="fw-bold my-2 mb-4">Recent Purchases</h3>
      <hr />

      <div className="row py-2 ">
        {purchasedSubjects.map((subject) => {

          const topics = subject.topics?.map((t) => t.topic_name) || [];
          const topicsToShow = topics.slice(0, 3);
          const remainingCount = topics.length > 3 ? topics.length - 3 : 0;

          // GET SUBJECT PATHS BASED ON NAME
          const paths =
            subjectPaths[subject.subject_name] || {
              viewDetailPath: "/dashboard/my-courses",
            };

          return (
            <div
              className="col-lg-4 col-md-6 col-sm-12 mb-3"
              key={subject.subject_id}
            >
              <div className="subject-card">

                {/* Header */}
                <div
                  className="subject-header py-4"
                  style={{ backgroundColor: subject.title_color || "#f9f9f9" }}
                >
                  <h4 className="subject-title" style={{ fontSize: "1.5rem", color: "black" }}>
                    {subject.subject_name}
                  </h4>

                  <img
                    src={`https://development.pilotexaminations.com/${subject.icon}`}
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
                      <h6>{subject.topics_covered_text}</h6>
                    </div>

                    <div className="col-md-6 text-end">
                      <Link
                        to={`/dashboard/my-courses/plan/${subject.subject_id}`}
                        state={{ from: "details" }}
                        className="details-hover"
                        style={{ color: "black", fontWeight: "bold" }}
                      >
                        {subject.view_details_button}
                      </Link>

                    </div>

                  </div>

                  <ul>
                    {topicsToShow.length > 0 ? (
                      topicsToShow.map((topic, i) => (
                        <li key={i}><h6>{topic}</h6></li>
                      ))
                    ) : (
                      <li className="text-muted">No Topics Available</li>
                    )}

                    {remainingCount > 0 && (
                      <li className="text-muted">
                        +{remainingCount} more topics...
                      </li>
                    )}
                  </ul>
                </div>

                <hr />

                {/* Footer */}
                <div className="text-center" style={{ padding: "1rem" }}>
                  <Button
                    name={subject.test_button}
                    className="btn-dark fs-6 form-control mb-2 subscribe-button"
                    onClick={() =>
                      navigate(`/dashboard/my-courses/plan/${subject.subject_id}`, {
                        state: { from: "test" }
                      })
                    }
                  />

                </div>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default RecentPurchases;
