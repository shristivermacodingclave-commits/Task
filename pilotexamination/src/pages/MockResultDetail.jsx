
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./ResultDetail.css";
// import Button from "../component/Button";
// import axios from "axios";
// import { FaUser } from "react-icons/fa";
// import { Link } from "react-router-dom";

// function ResultDetail() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?.id || "";

//   const testId = state?.testId || "";

//   const [testData, setTestData] = useState(null);
//   const [ranking, setRanking] = useState([]);
//   const [userRank, setUserRank] = useState(null);

//   // Fetch test details
//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const res = await axios.post(
//           "https://development.pilotexaminations.com/api/get-mock-test-summary",
//           {
//             user_id: userId,
//             test_id: testId,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         console.log(res);

//         if (!res.data.error) {
//           setTestData(res.data.results[0]);
//         }
//       } catch (e) {
//         console.log("Test Detail Error:", e);
//       }
//     };

//     fetchDetails();
//   }, [testId, userId, token]);

//   // Fetch Ranking (uses userId not testId)
//   useEffect(() => {
//     const fetchRanking = async () => {
//       try {
//         const rankRes = await axios.post(
//           `https://development.pilotexaminations.com/api/get-mock-test-rankings`,
//           {user_id:userId}
//         );

//         if (!rankRes.data.error) {
//           const list = rankRes.data.top_rankers || [];
//           setRanking(list);

//           const found = list.find((r) => r.user_id == userId);
//           if (found) setUserRank(found);
//         }
//       } catch (e) {
//         console.log("Ranking Error:", e);
//       }
//     };

//     fetchRanking();
//   }, [userId]);

//   if (!testData) {
//     return <div className="text-center mt-4"><h5>Loading...</h5></div>;
//   }

//   // dynamic fields
//   const subject = testData.subject_name || "";
//   const topic = testData.topic_name || "";
//   const scorePercent = testData.score_percent || 0;
//   const correct = testData.correct ?? 0;
//   const incorrect = testData.incorrect ?? 0;
//   const unanswered = testData.unanswered ?? 0;
//   const resultLabel = testData.result_status === "0" ? "Fail" : testData.result_status;
//   const passCriteria = testData.pass_criteria || "70%";

//   const scrollToTop = () => {
//     const container = document.querySelector(".dashboard-main");
//     if (container) {
//       container.scrollTo({ top: 0, behavior: "smooth" });
//     } else {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const formatDate = (date) => {
//     const d = new Date(date);
//     return d.toLocaleString("en-IN", {
//       day: "numeric",
//       month: "short",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="container-fluid result-detail-page">

//       {/* HEADER CARD */}
//       <div className="card shadow-sm border-0 mb-4 result-card">
//         <div className="card-body px-0 pt-0 pb-0">

//           <div className="result-top d-flex justify-content-between align-items-center gap-3 px-4 py-4">
//             <div>
//               <p>{subject}</p>
//               <div className="d-flex align-items-center gap-2">
//                 <h2 className="mb-0">{topic}</h2>

//                 <button
//                   className="btn btn-light border rounded-pill px-3 py-1"
//                   onClick={() =>
//                     window.location.assign("/dashboard/my-courses/e-test/plan")
//                   }
//                 >
//                   E-Test
//                 </button>
//               </div>
//             </div>

//             <Button
//               name="View Solution"
//               className="btn-dark px-3 fs-6"
//               onClick={() =>
//                 navigate("/dashboard/results/solution", {
//                   state: {
//                     testId,
//                     subject,
//                     topic,
//                     scorePercent,
//                     correct,
//                     incorrect,
//                     unanswered,
//                     resultLabel,
//                   },
//                 })
//               }
//             />
//           </div>

//           {/* SCORE SECTION */}
//           <div className="result-bottom px-4 py-4">
//             <div className="row g-4 align-items-center">

//               <div className="col-lg-6" style={{ borderRight: "1px solid white" }}>
//                 <p className="mb-2 text-danger">Result</p>

//                 <h4 className={`fw-bold mb-2 ${resultLabel === "Fail" ? "text-danger" : "text-success"}`}>
//                   {resultLabel}
//                 </h4>

//                 <p className="mb-0">
//                   😕 It seems like this test was tough, but keep practicing!
//                 </p>
//               </div>

//               <div className="col-lg-6 d-flex justify-content-start">
//                 <div className="d-flex align-items-center gap-4">
//                   <div className="score-wheel">
//                     <div
//                       className="score-fill"
//                       style={{
//                         background: `conic-gradient(#f65b61 ${scorePercent * 3.6}deg, #f7d9dd 0deg)`
//                       }}
//                     >
//                       <div className="score-center">
//                         <span className="score-value">{scorePercent}%</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="small">
//                     <p className="text-danger mb-2" style={{ fontSize: "1.2rem" }}>Test Score</p>
//                     <p className="fw-bold text-danger mb-1" style={{ fontSize: "1.6rem" }}>
//                       {scorePercent}%
//                     </p>
//                     <p className="mb-0" style={{ maxWidth: "12rem" }}>
//                       Passing criteria {passCriteria}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//             </div>
//           </div>

//         </div>
//       </div>

//       {/* OUTCOME */}
//       <div className="card shadow-sm border-0 mb-4 section-card">
//         <div className="card-body">

//           <h6 className="fw-semibold mb-1">Test Outcome</h6>
//           <p className="text-muted small mb-3">Your Performance Summary</p>

//           <div className="row g-3 align-items-center outcome-row">
//             <div className="col-12 col-md-2 d-flex justify-content-center">
//               <div className="mini-chart">
//                 <div
//                   className="mini-chart-fill"
//                   style={{
//                     background: `conic-gradient(
//                       #7bc29c 0 ${correct * 3.6}deg,
//                       #f65b61 ${correct * 3.6}deg ${(correct + incorrect) * 3.6}deg,
//                       #d9d9d9 ${(correct + incorrect) * 3.6}deg 360deg
//                     )`,
//                     borderRight: "1px solid gray"
//                   }}
//                 />
//               </div>
//             </div>

//             <div className="col-12 col-md-2">
//               <div className="stat-block text-center">
//                 <h2 className="text-success">{correct}</h2>
//                 <p className="text-muted small mb-0">Correct</p>
//               </div>
//             </div>

//             <div className="col-12 col-md-2">
//               <div className="stat-block text-center">
//                 <h2 className="text-danger">{incorrect}</h2>
//                 <p className="text-muted small mb-0">In-Correct</p>
//               </div>
//             </div>

//             <div className="col-12 col-md-2">
//               <div className="stat-block text-center">
//                 <h2 className="text-secondary">{unanswered}</h2>
//                 <p className="text-muted small mb-0">Un-answered</p>
//               </div>
//             </div>

//             <div className="col-12 col-md-4">
//               <div className="stat-block text-center">
//                 <h1 className="mb-0 text-dark">--</h1>
//                 <p className="text-muted small mb-0">Time Spent</p>
//               </div>
//             </div>

//           </div>

//         </div>
//       </div>

//       {/* ---------------- RANKING SECTION ---------------- */}
//       <div className="card shadow-sm border-0 mb-4 section-card">
//         <div className="card-body">

//           <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
//             <div>
//               <h6 className="fw-semibold mb-1">Where Do You Stand?</h6>
//               <p className="text-muted mb-0 small">See where you rank among all the aspirants.</p>
//             </div>

//             <div className="text-muted small d-flex align-items-center gap-2">
//               <span>Ranks refreshed every 3 hours</span>
//               <span className="text-muted">•</span>
//               <span>Last updated just now</span>
//             </div>
//           </div>

//           <div className="table-responsive">
//             <table className="table align-middle mb-0 rank-table">
//               <thead>
//                 <tr className="text-muted small">
//                   <th className="d-none d-md-table-cell"></th>
//                   <th>Rank</th>
//                   <th>% Score</th>
//                   <th>Date</th>
//                   <th>Name</th>
//                   <th>Joined</th>
//                   <th className="d-none d-md-table-cell"></th>
//                 </tr>
//               </thead>

//               <tbody>

//                 {/* TOP 3 */}
//                 {ranking.slice(0, 3).map((r, i) => (
//                   <tr key={i}>
//                     <td className="d-none d-md-table-cell"></td>
//                     <td>{r.rank}</td>
//                     <td>{r.percentage}%</td>
//                     <td>{formatDate(r.test_date)}</td>
//                     <td>{r.name}</td>
//                     <td>Member since {r.member_since}</td>
//                     <td className="d-none d-md-table-cell"></td>
//                   </tr>
//                 ))}

//                 {/* DOTS */}
//                 <tr className="rank-ellipsis text-muted">
//                   <td className="d-none d-md-table-cell"></td>
//                   <td>...</td>
//                   <td>...</td>
//                   <td>...</td>
//                   <td>...</td>
//                   <td>...</td>
//                   <td className="d-none d-md-table-cell"></td>
//                 </tr>

//                 {/* CURRENT USER RANK */}
//                 {userRank && (
//                   <tr className="rank-highlight">
//                     <td className="d-none d-md-table-cell text-start align-middle">
//                       <span className="rank-arrow rank-arrow-left">❬</span>
//                     </td>

//                     <td className="fw-semibold text-danger">{userRank.rank}</td>
//                     <td className="text-danger fw-semibold">{userRank.percentage}%</td>
//                     <td>{formatDate(userRank.test_date)}</td>
//                     <td className="text-danger fw-semibold">{userRank.name}</td>
//                     <td>Member since {userRank.member_since}</td>

//                     <td className="d-none d-md-table-cell text-end align-middle">
//                       <span className="rank-arrow rank-arrow-right">❭</span>
//                     </td>
//                   </tr>
//                 )}

//               </tbody>
//             </table>
//           </div>

//         </div>
//       </div>


//       {/* suggestion */}
//       <div className="card shadow-sm border-0 mb-4 section-card">
//         <div className="card-body">
//           <div className="row g-3">
//             <div className="col-lg-6">
//               <h6 className="fw-semibold mb-3">What’s Next?</h6>
//               <p className="mb-3">Tailored Suggestions for You</p>
//               <p className="mb-3"><FaUser size={25}/> &nbsp;Message from our Captains</p>
//               <div className="suggestion-box p-3  rounded-3">
//                 <p className="mb-2">Hi Anuj Kumar,</p>
//                 <p className="mb-2">
//                   You’ve mastered this test, but there’s always room for growth. Try our advanced level tests.
//                 </p>
//                 <Link className="text-black" to="#" >
//                   Take Another Test &gt;
//                 </Link>
//               </div>
//             </div>

//             <div className="col-lg-6">
//               <div className="d-flex flex-column gap-3 mt-5">
//                 <div>
//                   <p className="fw-semibold mb-2">Explore Learning Resources</p>
//                   <p className="text-muted small mb-1">Study Materials</p>
//                   <div className="resource-card p-3 rounded-3 d-flex align-items-center justify-content-between">
//                     <div className="d-flex align-items-center gap-3">
//                       <div className="resource-icon pdf-icon">PDF</div>
//                       <div>
//                         <p className="mb-0">Air Meterology_RK Bali .pdf</p>
//                         <small className="text-muted">28 Pages · 1.64MB</small>
//                       </div>
//                     </div>
//                     <span className="text-muted">&gt;</span>
//                   </div>
//                 </div>

//                 <div>
//                   <p className="text-muted small mb-1">Videos</p>
//                   <div className="resource-card p-3 rounded-3 d-flex align-items-center justify-content-between">
//                     <div className="d-flex align-items-center gap-3">
//                       <div className="resource-icon youtube-icon">
//                         <span className="triangle" />
//                       </div>
//                       <div>
//                         <p className="mb-0">Understanding Atmosphere</p>
//                         <small className="text-muted">14:23 | by Capt. Lakshya</small>
//                       </div>
//                     </div>
//                     <span className="text-muted">&gt;</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
         

//          {/* Feedback */}
//       <div className="card shadow-sm border-0 mb-4 section-card py-5">
//         <div className="card-body text-center">
//           <h4 className="fw-semibold mb-1">How was your test experience?</h4>
//           <p className="">Your feedback will help us improve your test experience</p>
//           <div className="d-flex justify-content-center gap-2 my-3">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <span key={star} className="star" style={{ fontSize: "4rem" }}>☆</span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* FEEDBACK BUTTON */}
//       <div className="text-center mb-4">
//         <button className="btn btn-dark px-5 back-top-btn py-2" onClick={scrollToTop}>
//           Go to top
//         </button>
//       </div>
             
//     </div>
//   );
// }

// export default ResultDetail;



import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResultDetail.css";
import Button from "../component/Button";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function MockTestResultDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id || "";

  const testId = state?.testId || "";

  const [summary, setSummary] = useState(null);
  const [ranking, setRanking] = useState([]);
  const [userRank, setUserRank] = useState(null);

  /** ---------------- FETCH MOCK TEST SUMMARY ---------------- **/
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.post(
          "https://development.pilotexaminations.com/api/get-mock-test-summary",
          {
            user_id: userId,
            test_id: testId,
          }
        );

        if (!res.data.error) {
          setSummary(res.data.summary);
        }
      } catch (error) {
        console.log("MockTest Summary API Error:", error);
      }
    };

    fetchSummary();
  }, [testId, userId]);

  /** ---------------- FETCH RANKING ---------------- **/
  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const res = await axios.post(
          "https://development.pilotexaminations.com/api/get-mock-test-rankings",
          {
            user_id: userId,
          }
        );

        if (!res.data.error) {
          const list = res.data.top_rankers || [];
          setRanking(list);

          const mine = list.find((r) => r.user_id == userId);
          if (mine) setUserRank(mine);
        }
      } catch (error) {
        console.log("Ranking API Error:", error);
      }
    };

    fetchRankings();
  }, [userId]);

  if (!summary) {
    return (
      <div className="text-center mt-4">
        <h5>Loading...</h5>
      </div>
    );
  }

  /** ---------------- MAP CORRECT FIELDS ---------------- **/
  const subject = summary.subject_name;
  const topic = summary.test_type;
  const scorePercent = summary.score_percent;
  const correct = summary.correct;
  const incorrect = summary.incorrect;
  const unanswered = summary.unanswered;
  const resultLabel = summary.result_status === "0" ? "Fail" : "Pass";
  const totalQuestions = summary.total_questions;
  const passCriteria = summary.pass_criteria;
  const timeSpent = summary.time_spent;

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const scrollToTop = () => {
    const container = document.querySelector(".dashboard-main");
    if (container) container.scrollTo({ top: 0, behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container-fluid result-detail-page">

      {/* HEADER CARD */}
      <div className="card shadow-sm border-0 mb-4 result-card">
        <div className="card-body px-0 pt-0 pb-0">

          <div className="result-top d-flex justify-content-between align-items-center gap-3 px-4 py-4">
            <div>
              <p>{subject}</p>

              <div className="d-flex align-items-center gap-2">
                <h2 className="mb-0">{topic}</h2>

                <button className="btn btn-light border rounded-pill px-3 py-1">
                  Mock Test
                </button>
              </div>
            </div>

            <Button
              name="View Solution"
              className="btn-dark px-3 fs-6"
              onClick={() =>
                navigate("/dashboard/results/mocktest-solution", {
                  state: { testId },
                })
              }
            />
          </div>

          {/* SCORE SECTION */}
          <div className="result-bottom px-4 py-4">
            <div className="row g-4 align-items-center">

              <div className="col-lg-6" style={{ borderRight: "1px solid white" }}>
                <p className="mb-2 text-danger">Result</p>

                <h4
                  className={`fw-bold mb-2 ${
                    resultLabel === "Fail" ? "text-danger" : "text-success"
                  }`}
                >
                  {resultLabel}
                </h4>

                <p className="mb-0">
                  {resultLabel === "Fail"
                    ? "😕 Keep practicing! You can do better."
                    : "🎉 Excellent work! Keep the momentum."}
                </p>
              </div>

              <div className="col-lg-6 d-flex justify-content-start">
                <div className="d-flex align-items-center gap-4">
                  <div className="score-wheel">
                    <div
                      className="score-fill"
                      style={{
                        background: `conic-gradient(#f65b61 ${
                          scorePercent * 3.6
                        }deg, #f7d9dd 0deg)`,
                      }}
                    >
                      <div className="score-center">
                        <span className="score-value">{scorePercent}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="small">
                    <p className="text-danger mb-2">Test Score</p>
                    <p className="fw-bold text-danger mb-1" style={{ fontSize: "1.6rem" }}>
                      {scorePercent}%
                    </p>
                    <p className="mb-0">
                      Passing criteria: {passCriteria}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* OUTCOME */}
      <div className="card shadow-sm border-0 mb-4 section-card">
        <div className="card-body">

          <h6 className="fw-semibold mb-1">Test Outcome</h6>
          <p className="text-muted small mb-3">Your Performance Summary</p>

          <div className="row g-3 align-items-center outcome-row">
            <div className="col-12 col-md-2 d-flex justify-content-center">
              <div className="mini-chart">
                <div
                  className="mini-chart-fill"
                  style={{
                    background: `conic-gradient(
                      #7bc29c 0 ${correct * 3.6}deg,
                      #f65b61 ${correct * 3.6}deg ${(correct + incorrect) * 3.6}deg,
                      #d9d9d9 ${(correct + incorrect) * 3.6}deg 360deg
                    )`,
                  }}
                />
              </div>
            </div>

            <div className="col-4 col-md-2">
              <div className="stat-block text-center">
                <h2 className="text-success">{correct}</h2>
                <p className="text-muted small mb-0">Correct</p>
              </div>
            </div>

            <div className="col-4 col-md-2">
              <div className="stat-block text-center">
                <h2 className="text-danger">{incorrect}</h2>
                <p className="text-muted small mb-0">Incorrect</p>
              </div>
            </div>

            <div className="col-4 col-md-2">
              <div className="stat-block text-center">
                <h2 className="text-secondary">{unanswered}</h2>
                <p className="text-muted small mb-0">Unanswered</p>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="stat-block text-center">
                <h2 className="text-dark">{timeSpent}</h2>
                <p className="text-muted small mb-0">Time Spent</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ---------------- RANKING SECTION ---------------- */}
      <div className="card shadow-sm border-0 mb-4 section-card">
        <div className="card-body">

          <h6 className="fw-semibold mb-2">Where Do You Stand?</h6>
          <p className="text-muted small mb-3">Compare yourself with top aspirants.</p>

          <div className="table-responsive">
            <table className="table align-middle mb-0 rank-table">
              <thead>
                <tr className="text-muted small">
                  <th></th>
                  <th>Rank</th>
                  <th>% Score</th>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Joined</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {ranking.slice(0, 5).map((ranker, index) => (
                  <tr key={index}>
                    <td></td>
                    <td>{ranker.rank}</td>
                    <td>{ranker.percentage}%</td>
                    <td>{formatDate(ranker.test_date)}</td>
                    <td>{ranker.name}</td>
                    <td>{ranker.member_since}</td>
                    <td></td>
                  </tr>
                ))}

                {userRank && (
                  <tr className="rank-highlight">
                    <td></td>
                    <td className="fw-bold text-danger">{userRank.rank}</td>
                    <td className="text-danger fw-bold">{userRank.percentage}%</td>
                    <td>{formatDate(userRank.test_date)}</td>
                    <td className="text-danger fw-bold">{userRank.name}</td>
                    <td>{userRank.member_since}</td>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* SUGGESTION */}
      <div className="card shadow-sm border-0 mb-4 section-card">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-lg-6">
              <h6 className="fw-semibold mb-3">What’s Next?</h6>
              <p className="mb-3">Tailored Suggestions for You</p>
              <p className="mb-3">
                <FaUser size={25} /> &nbsp;Message from our Captains
              </p>
              <div className="suggestion-box p-3 rounded-3">
                <p className="mb-2">Hi {user?.name || "Aspirant"},</p>
                <p className="mb-2">
                  Keep up the practice! Mock Tests help strengthen your concept.
                </p>
                <Link className="text-black" to="#">
                  Take Another Test &gt;
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="d-flex flex-column gap-3 mt-5">
                <div>
                  <p className="fw-semibold mb-2">Explore Learning Resources</p>
                  <p className="text-muted small mb-1">Study Materials</p>
                  <div className="resource-card p-3 rounded-3 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <div className="resource-icon pdf-icon">PDF</div>
                      <div>
                        <p className="mb-0">Air Navigation Guide.pdf</p>
                        <small className="text-muted">20 Pages · 1.2MB</small>
                      </div>
                    </div>
                    <span className="text-muted">&gt;</span>
                  </div>
                </div>

                <div>
                  <p className="text-muted small mb-1">Videos</p>
                  <div className="resource-card p-3 rounded-3 d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <div className="resource-icon youtube-icon">
                        <span className="triangle" />
                      </div>
                      <div>
                        <p className="mb-0">Mock Test Strategy</p>
                        <small className="text-muted">10:42 | by Capt. Lakshya</small>
                      </div>
                    </div>
                    <span className="text-muted">&gt;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEEDBACK */}
      <div className="card shadow-sm border-0 mb-4 section-card py-5">
        <div className="card-body text-center">
          <h4 className="fw-semibold mb-1">How was your mock test experience?</h4>
          <p>Your feedback helps us improve!</p>
          <div className="d-flex justify-content-center gap-2 my-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="star" style={{ fontSize: "4rem" }}>
                ☆
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mb-4">
        <button className="btn btn-dark px-5 back-top-btn py-2" onClick={scrollToTop}>
          Go to top
        </button>
      </div>

    </div>
  );
}

export default MockTestResultDetail;
