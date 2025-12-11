// import InfoText from "../../component/InfoText";

// export default function PracticeTest() {
//   return (
//     <>
//       <InfoText title="Practice Tests" text="help you revise all topics" />
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import InfoText from "../../component/InfoText";
import Button from "../../component/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

export default function PracticeTest() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).id : null;

  // Format date like "12 March 2024"
  const formatDate = (dateString) => {
    const months = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ];
    const d = new Date(dateString);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (!userId) return;

      try {
        const response = await axios.post(
          "https://development.pilotexaminations.com/api/practice-test/results",
          { user_id: userId },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (!response.data.error && Array.isArray(response.data.practice_tests)) {
          const formatted = response.data.practice_tests.map((item) => ({
            testId: item.test_id,
            topic: item.topic_name || "—",
            subject: item.subject_name,
            result: item.result === "0" ? "Fail" : item.result,
            percentage: item.percentage,
            examDate: formatDate(item.exam_date),
          }));

          setResults(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch practice test results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) return <Loader message="Loading practice test results....." />;

  return (
    <div className="container-fluid mt-4">
      <InfoText
        title="Practice Tests"
        text="are subject-wise practice assessments"
      />

      {results.length === 0 && (
        <p className="text-center text-muted mt-4">No practice test results found.</p>
      )}

      {results.map((item, index) => (
        <div
          key={index}
          className="p-4 my-4 shadow-sm rounded"
          style={{ background: "#fff", border: "1px solid #eee" }}
        >
          {/* DESKTOP VIEW (same as Etest) */}
          <div className="d-none d-md-block">
            <div className="row align-items-center mb-3">
              <div className="col-md-3">
                <p className="fw-semibold mb-1">Topic</p>
                <p className="mb-0 fw-bold">{item.topic}</p>
              </div>

              <div className="col-md-2">
                <p className="fw-semibold mb-1">Result</p>
                <span
                  style={{
                    backgroundColor: "#ffe5e5",
                    color: "#d60000",
                    borderRadius: "4px",
                    fontSize: "14px",
                    padding: "0.3rem 0.8rem",
                  }}
                >
                  {item.result}
                </span>
              </div>

              <div className="col-md-2">
                <p className="fw-semibold mb-1">Percentage</p>
                <p className="mb-0">{item.percentage}%</p>
              </div>

              <div className="col-md-2">
                <p className="fw-semibold mb-1">Exam Date</p>
                <p className="mb-0">{item.examDate}</p>
              </div>

              <div className="col-md-3 text-end">
                <Button
                  name="Result"
                  className="btn-dark fs-6 px-5 w-100"
                  onClick={() =>
                    navigate("/dashboard/results/practice-detail", {
                      state: {
                        testId: item.testId,
                        subject: item.subject,
                        topic: item.topic,
                        percentage: item.percentage,
                        result: item.result,
                        examDate: item.examDate,
                      },
                    })
                  }
                />
              </div>
            </div>

            <hr />
            <p className="text-muted mb-0">Subject: {item.subject}</p>
          </div>

          {/* MOBILE VIEW (same as Etest) */}
          <div className="d-block d-md-none">
            <p className="fw-semibold mb-1">Topic</p>
            <p>{item.topic}</p>

            <p className="fw-semibold mb-1 mt-2">Result</p>
            <span
              className="px-3 py-2 mb-3"
              style={{ backgroundColor: "#ffe5e5", color: "#d60000", borderRadius: "4px" }}
            >
              {item.result}
            </span>

            <p className="fw-semibold mb-1">Percentage</p>
            <p>{item.percentage}%</p>

            <p className="fw-semibold mb-1">Exam Date</p>
            <p>{item.examDate}</p>

            <button
              className="btn btn-dark w-100 my-3"
              onClick={() =>
                navigate("/dashboard/results/practice-detail", {
                  state: {
                    subject: item.subject,
                    topic: item.topic,
                    percentage: item.percentage,
                    result: item.result,
                    examDate: item.examDate,
                  },
                })
              }
            >
              Result
            </button>

            <hr />
            <p className="text-muted mb-0">Subject: {item.subject}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
