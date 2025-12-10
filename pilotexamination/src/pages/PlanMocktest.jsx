import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./PlanMocktest.css"; // same styling as Etest
import axios from "axios";
import clock from '../assets/images/clock.svg'
const STATUS_TAGS = [
  { key: "attempted", label: "Green for attempted" },
  { key: "unattempted", label: "Yellow for unattempted" },
  { key: "unvisited", label: "White for unvisited questions" },
];

export default function PlanMocktest() {
  const navigate = useNavigate();
  const location = useLocation();
  const { planId } = useParams();

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = storedUser?.id;

  const {
    subjectId = planId,
    subjectName = "Air Navigation",
    testType = "Mock Test",
    planPath = "/dashboard/my-courses",
  } = location.state || {};

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [wantTimer, setWantTimer] = useState(true);
  const [totalQuestions, setTotalQuestions] = useState(0);

  // Load total questions BEFORE starting test
  useEffect(() => {
    if (!subjectId) return;

    axios
      .post("https://development.pilotexaminations.com/api/mock/start", {
        user_id: userId,
        subject_id: subjectId,
      })
      .then((res) => {
        if (!res.data.error) {
          setTotalQuestions(res.data.total_questions || 0);
        }
      })
      .catch(() => { });
  }, [subjectId]);

  const instructions = useMemo(
    () => [
      "The time remaining to complete the exam is displayed on your screen and at the top-right corner of your screen. When the time runs out, your exam ends",
      "The Questions palette at the right of the screen has one of the following statuses for each of the numbered questions",
      <>To answer a question, click the number on the question palette at the right of your screen or at the top of your screen (if you are in phone mode). You will be taken to that numbered question</>,
      <>To read the entire paper, click on the <strong>All Questions</strong> button.</>,
      <>Change your responses by selecting a question and then clicking on the new answer choice followed by a click on Confirm.</>,
      <>Click <strong>Reset</strong> to clear your selected response.</>,
      <>Use <strong>Next</strong> and <strong>Previous</strong> buttons to navigate.</>,
    ],
    []
  );

  const handleStartMockTest = async () => {
    if (!isConfirmed) return;

    try {
      const res = await axios.post(
        "https://development.pilotexaminations.com/api/mock/start",
        {
          user_id: userId,
          subject_id: subjectId,
        }
      );

      if (!res.data || res.data.error) {
        alert("Could not start mock test");
        return;
      }

      const attempt_id = res.data.test_id;


      // CLEAR ALL OLD TEST DATA
      localStorage.removeItem("questions");
      localStorage.removeItem("attempt_id");
      localStorage.removeItem("topic_id");
      localStorage.removeItem("test_type");

      localStorage.removeItem("practice_questions");
      localStorage.removeItem("practice_test_id");
      localStorage.removeItem("mini_subject_id");

      // Important: Clear old mock data
      localStorage.removeItem("mock_questions");
      localStorage.removeItem("mock_attempt_id");


      localStorage.setItem("mock_attempt_id", attempt_id);
      localStorage.setItem("mock_questions", JSON.stringify(res.data.questions));
      localStorage.setItem("test_type", "mock");





      navigate(
        `/test_question/mock_test?quest_no=1&attempt_id=${attempt_id}`,
        {
          state: {
            subjectName,
            subjectId,
            testType,
            questions: res.data.questions,
            attemptId: attempt_id,
            planPath,
            userId,
            wantTimer,
            totalQuestions,
          },
        }
      );
    } catch (e) {
      alert("Something went wrong.");
    }
  };

  return (
    <div className="view-details">
      <div className="view-details__card">

        {/* HEADER */}
        <div className="view-details__card-header">
          <div>
            <h2>{subjectName}</h2>
            <p className="view-details__subtitle">General Instructions</p>
          </div>

          <button
            type="button"
            className="view-details__tag"
            onClick={() => navigate(planPath)}
          >
            {testType}
          </button>
        </div>

        {/* INSTRUCTIONS */}
        <ol className="view-details__instructions">
          {instructions.map((instruction, index) => (
            <li key={index}>
              <p>{instruction}</p>

              {index === 1 && (
                <div className="view-details__legend">
                  {STATUS_TAGS.map((status) => (
                    <div
                      key={status.key}
                      className={`view-details__legend-item view-details__legend-item--${status.key}`}
                    >
                      <span className="view-details__legend-swatch" />
                      <span>{status.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>

        {/* TIME + TOTAL QUESTIONS (Matching Screenshot) */}
        <div className="view-details__info-row">
          <div className="view-details__info-item">
            <p className="view-details__info-label">⏱ Time Allotted</p>
            <p className="view-details__info-value">3 Hours</p>
          </div>

          <div className="view-details__info-item">
            <p className="view-details__info-label">📝 Total Questions</p>
            <p className="view-details__info-value">{totalQuestions}</p>
          </div>
        </div>

        {/* TIMER OPTION BOX */}
        <div className="view-details__timer-box">

          {/* You will paste your clock image here */}
          <div className="view-details__timer-icon">
            <img src={clock} alt="" />
          </div>

          <div className="view-details__timer-content">
            <p className="view-details__timer-title">
              Would you like to keep 15 seconds timer delay text on each question
              (Similar pattern to DGCA actual exam)
            </p>

            <div className="view-details__timer-options">
              <label className="view-details__timer-option">
                <input
                  type="radio"
                  name="timer"
                  checked={wantTimer}
                  onChange={() => setWantTimer(true)}
                />
                Yes, Keep 15 secs Timer
              </label>

              <label className="view-details__timer-option">
                <input
                  type="radio"
                  name="timer"
                  checked={!wantTimer}
                  onChange={() => setWantTimer(false)}
                />
                No, I don't want Timer
              </label>
            </div>
          </div>
        </div>

        {/* CONFIRM CHECKBOX */}
        <label className="view-details__confirm">
          <input
            type="checkbox"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
          />
          <span>I have reviewed all instructions and I’m ready.</span>
        </label>

        {/* START BUTTON */}
        <button
          type="button"
          className="view-details__start"
          disabled={!isConfirmed}
          onClick={handleStartMockTest}
        >
          Start Mock Test →
        </button>
      </div>
    </div>
  );
}
