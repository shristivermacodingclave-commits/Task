import React, { useState, useEffect } from "react";
import "./ResultSolution.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import Loader from "../component/Loader";

function MockTestSolution() {
  const { state } = useLocation();

  const testId = state?.testId;
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [questions, setQuestions] = useState([]);

  /* ---------------- SAVE CATEGORY STATES ---------------- */
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [categoryList, setCategoryList] = useState([
    "Default",
    "Hard",
    "Medium",
    "Easy",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newListName, setNewListName] = useState("");
  const [savedCategories, setSavedCategories] = useState({});
  const [createError, setCreateError] = useState("");

  /* ---------------- REPORT STATES ---------------- */
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportQid, setReportQid] = useState(null);
  const [reportReason, setReportReason] = useState("");
  const [reportText, setReportText] = useState("");

  /* ---------------- POPUP ---------------- */
  const [openMenuFor, setOpenMenuFor] = useState(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const closePopup = () => setOpenMenuFor(null);
    window.addEventListener("click", closePopup);
    return () => window.removeEventListener("click", closePopup);
  }, []);

  /* ---------------- FETCH MOCK TEST SOLUTION API ---------------- */
  useEffect(() => {
    if (!testId || !userId) return;

    const fetchSolution = async () => {
      try {
        const res = await axios.post(
          "https://development.pilotexaminations.com/api/mock-test/solution",
          { user_id: userId, test_id: testId }
        );

        if (!res.data.error) {
          setSummary(res.data.summary);
          setQuestions(res.data.questions);
        }

        setLoading(false);
      } catch (err) {
        console.log("Mock Test Solution API Error:", err);
        setLoading(false);
      }
    };

    fetchSolution();
  }, [testId, userId]);

  /* ---------------- FETCH SAVED QUESTIONS ---------------- */
  useEffect(() => {
    const fetchSavedList = async () => {
      try {
        const res = await axios.post(
          "https://development.pilotexaminations.com/api/get-save-list",
          { user_id: userId }
        );

        if (!res.data.error) {
          const map = {};
          res.data.results.forEach((item) => {
            map[item.question_id] = item.list_name;
          });
          setSavedCategories(map);
        }
      } catch (err) {
        console.log("Error fetching saved list:", err);
      }
    };

    fetchSavedList();
  }, [userId]);



   if (loading || !summary) return <Loader message="Loading....." />;

  /* ---------------- GO TO TOP ---------------- */
  const scrollToTop = () => {
    const container = document.querySelector(".dashboard-main");
    if (container)
      container.scrollTo({ top: 0, behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------------- SAVE LOGIC ---------------- */
  const openSaveModal = (qid) => {
    setActiveQuestion(qid);
    setSelectedCategory(savedCategories[qid] || "");
    setShowModal(true);
  };

  const closeSaveModal = () => {
    setShowModal(false);
    setActiveQuestion(null);
  };

  const handleSaveCategory = async () => {
    if (!activeQuestion || !selectedCategory) return;

    try {
      await axios.post(
        "https://development.pilotexaminations.com/api/list/save",
        {
          user_id: userId,
          question_id: activeQuestion,
          list_name: selectedCategory,
        }
      );

      setSavedCategories((prev) => ({
        ...prev,
        [activeQuestion]: selectedCategory,
      }));

      closeSaveModal();
    } catch (err) {
      alert("Failed to save! Try again.");
    }
  };

  const handleUnsave = async (qid) => {
    const listName = savedCategories[qid];
    if (!listName) return;

    try {
      await axios.post(
        "https://development.pilotexaminations.com/api/list/unsave",
        {
          user_id: userId,
          list_name: listName,
          question_id: qid,
        }
      );

      setSavedCategories((prev) => {
        const updated = { ...prev };
        delete updated[qid];
        return updated;
      });
    } catch (err) {
      console.error("Unsave API error:", err);
    }
  };

  /* ---------------- REPORT ---------------- */
  const openReportModal = (qid) => {
    setReportQid(qid);
    setShowReportModal(true);
    setOpenMenuFor(null);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
    setReportReason("");
    setReportText("");
  };

  const handleReportSubmit = async () => {
    if (!reportReason || !reportText.trim()) {
      alert("Please select a reason & write your message.");
      return;
    }

    try {
      await axios.post(
        "https://development.pilotexaminations.com/api/report-question",
        {
          user_id: userId,
          question_id: reportQid,
          reason: reportReason,
          explain: reportText,
        }
      );

      alert("Report submitted successfully!");
      closeReportModal();
    } catch (err) {
      console.error("Report API Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="container-fluid result-detail-page">

      {/* SUMMARY CARD */}
      <div className="card shadow-sm border-0 mb-4 result-card">
        <div className="card-body px-0 pt-0 pb-0">
          <div className="result-top d-flex justify-content-between align-items-center flex-wrap gap-3 px-4 py-4">
            <div>
              <p>{summary.subject_name}</p>
              <div className="d-flex gap-2">
                <h3 className="mb-0">{summary.topic_name}</h3>
                <span className="btn btn-light border rounded-pill px-3 py-1">
                  Mock Test
                </span>
              </div>
            </div>
          </div>

          <div className="result-bottom px-4 py-4">
            <div className="row g-4 text-center summary-row">
              <div className="col-6 col-md-3">
                <p
                  className={`fw-bold mb-1 ${
                    summary.result === "0"
                      ? "text-danger"
                      : "text-success"
                  }`}
                  style={{ fontSize: "1.6rem" }}
                >
                  {summary.result === "0" ? "Fail" : "Pass"}
                </p>
                <p className="text-muted small mb-0">Result</p>
              </div>

              <div className="col-6 col-md-3">
                <p
                  className="text-danger fw-bold mb-1"
                  style={{ fontSize: "1.6rem" }}
                >
                  {summary.percentage}%
                </p>
                <p className="text-muted small mb-0">Test Score</p>
              </div>

              <div className="col-6 col-md-2">
                <p className="fw-bold mb-1 text-success">
                  {summary.correct}
                </p>
                <p className="text-muted small mb-0">Correct</p>
              </div>

              <div className="col-6 col-md-2">
                <p className="fw-bold mb-1 text-danger">
                  {summary.incorrect}
                </p>
                <p className="text-muted small mb-0">Incorrect</p>
              </div>

              <div className="col-12 col-md-2">
                <p className="fw-bold mb-1 text-secondary">
                  {summary.unanswered}
                </p>
                <p className="text-muted small mb-0">Unanswered</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= QUESTIONS LIST ================= */}
      {questions.map((q, index) => {
        const userAns = q.user_answer;
        const correctAns = q.correct_answer;

        let status = "Unanswered";
        if (userAns === correctAns) status = "Correct";
        else if (userAns && userAns !== correctAns) status = "Incorrect";

        const headerClass =
          status === "Correct"
            ? "solution-header-correct"
            : status === "Incorrect"
            ? "solution-header-incorrect"
            : "solution-header-unanswered";

        return (
          <div key={q.question_id} className="card mb-3 border-1 solution-card">
            <div
              className={`card-header d-flex justify-content-between ${headerClass}`}
            >
              <div className="d-flex align-items-center gap-2">
                <p className="mb-0 fw-semibold">Question {index + 1}</p>

                <span
                  className={`badge fw-semibold ${
                    status === "Correct"
                      ? "bg-success-subtle text-success"
                      : status === "Incorrect"
                      ? "bg-danger-subtle text-danger"
                      : "bg-secondary-subtle text-secondary"
                  }`}
                >
                  {status}
                </span>
              </div>

              {/* SAVE BUTTON */}
              <div className="d-flex align-items-center gap-3">
                <button
                  type="button"
                  className="btn btn-link text-decoration-none text-muted p-0 d-flex align-items-center gap-1"
                  onClick={() => {
                    if (savedCategories[q.question_id]) {
                      handleUnsave(q.question_id);
                    } else {
                      openSaveModal(q.question_id);
                    }
                  }}
                >
                  {savedCategories[q.question_id] ? (
                    <BsBookmarkFill style={{ fontSize: "18px", color: "black" }} />
                  ) : (
                    <BsBookmark style={{ fontSize: "18px", color: "black" }} />
                  )}
                  <span
                    style={{
                      fontWeight: savedCategories[q.question_id] ? "600" : "400",
                    }}
                  >
                    {savedCategories[q.question_id] ? "Unsave" : "Save"}
                  </span>
                </button>

                {/* 3 DOTS */}
                <span
                  className="three-dots"
                  style={{ cursor: "pointer", fontSize: "22px" }}
                  onClick={(e) => {
                    e.stopPropagation();

                    if (openMenuFor === q.question_id) {
                      setOpenMenuFor(null);
                      return;
                    }

                    const rect = e.target.getBoundingClientRect();
                    setPopupPos({
                      top: rect.bottom + 8,
                      left: rect.right - 180,
                    });

                    setOpenMenuFor(q.question_id);
                  }}
                >
                  ⋯
                </span>
              </div>
            </div>

            {/* REPORT POPUP */}
            {openMenuFor === q.question_id && (
              <div
                className="popup-menu shadow-sm"
                style={{
                  position: "fixed",
                  top: popupPos.top,
                  left: popupPos.left,
                  width: "12rem",
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "0px 6px 6px 6px",
                  zIndex: 99999,
                }}
              >
                <p className="mb-1 fs-6 px-2 py-1">Found some error?</p>

                <div
                  className="d-flex align-items-center report-line py-2 px-2"
                  style={{ cursor: "pointer", backgroundColor: "#d2d2d2ff" }}
                  onClick={() => openReportModal(q.question_id)}
                >
                  <span className="fs-6">Report this question</span>
                </div>
              </div>
            )}

            {/* QUESTION OPTIONS */}
            <div className="card-body">
              <p className="mb-3">{q.question}</p>

              <div className="mb-3 option-list">
                {Object.entries(q.options).map(([key, value]) => {
                  const isUserSelected = key === userAns;
                  const isCorrectOption = key === correctAns;

                  let optionClass = "";
                  if (status === "Correct" && isCorrectOption)
                    optionClass = "option-correct";
                  if (status === "Incorrect") {
                    if (isUserSelected) optionClass = "option-wrong";
                    if (isCorrectOption) optionClass = "option-correct";
                  }
                  if (status === "Unanswered" && isCorrectOption)
                    optionClass = "option-correct";

                  return (
                    <div key={key} className={`option-row ${optionClass}`}>
                      <span className="me-2 fw-semibold">{key}.</span>
                      <span className="fw-semibold">{value}</span>
                    </div>
                  );
                })}
              </div>

              <div className="fw-semibold mb-1">Correct Answer</div>
              <p className="mb-3">{correctAns}</p>

              <div className="fw-semibold mb-1">Explanation</div>
              <p>{q.explanation}</p>

              {q.explanation_img && (
                <img
                  src={q.explanation_img}
                  alt="explanation"
                  className="img-fluid rounded my-2"
                />
              )}
            </div>
          </div>
        );
      })}

      {/* GO TO TOP */}
      <div className="text-center mb-4">
        <button
          className="btn btn-dark px-5 back-top-btn py-2"
          onClick={scrollToTop}
        >
          Go to top
        </button>
      </div>

      {/* SAVE LIST MODAL */}
      {showModal && (
        <div className="save-modal-overlay" onClick={closeSaveModal}>
          <div className="save-modal-box" onClick={(e) => e.stopPropagation()}>
            <h6 className="fw-semibold mb-3">Save to a list</h6>

            {categoryList.map((cat) => (
              <div
                key={cat}
                className="d-flex align-items-center gap-2 mb-2"
              >
                <input
                  type="text"
                  readOnly
                  value={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="form-control"
                  style={{
                    cursor: "pointer",
                    borderColor:
                      selectedCategory === cat ? "#000" : "#ccc",
                  }}
                />

                {cat !== "Default" && (
                  <button className="btn btn-sm btn-outline-dark">
                    Delete
                  </button>
                )}
              </div>
            ))}

            <div className="text-center my-3 text-muted">or</div>

            <input
              type="text"
              className="form-control"
              placeholder="Create new list"
              readOnly
              onClick={() => setShowCreateModal(true)}
            />

            <div className="d-flex justify-content-end mt-4 gap-2">
              <button className="btn btn-light" onClick={closeSaveModal}>
                Cancel
              </button>
              <button
                className="btn btn-dark"
                onClick={handleSaveCategory}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE LIST MODAL */}
      {showCreateModal && (
        <div className="save-modal-overlay">
          <div
            className="save-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h5 className="fw-semibold mb-3">Create List</h5>

            <input
              type="text"
              className="form-control"
              placeholder="Enter list name..."
              value={newListName}
              onChange={(e) => {
                setNewListName(e.target.value);
                setCreateError("");
              }}
            />

            {createError && (
              <p className="text-danger small mt-2">{createError}</p>
            )}

            <div className="text-end mt-3">
              <button
                className="btn btn-dark"
                onClick={() => {
                  const name = newListName.trim();
                  if (!name) {
                    setCreateError("List name cannot be empty");
                    return;
                  }
                  if (
                    categoryList.some(
                      (c) => c.toLowerCase() === name.toLowerCase()
                    )
                  ) {
                    setCreateError("List already exists");
                    return;
                  }
                  setCategoryList([...categoryList, name]);
                  setSelectedCategory(name);
                  setShowCreateModal(false);
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REPORT MODAL */}
      {showReportModal && (
        <div className="save-modal-overlay" onClick={closeReportModal}>
          <div
            className="save-modal-box"
            style={{ maxWidth: "650px", width: "95%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between mb-3">
              <h5 className="fw-semibold">Report Question</h5>
              <button
                className="btn p-0 border-0 bg-transparent fs-4"
                onClick={closeReportModal}
              >
                &times;
              </button>
            </div>

            <p className="fw-semibold">Reason for reporting</p>

            <div className="d-flex flex-column gap-2 mb-3">
              {[
                "Question phrased incorrectly",
                "Wrong Options",
                "Wrong Solution",
              ].map((reason) => (
                <label key={reason} className="d-flex gap-2">
                  <input
                    type="radio"
                    name="reportReason"
                    value={reason}
                    checked={reportReason === reason}
                    onChange={(e) => setReportReason(e.target.value)}
                  />
                  {reason}
                </label>
              ))}
            </div>

            <label className="fw-semibold mb-1">Explain your issue*</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Write your reason..."
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
            ></textarea>

            <div className="d-flex gap-3 mt-4">
              <button
                className="btn btn-dark w-100"
                onClick={handleReportSubmit}
              >
                Submit Report
              </button>
              <button
                className="btn btn-light border w-100"
                onClick={closeReportModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MockTestSolution;
