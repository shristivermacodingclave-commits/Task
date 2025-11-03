// import { NavLink } from "react-router-dom";
// import './Results.css'
// import info from '../assets/images/info.svg'

// function Results() {
//   return (
//     <div className="container-fluid">
//       <h3 className="fw-bold my-2 mb-4 mt-4">Results</h3>
//       <hr />
//       <div className='col-md-12 pt-3 pb-3 ps-4 pe-4 rounded gap-4 d-flex flex-row results-card'>
//         <NavLink to="/results/e-test" className="results-link fw-semibold">
//           E-Test
//         </NavLink>
//         <NavLink to="/results/practice-test" className="results-link fw-semibold">
//           Practice Test
//         </NavLink>
//         <NavLink to="/mock-test/mock-test" className="results-link fw-semibold">
//           Mock Test
//         </NavLink>
//       </div>

//       <div className="col-md-12 ps-4  pb-5 mt-3">
//         <p className='position-relative ' style={{ paddingLeft: "2rem" }}><img src={info} alt="info" className='position-absolute' style={{ left: '0rem' }} /> <b>E-tests</b>&nbsp;are topic wise test from each subject</p>
//       </div>

//     </div>
//   );
// }

// export default Results;


import { NavLink, useOutletContext } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./Results.css";
import info from "../assets/images/info.svg";

function Results() {
  const { setSubBreadcrumb } = useOutletContext(); // ✅ access setter
  const [activeTab, setActiveTab] = useState("E-Test");

  // Update breadcrumb when tab changes
  useEffect(() => {
    setSubBreadcrumb(activeTab);
  }, [activeTab, setSubBreadcrumb]);

  const renderContent = () => {
    switch (activeTab) {
      case "E-Test":
        return (
          <p className="position-relative" style={{ paddingLeft: "2rem" }}>
            <img
              src={info}
              alt="info"
              className="position-absolute"
              style={{ left: "0rem" }}
            />{" "}
            <b>E-tests</b> are topic-wise tests from each subject.
          </p>
        );
      case "Practice Test":
        return (
          <p className="position-relative" style={{ paddingLeft: "2rem" }}>
            <img
              src={info}
              alt="info"
              className="position-absolute"
              style={{ left: "0rem" }}
            />{" "}
            <b>Practice Tests</b> help you revise multiple subjects together.
          </p>
        );
      case "Mock Test":
        return (
          <p className="position-relative" style={{ paddingLeft: "2rem" }}>
            <img
              src={info}
              alt="info"
              className="position-absolute"
              style={{ left: "0rem" }}
            />{" "}
            <b>Mock Tests</b> simulate the real exam environment.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      <h3 className="fw-bold my-2 mb-4 mt-4">Results</h3>
      <hr />
      <div className="col-md-12 pt-3 pb-3 ps-4 pe-4 rounded gap-4 d-flex flex-row results-card">
        <button
          onClick={() => setActiveTab("E-Test")}
          className={`results-link fw-semibold btn bg-transparent border-0 ${
            activeTab === "E-Test" ? "text-primary" : "text-dark"
          }`}
        >
          E-Test
        </button>
        <button
          onClick={() => setActiveTab("Practice Test")}
          className={`results-link fw-semibold btn bg-transparent border-0 ${
            activeTab === "Practice Test" ? "text-primary" : "text-dark"
          }`}
        >
          Practice Test
        </button>
        <button
          onClick={() => setActiveTab("Mock Test")}
          className={`results-link fw-semibold btn bg-transparent border-0 ${
            activeTab === "Mock Test" ? "text-primary" : "text-dark"
          }`}
        >
          Mock Test
        </button>
      </div>

      <div className="col-md-12 ps-4 pb-5 mt-3">{renderContent()}</div>
    </div>
  );
}

export default Results;


