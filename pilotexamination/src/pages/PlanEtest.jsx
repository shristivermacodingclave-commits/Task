import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PlanEtest.css";

const DEFAULT_SUBJECT = "Air Regulation";
const DEFAULT_TOPIC = "International Organisations and Conventions";
const DEFAULT_TYPE = "E-Test";

const STATUS_TAGS = [
  { key: "attempted", label: "Green for attempted" },
  { key: "unattempted", label: "Yellow for unattempted" },
  { key: "unvisited", label: "White for unvisited questions" },
];

function PlanEtest() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const {
    subject = DEFAULT_SUBJECT,
    topic = DEFAULT_TOPIC,
    testType = DEFAULT_TYPE,
    planPath = null,
  } = location.state || {};

  const handleGoToPlan = () => {
    if (planPath) {
      navigate(planPath);
    } else {
      navigate("/dashboard/my-courses");
    }
  };

  const instructions = useMemo(
    () => [
      "The time remaining to complete the exam is displayed on your screen and at the top-right corner of your screen. When the time runs out, your exam ends.",
      "The Questions palette at the right of the screen has one of the following statuses for each of the numbered questions.",
      <>
        To answer a question, click the number on the question palette at the
        right of your screen or at the top of your screen (if you are in phone
        mode). You will be taken to that numbered question.
      </>,
      <>
        To read the entire paper, click on the <strong>All Questions</strong>{" "}
        button.
      </>,
      <>
        Change your responses by selecting a question and then clicking on the
        new answer choice followed by a click on <strong>Confirm</strong>.
      </>,
      <>
        Click <strong>Reset</strong> to clear your selected response.
      </>,
      <>
        <strong>Next</strong> and <strong>Previous</strong> buttons are provided
        so that you may navigate the test.
      </>,
    ],
    []
  );

  const handleStartTest = () => {
    if (!isConfirmed) return;
    const testId = location.state?.topicId || "demo-test";
    navigate(`/test_question?quest_no=1&test_id=${testId}`, {
      state: { subject, topic, topicId: location.state?.topicId, planPath },
    });
  };

  return (
    <div className="view-details">
      <div className="view-details__card">
        <div className="view-details__card-header">
          <div>
            <h2>{topic}</h2>
            <p className="view-details__subtitle">General Instructions</p>
          </div>
          <button
            type="button"
            className="view-details__tag"
            onClick={handleGoToPlan}
          >
            {testType}
          </button>
        </div>

        <ol className="view-details__instructions">
          {instructions.map((instruction, index) => (
            <li key={`instruction-${index}`}>
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

        <label className="view-details__confirm">
          <input
            type="checkbox"
            checked={isConfirmed}
            onChange={(event) => setIsConfirmed(event.target.checked)}
          />
          <span>
            I have thoroughly reviewed all the instructions, and I&apos;m ready
            to proceed with answering my test.
          </span>
        </label>

        <button
          type="button"
          className="view-details__start"
          disabled={!isConfirmed}
          onClick={handleStartTest}
        >
          Start E-Test
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

export default PlanEtest;
