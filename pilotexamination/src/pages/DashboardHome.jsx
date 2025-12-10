// import React, { useEffect, useState } from "react";
// import Carousel from "react-bootstrap/Carousel";
// import DashBanner from "../component/DashBanner";
// import DashComboSubject from "../component/DashComboSubject";
// import airplane from "../assets/images/airplanflight.png";
// import Button from "../component/Button";
// import { Link, useNavigate } from "react-router-dom";
// import "./Dashboard.css";
// import axios from "axios";
// import { subjectPaths } from "../assets/subjectPaths";
// import Loader from "../component/Loader";
// import RecentPurchases from "../component/RecentPurchases";

// const getItemsPerSlide = (width) => {
//   const w = width ?? (typeof window !== "undefined" ? window.innerWidth : 1200);
//   if (w >= 1200) return 3;      // xl and up: 3 cards
//   if (w >= 700) return 2;       // 700px to 1199px: 2 cards
//   return 1;                     // below 700px: 1 card
// };

// function DashboardHome() {
//   const navigate = useNavigate();
//   const BASE_URL = "http://development.pilotexaminations.com/";

//   const [subjects, setSubjects] = useState([]);
//   const [comboSubjects, setComboSubjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [user , setUser] = useState("");
//   const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);

//         // Capitalize first letter of name
//         if (parsedUser.name) {
//           parsedUser.name =
//             parsedUser.name.charAt(0).toUpperCase() +
//             parsedUser.name.slice(1);
//         }

//         setUser(parsedUser);
//       } catch {
//         console.warn("Invalid user data in localStorage");
//       }
//     }
//   }, []);
  
  

//   const goTo = (path) => navigate(path);

//   // Fetch both APIs in parallel
//   useEffect(() => {
//     const fetchSubjects = axios.get(`${BASE_URL}api/subjects`);
//     const fetchCombos = axios.get(`${BASE_URL}api/combo-subjects`);

//     Promise.all([fetchSubjects, fetchCombos])
//       .then(([subjectRes, comboRes]) => {
//         if (!subjectRes.data.error) setSubjects(subjectRes.data.data);
//         if (!comboRes.data.error) setComboSubjects(comboRes.data.data);
//       })
//       .catch((err) => console.error("Error loading dashboard data:", err))
//       .finally(() => setLoading(false));
//   }, []);

//   // Update items per slide on resize for responsive carousel grouping
//   useEffect(() => {
//     const handleResize = () => setItemsPerSlide(getItemsPerSlide());
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   if (loading) return <Loader message="Loading dashboard data..." />;

//   // Group subjects per carousel item based on screen size
//   const groupedSubjects = [];
//   for (let i = 0; i < subjects.length; i += itemsPerSlide) {
//     groupedSubjects.push(subjects.slice(i, i + itemsPerSlide));
//   }

//   return (
//     <div className="container-fluid" style={{ backgroundColor: "#f9faf744" }}>
//       {/* Dash Banner */}
//       <DashBanner dashtitle={user.name} />


//       {/* Recent purchage */}

//       <RecentPurchases/>
      

//       {/* Related Subjects */}
//       <div className="related-subjects mt-5">
//         <h3 className="fw-bold my-2 mb-4">Related Subjects</h3>
//         <hr />

//         <Carousel
//           indicators={true}
//           controls={false}
//           interval={3500}
//           pause="hover"
//           className="mt-4 subject-carousel"
//         >
//           {groupedSubjects.map((group, index) => (
//             <Carousel.Item key={index}>
//               <div className="row justify-content-center">
//                 {group.map((subject) => {
//                   // Define subject-specific paths
//                   const paths =
//                     subjectPaths[subject.subject_name] || {
//                       enrollplanPath: "/plans",
//                       viewDetailPath: "/dashboard/my-courses",
//                     };

//                   const topics = subject.description
//                     ? subject.description
//                         .split("/")
//                         .map((t) => t.trim())
//                         .filter(Boolean)
//                     : [];

//                   const topicsToShow = topics.slice(0, 3);
//                   const remainingCount =
//                     topics.length > 3 ? topics.length - 3 : 0;

//                   const columnWidth = `${100 / itemsPerSlide}%`;

//                   return (
//                     <div
//                       className="col-12 mb-3"
//                       key={subject.subject_id}
//                       style={{ flex: `0 0 ${columnWidth}`, maxWidth: columnWidth }}
//                     >
//                       <div className="subject-card h-100 shadow-sm rounded-4">
//                         {/* Header */}
//                         <div
//                           className="subject-header py-4 text-center rounded-top-4"
//                           style={{
//                             backgroundColor: subject.title_color || "#F9F9F9",
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
//                             className="subject-icon mt-2"
//                             width="50"
//                             onError={(e) => (e.target.style.display = "none")}
//                             style={{ height: "50px", width: "50px" }}
//                           />
//                         </div>

//                         {/* Topics */}
//                         <div className="subject-topics p-3">
//                           <div className="row mb-2">
//                             <div className="col-6">
//                               <h6>Topics Covered</h6>
//                             </div>
//                             <div className="col-6 text-end">
//                               <Link
//                                 to={paths.viewDetailPath}
//                                 style={{
//                                   color: "black",
//                                   fontWeight: "bold",
//                                 }}
//                                 className="details-hover"
//                               >
//                                 View Details
//                               </Link>
//                             </div>
//                           </div>
//                           <ul className="ps-3">
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

//                         <hr className="m-0" />

//                         {/* Footer */}
//                         <div className="text-center p-3">
//                           <p
//                             className="mt-3 fw-bold"
//                             style={{ color: "#20ba5c" }}
//                           >
//                             ⚡ Prices Starting at just ₹
//                             {subject.starting_price || 0}
//                           </p>

//                           {/*  Enroll Now */}
//                           <Button
//                             name="Enroll Now"
//                             className="btn-dark fs-6 form-control mb-2 subscribe-button"
//                             onClick={() => goTo(paths.enrollplanPath)}
//                           />

//                           {/* Take Demo MockTest — same as Enroll */}
//                           <button
//                             className="btn btn-link w-100 details-hover"
//                             style={{ color: "black", fontWeight: "500" }}
//                             onClick={() => goTo(paths.viewDetailPath)}
//                           >
//                             Take Demo MockTest
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </Carousel.Item>
//           ))}
//         </Carousel>
//       </div>

//       {/* Start Exploring */}
//       <div
//         className="start-exploring mt-5 py-5 text-center rounded-3"
//         style={{ backgroundColor: "#ffffff" }}
//       >
//         <h4 className="fw-bolder">Take Control of Your Learning</h4>
//         <p className="fw-semibold">
//           Discover subjects and choose your path to DCGA exam success
//         </p>

//         <div className="row align-items-center">
//           <div className="col-sm-4"></div>
//           <div className="col-sm-4 text-center">
//             <Button
//               name="Start Exploring"
//               className="btn-dark btn-lg fs-6 subscribe-button"
//             />
//           </div>
//           <div className="col-sm-4 text-center">
//             <img
//               src={airplane}
//               alt="airplane"
//               style={{ marginTop: "-25px", maxWidth: "100px" }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Combo Subjects */}
//       <div className="dash-combo-subject mt-5">
//         <h3 className="fw-bold my-2 mb-4">Combo Subjects</h3>
//         <hr />
//         <DashComboSubject withSpacing={false} data={comboSubjects} />
//       </div>
//     </div>
//   );
// }

// export default DashboardHome;

import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import DashBanner from "../component/DashBanner";
import DashComboSubject from "../component/DashComboSubject";
import airplane from "../assets/images/airplanflight.png";
import Button from "../component/Button";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import axios from "axios";
import { subjectPaths } from "../assets/subjectPaths";
import Loader from "../component/Loader";
import RecentPurchases from "../component/RecentPurchases";

const getItemsPerSlide = (width) => {
  const w = width ?? (typeof window !== "undefined" ? window.innerWidth : 1200);
  if (w >= 1200) return 3;
  if (w >= 700) return 2;
  return 1;
};

function DashboardHome() {
  const navigate = useNavigate();
  const BASE_URL = "http://development.pilotexaminations.com/";
  const [subjects, setSubjects] = useState([]);
  const [comboSubjects, setComboSubjects] = useState([]);
  const [purchasedSubjects, setPurchasedSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

  // Load User
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        if (parsedUser.name) {
          parsedUser.name =
            parsedUser.name.charAt(0).toUpperCase() +
            parsedUser.name.slice(1);
        }

        setUser(parsedUser);
      } catch {
        console.warn("Invalid user data in localStorage");
      }
    }
  }, []);

  const goTo = (path) => navigate(path);

  // Fetch subjects and combo subjects (POST + user_id)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    let userId = null;

    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        userId = u?.id || u?.user_id || u?.data?.id;
      } catch {
        console.warn("Invalid user data");
      }
    }

    if (!userId) {
      console.error("No user_id found in localStorage");
      setLoading(false);
      return;
    }

    const fetchSubjects = axios.post(`${BASE_URL}api/subjects`, {
      user_id: userId
    });

    const fetchCombos = axios.post(`${BASE_URL}api/combo-subjects`, {
      user_id: userId
    });

    Promise.all([fetchSubjects, fetchCombos])
      .then(([subjectRes, comboRes]) => {
        setSubjects(subjectRes.data.subjects || []);
        setComboSubjects(comboRes.data.subjects || []);
      })
      .catch((err) => console.error("Error loading dashboard data:", err))
      .finally(() => setLoading(false));
  }, []);

  // Update carousel slide count on window resize
  useEffect(() => {
    const handleResize = () => setItemsPerSlide(getItemsPerSlide());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <Loader message="Loading dashboard data..." />;

  // Group subjects per slide
  const groupedSubjects = [];
  for (let i = 0; i < subjects.length; i += itemsPerSlide) {
    groupedSubjects.push(subjects.slice(i, i + itemsPerSlide));
  }

  // Helper function → check if subject is purchased
  const isPurchased = (subjectName) => {
    return purchasedSubjects.some(
      (p) =>
        p.subject_name?.trim().toLowerCase() === subjectName.trim().toLowerCase()
    );
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: "#f9faf744" }}>
      {/* Dash Banner */}
      <DashBanner dashtitle={user.name} />

      {/* Recent Purchases */}
      <RecentPurchases onData={setPurchasedSubjects} />

      {/* Related Subjects */}
      <div className="related-subjects mt-5">
        <h3 className="fw-bold my-2 mb-4">Related Subjects</h3>
        <hr />

        <Carousel
          indicators={true}
          controls={false}
          interval={3500}
          pause="hover"
          className="mt-4 subject-carousel"
        >
          {groupedSubjects.map((group, index) => (
            <Carousel.Item key={index}>
              <div className="row justify-content-center">
                {group.map((subject) => {
                  const paths =
                    subjectPaths[subject.subject_name] || {
                      enrollplanPath: `/plans/enroll_now/${subject.subject_id}`,
                      viewDetailPath: "/dashboard/my-courses",
                    };

                  // FIXED — use new API topics[]
                  const topics = Array.isArray(subject.topics)
                    ? subject.topics
                    : [];

                  const topicsToShow = topics.slice(0, 3);
                  const remainingCount =
                    topics.length > 3 ? topics.length - 3 : 0;

                  const columnWidth = `${100 / itemsPerSlide}%`;
                  const purchased = isPurchased(subject.subject_name);

                  return (
                    <div
                      className="col-12 mb-3"
                      key={subject.subject_id}
                      style={{
                        flex: `0 0 ${columnWidth}`,
                        maxWidth: columnWidth,
                      }}
                    >
                      <div className="subject-card h-100 shadow-sm rounded-4">

                        {/* Header */}
                        <div
                          className="subject-header py-4 text-center rounded-top-4"
                          style={{
                            backgroundColor: subject.title_color || "#F9F9F9",
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
                            src={subject.icon}
                            alt={subject.subject_name}
                            className="subject-icon mt-2"
                            width="50"
                            height="50"
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        </div>

                        {/* Topics */}
                        <div className="subject-topics p-3">
                          <div className="row mb-2">
                            <div className="col-6">
                              <h6>Topics Covered</h6>
                            </div>
                            <div className="col-6 text-end">
                              <Link
                                to={`/dashboard/my-courses/plan/${subject.subject_id}`}
                                style={{ color: "black", fontWeight: "bold" }}
                                className="details-hover"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>

                          <ul className="ps-3">
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

                        <hr className="m-0" />

                        {/* Footer */}
                        <div className="text-center p-3">
                          {!purchased && (
                            <p
                              className="mt-3 fw-bold"
                              style={{ color: "#20ba5c" }}
                            >
                              ⚡ Prices Starting at just ₹
                              {subject.starting_price || 0}
                            </p>
                          )}

                          {purchased ? (
                            <>
                              <Button
                                name="View/Attempt Test"
                                className="btn-dark fs-6 form-control mb-2"
                                 onClick={() => goTo(`/dashboard/my-courses/plan/${subject.subject_id}`)}
                              />

                              <button
                                className="btn btn-link w-100 details-hover"
                                style={{
                                  color: "black",
                                  fontWeight: "500",
                                }}
                                 onClick={() => goTo(`/plans/enroll_now/${subject.subject_id}`)}
                              >
                                Extend Subscription
                              </button>
                            </>
                          ) : (
                            <>
                              <Button
                                name="Enroll Now"
                                className="btn-dark fs-6 form-control mb-2 subscribe-button"
                                onClick={() => goTo(`/plans/enroll_now/${subject.subject_id}`)}
                              />

                              <button
                                className="btn btn-link w-100 details-hover"
                                style={{
                                  color: "black",
                                  fontWeight: "500",
                                }}
                                onClick={() => goTo(`/dashboard/my-courses/plan/${subject.subject_id}`)}
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
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Start Exploring */}
      <div
        className="start-exploring mt-5 py-5 text-center rounded-3"
        style={{ backgroundColor: "#ffffff" }}
      >
        <h4 className="fw-bolder">Take Control of Your Learning</h4>
        <p className="fw-semibold">
          Discover subjects and choose your path to DCGA exam success
        </p>

        <div className="row align-items-center">
          <div className="col-sm-4"></div>
          <div className="col-sm-4 text-center">
            <Button
              name="Start Exploring"
              className="btn-dark btn-lg fs-6 subscribe-button"
            />
          </div>
          <div className="col-sm-4 text-center">
            <img
              src={airplane}
              alt="airplane"
              style={{ marginTop: "-25px", maxWidth: "100px" }}
            />
          </div>
        </div>
      </div>

      {/* Combo Subjects */}
      <div className="dash-combo-subject mt-5">
        <h3 className="fw-bold my-2 mb-4">Combo Subjects</h3>
        <hr />
        <DashComboSubject withSpacing={false} data={comboSubjects} />
      </div>
    </div>
  );
}

export default DashboardHome;
