// import React, { useMemo, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./PlanEtest.css";
// import { useParams } from "react-router-dom";


// const DEFAULT_SUBJECT = "Air Regulation";
// const DEFAULT_TOPIC = "International Organisations and Conventions";
// const DEFAULT_TYPE = "E-Test";

// const STATUS_TAGS = [
//   { key: "attempted", label: "Green for attempted" },
//   { key: "unattempted", label: "Yellow for unattempted" },
//   { key: "unvisited", label: "White for unvisited questions" },
// ];

// function PlanEtest() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { planId } = useParams();

//   const [isConfirmed, setIsConfirmed] = useState(false);

//   const {
//     subject = DEFAULT_SUBJECT,
//     topic = DEFAULT_TOPIC,
//     testType = DEFAULT_TYPE,
//     planPath = null,
//   } = location.state || {};

//   const handleGoToPlan = () => {
//     if (planPath) {
//       navigate(planPath);
//     } else {
//       navigate("/dashboard/my-courses");
//     }
//   };

//   const instructions = useMemo(
//     () => [
//       "The time remaining to complete the exam is displayed on your screen and at the top-right corner of your screen. When the time runs out, your exam ends.",
//       "The Questions palette at the right of the screen has one of the following statuses for each of the numbered questions.",
//       <>
//         To answer a question, click the number on the question palette at the
//         right of your screen or at the top of your screen (if you are in phone
//         mode). You will be taken to that numbered question.
//       </>,
//       <>
//         To read the entire paper, click on the <strong>All Questions</strong>{" "}
//         button.
//       </>,
//       <>
//         Change your responses by selecting a question and then clicking on the
//         new answer choice followed by a click on <strong>Confirm</strong>.
//       </>,
//       <>
//         Click <strong>Reset</strong> to clear your selected response.
//       </>,
//       <>
//         <strong>Next</strong> and <strong>Previous</strong> buttons are provided
//         so that you may navigate the test.
//       </>,
//     ],
//     []
//   );

//   // const handleStartTest = () => {
//   //   if (!isConfirmed) return;
//   //   const testId = location.state?.topicId || "demo-test";
//   //   navigate(`/test_question?quest_no=1&test_id=${testId}`, {
//   //     state: { subject, topic, topicId: location.state?.topicId, planPath },
//   //   });
//   // };


//   const handleStartTest = async () => {
//   if (!isConfirmed) return;

//   const topicId = location.state?.topicId;
//   const userId = location.state?.userId || 10; // or wherever your user id comes from

//   try {
//     // 1️⃣ Call start-test API here
//     const res = await axios.post(
//       "https://development.pilotexaminations.com/api/start-test",
//       {
//         user_id: userId,
//         topic_id: topicId,
//       }
//     );

//     if (!res.data || res.data.error) {
//       alert("Failed to start test");
//       return;
//     }

//     // 2️⃣ Get attempt_id from backend
//     const attempt_id = res.data.attempt_id;

//     // 3️⃣ Navigate with SAME URL format but correct data
//     navigate(`/test_question?quest_no=1&test_id=${attempt_id}`, {
//       state: {
//         subject,
//         topic,
//         topicId,
//         planPath,
//       },
//     });
//   } catch (err) {
//     console.error("start-test failed:", err);
//     alert("Something went wrong starting test");
//   }
// };


//   return (
//     <div className="view-details">
//       <div className="view-details__card"><Route path="/test_question" element={<MainLayout />}>
//           <Route index element={<EtestAttempt />} />
//         </Route>
//         <div className="view-details__card-header">
//           <div>
//             <h2>{topic}</h2>
//             <p className="view-details__subtitle">General Instructions</p>
//           </div>
//           <button
//             type="button"
//             className="view-details__tag"
//             onClick={handleGoToPlan}
//           >
//             {testType}
//           </button>
//         </div>

//         <ol className="view-details__instructions">
//           {instructions.map((instruction, index) => (
//             <li key={`instruction-${index}`}>
//               <p>{instruction}</p>
//               {index === 1 && (
//                 <div className="view-details__legend">
//                   {STATUS_TAGS.map((status) => (
//                     <div
//                       key={status.key}
//                       className={`view-details__legend-item view-details__legend-item--${status.key}`}
//                     >
//                       <span className="view-details__legend-swatch" />
//                       <span>{status.label}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </li>
//           ))}
//         </ol>

//         <label className="view-details__confirm">
//           <input
//             type="checkbox"
//             checked={isConfirmed}
//             onChange={(event) => setIsConfirmed(event.target.checked)}
//           />
//           <span>
//             I have thoroughly reviewed all the instructions, and I&apos;m ready
//             to proceed with answering my test.
//           </span>
//         </label>

//         <button
//           type="button"
//           className="view-details__start"
//           disabled={!isConfirmed}
//           onClick={handleStartTest}
//         >
//           Start E-Test
//           <span aria-hidden="true">→</span>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default PlanEtest;




// import React, { useMemo, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import "./PlanEtest.css";
// import axios from "axios";

// const DEFAULT_SUBJECT = "Air Regulation";
// const DEFAULT_TOPIC = "International Organisations and Conventions";
// const DEFAULT_TYPE = "E-Test";

// const STATUS_TAGS = [
//   { key: "attempted", label: "Green for attempted" },
//   { key: "unattempted", label: "Yellow for unattempted" },
//   { key: "unvisited", label: "White for unvisited questions" },
// ];

// export default function PlanEtest() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { planId } = useParams(); // ← important fix

//   const [isConfirmed, setIsConfirmed] = useState(false);

//   // safely read state, fallback if state missing (on refresh)
//   const {
//     subject = DEFAULT_SUBJECT,
//     topic = DEFAULT_TOPIC,
//     testType = DEFAULT_TYPE,
//     topicId: stateTopicId,
//     planPath = null,
//     userId = 10,
//   } = location.state || {};

//   // final_topicId = from state OR from URL param
//   const finalTopicId = stateTopicId || planId;

//   const instructions = useMemo(
//     () => [
//       "The time remaining to complete the exam is displayed on your screen and at the top-right corner of your screen. When the time runs out, your exam ends.",
//       "The Questions palette at the right of the screen has one of the following statuses for each of the numbered questions.",
//       <>
//         To answer a question, click the number on the question palette at the
//         right of your screen or at the top of your screen (if you are in phone
//         mode). You will be taken to that numbered question.
//       </>,
//       <>
//         To read the entire paper, click on the <strong>All Questions</strong> button.
//       </>,
//       <>
//         Change your responses by selecting a question and then clicking on the new answer choice followed by a click on <strong>Confirm</strong>.
//       </>,
//       <>
//         Click <strong>Reset</strong> to clear your selected response.
//       </>,
//       <>
//         <strong>Next</strong> and <strong>Previous</strong> buttons are provided so that you may navigate the test.
//       </>,
//     ],
//     []
//   );

//   const handleGoToPlan = () => {
//     if (planPath) navigate(planPath);
//     else navigate("/dashboard/my-courses");
//   };

//   // ⭐ FIXED — Start Test Correctly
//   const handleStartTest = async () => {
//     if (!isConfirmed) return;

//     try {
//       // Start-test API must use correct topic_id
//       const res = await axios.post(
//         "https://development.pilotexaminations.com/api/start-test",
//         {
//           user_id: userId,
//           topic_id: finalTopicId, // ← FIXED topic ID
//         }
//       );

//       if (!res.data || res.data.error) {
//         alert("Failed to start test");
//         return;
//       }

//       // Get attempt ID
//       const attempt_id = res.data.attempt_id;

//       // Navigate to test question page
//       navigate(`/test_question?quest_no=1&test_id=${attempt_id}`, {
//         state: {
//           subject,
//           topic,
//           topicId: finalTopicId,
//           planPath,
//           questions: res.data.questions,
//         },
//       });

      
//     } catch (err) {
//       console.error("start-test failed:", err);
//       alert("Something went wrong starting test");
//     }
//   };


//   return (
//     <div className="view-details">
//       <div className="view-details__card">

//         {/* HEADER */}
//         <div className="view-details__card-header">
//           <div>
//             <h2>{topic}</h2>
//             <p className="view-details__subtitle">General Instructions</p>
//           </div>
//           <button
//             type="button"
//             className="view-details__tag"
//             onClick={handleGoToPlan}
//           >
//             {testType}
//           </button>
//         </div>

//         {/* INSTRUCTIONS */}
//         <ol className="view-details__instructions">
//           {instructions.map((instruction, index) => (
//             <li key={index}>
//               <p>{instruction}</p>

//               {index === 1 && (
//                 <div className="view-details__legend">
//                   {STATUS_TAGS.map((status) => (
//                     <div
//                       key={status.key}
//                       className={`view-details__legend-item view-details__legend-item--${status.key}`}
//                     >
//                       <span className="view-details__legend-swatch" />
//                       <span>{status.label}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </li>
//           ))}
//         </ol>

//         {/* CONFIRM CHECKBOX */}
//         <label className="view-details__confirm">
//           <input
//             type="checkbox"
//             checked={isConfirmed}
//             onChange={(e) => setIsConfirmed(e.target.checked)}
//           />
//           <span>
//             I have thoroughly reviewed all the instructions, and I’m ready
//             to proceed with answering my test.
//           </span>
//         </label>

//         {/* START BUTTON */}
//         <button
//           type="button"
//           className="view-details__start"
//           disabled={!isConfirmed}
//           onClick={handleStartTest}
//         >
//           Start E-Test <span aria-hidden="true">→</span>
//         </button>
//       </div>
//     </div>
//   );
// }

















// testing  the  new method






import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./PlanEtest.css";
import axios from "axios";

const DEFAULT_SUBJECT = "Air Regulation";
const DEFAULT_TOPIC = "International Organisations and Conventions";
const DEFAULT_TYPE = "E-Test";

const STATUS_TAGS = [
  { key: "attempted", label: "Green for attempted" },
  { key: "unattempted", label: "Yellow for unattempted" },
  { key: "unvisited", label: "White for unvisited questions" },
];

export default function PlanEtest() {
  const navigate = useNavigate();
  const location = useLocation();
  const { planId } = useParams();

  const [isConfirmed, setIsConfirmed] = useState(false);

  // fallback if page refreshed
  const {
    subject = DEFAULT_SUBJECT,
    topic = DEFAULT_TOPIC,
    testType = DEFAULT_TYPE,
    topicId: stateTopicId,
    planPath = null,
    userId = 10,
  } = location.state || {};

  const finalTopicId = stateTopicId || planId;

  const instructions = useMemo(
    () => [
      "The time remaining to complete the exam is displayed on your screen...",
      "The Questions palette at the right of the screen has one of the following statuses...",
      <>To answer a question, click the number on the question palette.</>,
      <>To read the entire paper, click on the <strong>All Questions</strong> button.</>,
      <>Change your responses by selecting a question then clicking <strong>Confirm</strong>.</>,
      <>Click <strong>Reset</strong> to clear your selected response.</>,
      <>Use <strong>Next</strong> and <strong>Previous</strong> buttons to navigate.</>,
    ],
    []
  );

  const handleGoToPlan = () => {
    if (planPath) navigate(planPath);
    else navigate("/dashboard/my-courses");
  };

  // ⭐ Correct: Start Test only ONCE here
  const handleStartTest = async () => {
    if (!isConfirmed) return;

    try {
      const res = await axios.post(
        "https://development.pilotexaminations.com/api/start-test",
        {
          user_id: userId,
          topic_id: finalTopicId,
        }
      );

      if (!res.data || res.data.error) {
        alert("Failed to start test");
        return;
      }

      const attempt_id = res.data.attempt_id;

      // Store attempt_id for refresh safety (optional)
      localStorage.setItem("attempt_id", attempt_id);
      localStorage.setItem("topic_id", finalTopicId);
      localStorage.setItem("questions", JSON.stringify(res.data.questions));


      // Navigate with URL attempt_id + state data
   navigate(`/test_question?quest_no=1&attempt_id=${attempt_id}`, 
 {
        state: {
          subject,
          topic,
          topicId: finalTopicId,
          planPath,
          questions: res.data.questions, // pass initial question list
          attemptId: attempt_id,
          userId,
        },
      });

    } catch (err) {
      console.error("start-test failed:", err);
      alert("Something went wrong starting test");
    }
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

        <label className="view-details__confirm">
          <input
            type="checkbox"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
          />
          <span>I have reviewed all instructions and I’m ready.</span>
        </label>

        <button
          type="button"
          className="view-details__start"
          disabled={!isConfirmed}
          onClick={handleStartTest}
        >
          Start E-Test →
        </button>
      </div>
    </div>
  );
}
