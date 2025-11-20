// import Button from '../component/Button'
// import { NavLink } from 'react-router-dom';
// import info from '../assets/images/info.svg'

// function ReportedQuestion() {
//   return (
//     <div className="container-fluid">
//       <h3 className="fw-bold my-2 mb-4 mt-4">Reported Question</h3>
//       <hr />

//       {/* Nav Links */}
//       <div className="col-md-12 pt-3 pb-3 ps-4 pe-4 mb-4 rounded gap-4 d-flex flex-row results-card">
//         <NavLink to="index" className="results-link fw-semibold">
//           All
//         </NavLink>
//         <NavLink to="resolved" className="results-link fw-semibold">
//           Resolved
//         </NavLink>
//         <NavLink to="under-review" className="results-link fw-semibold">
//           Under Review
//         </NavLink>
//       </div>

//       {/* Search Bar */}
//       <div className="col-md-12 pt-3 pb-3 ps-4 pe-4 mb-4 rounded gap-4 d-flex flex-row results-card">
//          <div className="col-md-8 ">
//           <input
//           type="text"
//           placeholder="Search"
//           className="form-control mt-1 p-2 report-input"
//           style={{border:"1px solid black"}}
//         />
//          </div>
//           <div className="col-md-4 pe-4">
//               <Button name="Search" className="btn-dark form-control" />
//           </div>
//       </div>

//       <div className="col-md-12 ps-4  pb-5">
//         <p className='position-relative ' style={{paddingLeft:"2rem"}}><img src={info} alt="info" className='position-absolute' style={{left:'0rem'}} />To report any question, please go to the Result sectio and click on the triple dot.</p>
//       </div>

//       {/* Bottom Button Centered */}
//       <div className="row">

//         <div className="col-4"></div>
//         <div className="col-4">
//           <Button
//           name="Go to top"
//           className="btn-dark form-control w-100"
//         />
//         </div>
//         <div className="col-4"></div>

//       </div>
//     </div>
//   );
// }

// export default ReportedQuestion;



import React, { useEffect, useState } from "react";
import Button from "../component/Button";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import info from "../assets/images/info.svg";

function ReportedQuestion() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const location = useLocation();
  const activeTab = location.pathname.split("/").pop();
  // values → index / resolved / under-review

  // ------------------------------------------------------------
  // FETCH REPORTED QUESTIONS FROM API
  // ------------------------------------------------------------
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(
          `https://development.pilotexaminations.com/api/reports/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.data.error) {
          setReports(res.data.reports);
          setFilteredReports(res.data.reports);
        }
      } catch (err) {
        console.log("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [userId, token]);

  // ------------------------------------------------------------
  // FILTER REPORTS BASED ON ACTIVE TAB
  // ------------------------------------------------------------
  useEffect(() => {
    if (activeTab === "resolved") {
      setFilteredReports(reports.filter((r) => r.report_status === "resolved"));
    } else if (activeTab === "under-review") {
      setFilteredReports(reports.filter((r) => r.report_status === "under review"));
    } else {
      setFilteredReports(reports); // ALL
    }
  }, [activeTab, reports]);

  if (loading) {
    return (
      <div className="container-fluid text-center mt-4">
        <h5>Loading...</h5>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <h3 className="fw-bold my-2 mb-4 mt-4">Reported Question</h3>
      <hr />

      {/* Nav Links */}
      <div className="col-md-12 pt-3 pb-3 ps-4 pe-4 mb-4 rounded gap-4 d-flex flex-row results-card">

        <NavLink
          to="index"
          className={`results-link fw-semibold ${activeTab === "index" ? "active-tab" : ""}`}
        >
          All
        </NavLink>

        <NavLink
          to="resolved"
          className={`results-link fw-semibold ${activeTab === "resolved" ? "active-tab" : ""}`}
        >
          Resolved
        </NavLink>

        <NavLink
          to="under-review"
          className={`results-link fw-semibold ${activeTab === "under-review" ? "active-tab" : ""}`}
        >
          Under Review
        </NavLink>

      </div>

      {/* Search Bar */}
      <div className="col-md-12 pt-3 pb-3 ps-4 pe-4 mb-4 rounded gap-4 d-flex flex-row results-card">
        <div className="col-md-8">
          <input
            type="text"
            placeholder="Search"
            className="form-control mt-1 p-2 report-input"
            style={{ border: "1px solid black" }}
            onChange={(e) => {
              const keyword = e.target.value.toLowerCase();
              setFilteredReports(
                reports.filter((r) =>
                  r.question.title.toLowerCase().includes(keyword)
                )
              );
            }}
          />
        </div>

        <div className="col-md-4 pe-4">
          <Button name="Search" className="btn-dark form-control" />
        </div>
      </div>

      <div className="col-md-12 ps-4 pb-5">
        <p
          className="position-relative"
          style={{ paddingLeft: "2rem" }}
        >
          <img
            src={info}
            alt="info"
            className="position-absolute"
            style={{ left: "0rem" }}
          />
          To report any question, please go to the Result section and click on the triple dot.
        </p>
      </div>

      {/* ---------------- LIST OF REPORTED QUESTIONS ---------------- */}
      <div className="col-md-12 ps-4 pe-4">

        {filteredReports.length === 0 ? (
          <h5 className="text-center text-muted">No Reported Questions</h5>
        ) : (
          filteredReports.map((r) => (
            <div
              key={r.report_id}
              className="p-4 mb-4 rounded shadow-sm"
              style={{ background: "#fff", border: "1px solid #eee" }}
            >
              <div className="d-flex justify-content-between">
                <p className="fw-bold mb-1">Report ID: {r.report_id}</p>
              </div>

              <h5 className="fw-semibold mt-3">{r.question.title}</h5>

              <p className="mb-1"><b>Reason:</b> {r.reason}</p>
              <p className="mb-1"><b>Description:</b> {r.explain}</p>

              <p className="mt-3 fw-semibold mb-1">Correct Answer</p>
              <p>{r.question.correct_answer}</p>

              <p className="fw-semibold mb-1">Explanation</p>
              <p className="mb-0">{r.question.explanation}</p>

              <p className="text-muted mt-2 small">
                Reported at: {r.report_time}
              </p>

              {/* STATUS BOX */}
              <div
                className="mt-4 p-3"
                style={{
                  background: "#FDEFE3",
                  borderRadius: "6px",
                  border: "1px solid #F3D3B5"
                }}
              >
                <div className="d-flex align-items-center gap-2">
                  <span className="fw-bold">Status :</span>

                  {r.report_status === "under review" && (
                    <span style={{ color: "#d48806", fontWeight: "600" }}>
                      🟠 Under Review
                    </span>
                  )}

                  {r.report_status === "resolved" && (
                    <span style={{ color: "#0F9D58", fontWeight: "600" }}>
                      🟢 Resolved
                    </span>
                  )}
                </div>

                {/* MESSAGE */}
                <p className="mt-2 mb-0" style={{ fontSize: "0.95rem" }}>
                  {r.report_status === "under review" &&
                    "We are working on your query, Team will update once the query is resolved."}

                  {r.report_status === "resolved" &&
                    (r.comment
                      ? r.comment
                      : "Your query has been resolved by our team.")}
                </p>
              </div>



              
            </div>
          ))
        )}
      </div>

      {/* Bottom Button Center */}
      <div className="row mt-4 mb-5">
        <div className="col-4"></div>
        <div className="col-4">
          <Button name="Go to top" className="btn-dark form-control w-100 py-2" />
          
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}

export default ReportedQuestion;

