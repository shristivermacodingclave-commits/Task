
// import React from "react";
// import InfoText from "../../component/InfoText";
// import Button from '../../component/Button'

// export default function MockTest() {
//   const results = [
//     {
//       topic: "The Earth & Direction, Latitude and Longitude",
//       result: "Fail",
//       percentage: 0,
//       examDate: "08 March 2024",
//       subject: "Air Navigation",
//     },
//     {
//       topic: "The Earth & Direction, Latitude and Longitude",
//       result: "Fail",
//       percentage: 14,
//       examDate: "08 October 2022",
//       subject: "Air Navigation",
//     },
//     {
//       topic: "International Organisations and Conventions",
//       result: "Fail",
//       percentage: 0,
//       examDate: "06 April 2022",
//       subject: "Air Regulation",
//     },
//     {
//       topic: "International Organisations and Conventions",
//       result: "Fail",
//       percentage: 0,
//       examDate: "29 March 2022",
//       subject: "Air Regulation",
//     },
//     {
//       topic: "International Organisations and Conventions",
//       result: "Fail",
//       percentage: 4,
//       examDate: "20 March 2022",
//       subject: "Air Regulation",
//     },
//   ];

//   return (
//     <div className="container-fluid mt-4">
//     <InfoText title="Mock Tests" text="simulate real exam pattern" />
//       {results.map((item, index) => (
//         <div
//           key={index}
//           className="p-4 my-4 shadow-sm rounded"
//           style={{
//             background: "#fff",
//             border: "1px solid #eee",
//           }}
//         >
//           {/* DESKTOP VIEW */}
//           <div className="d-none d-md-block">
//             <div className="row align-items-center mb-3">
//               <div className="col-md-3">
//                 <p className="fw-semibold mb-1">Topic</p>
//                 <p className="mb-0 fw-bold">{item.topic}</p>
//               </div>

//               <div className="col-md-2">
//                 <p className="fw-semibold mb-1">Result</p>
//                 <span
//                   className=""
//                   style={{ backgroundColor: "#ffe5e5", color: "#d60000" , borderRadius:"4px" , fontSize:"14px",padding:"0.3rem 0.8rem"}}
//                 >
//                   {item.result}
//                 </span>
//               </div>

//               <div className="col-md-2">
//                 <p className="fw-semibold mb-1">Percentage</p>
//                 <p className="mb-0">{item.percentage}</p>
//               </div>

//               <div className="col-md-2">
//                 <p className="fw-semibold mb-1">Exam Date</p>
//                 <p className="mb-0">{item.examDate}</p>
//               </div>

//               <div className="col-md-3 text-end">
//                 <Button name="Result" className="btn-dark fs-6 px-5 w-100"/>
//               </div>
//             </div>

//             <hr />
//             <p className="text-muted mb-0">Subject: {item.subject}</p>
//           </div>

//           {/* MOBILE VIEW */}
//           <div className="d-block d-md-none">
//             <p className="fw-semibold mb-1">Topic</p>
//             <p>{item.topic}</p>

//             <p className="fw-semibold mb-1 mt-2">Result</p>
//             <span
//               className=" px-3 py-2 mb-3"
//               style={{ backgroundColor: "#ffe5e5", color: "#d60000" , borderRadius:"4px" }}
//             >
//               {item.result}
//             </span>

//             <p className="fw-semibold mb-1">Percentage</p>
//             <p>{item.percentage}</p>

//             <p className="fw-semibold mb-1">Exam Date</p>
//             <p>{item.examDate}</p>

//             <button className="btn btn-dark w-100 my-3">Result</button>

//             <hr />
//             <p className="text-muted mb-0">Subject: {item.subject}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import InfoText from "../../component/InfoText";
// import Button from "../../component/Button";

// export default function MockTest() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?.id;

//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Format date: 2025-02-26 → 26 February 2025
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   useEffect(() => {
//     if (!userId) return;

//     const fetchMockResults = async () => {
//       try {
//         const res = await axios.post(
//           "https://development.pilotexaminations.com/api/get-user-mock-test-results",
//           { user_id: userId }
//         );

//         if (!res.data.error) {
//           setResults(res.data.results || []);
//         }
//       } catch (err) {
//         console.log("API Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMockResults();
//   }, [userId]);

//   if (loading)
//     return (
//       <div className="container-fluid mt-4 text-center">
//         <h5>Loading...</h5>
//       </div>
//     );

//   return (
//     <div className="container-fluid mt-4">
//       <InfoText title="Mock Tests" text="simulate real exam pattern" />

//       {results.length === 0 && (
//         <div className="text-center mt-4">
//           <p className="text-muted">No mock test results found.</p>
//         </div>
//       )}

//       {results.map((item, index) => (
//         <div
//           key={index}
//           className="p-4 my-4 shadow-sm rounded"
//           style={{ background: "#fff", border: "1px solid #eee" }}
//         >
//           {/* DESKTOP VIEW */}
//           <div className="d-none d-md-block">
//             <div className="row align-items-center mb-3">
//               <div className="col-md-3">
//                 <p className="fw-semibold mb-1">Topic</p>
//                 <p className="mb-0 fw-bold">{item.test_type}</p>
//               </div>

//               <div className="col-md-2">
//                 <p className="fw-semibold mb-1">Result</p>
//                 <span
//                   style={{
//                     backgroundColor: "#ffe5e5",
//                     color: "#d60000",
//                     borderRadius: "4px",
//                     fontSize: "14px",
//                     padding: "0.3rem 0.8rem",
//                   }}
//                 >
//                   {item.result == 0 ? "Fail" : "Pass"}
//                 </span>
//               </div>

//               <div className="col-md-2">
//                 <p className="fw-semibold mb-1">Percentage</p>
//                 <p className="mb-0">{item.percentage}%</p>
//               </div>

//               <div className="col-md-2">
//                 <p className="fw-semibold mb-1">Exam Date</p>
//                 <p className="mb-0">{formatDate(item.created_at)}</p>
//               </div>

//               <div className="col-md-3 text-end">
//                 <Button
//                   name="Result"
//                   className="btn-dark fs-6 px-5 w-100"
//                 />
//               </div>
//             </div>

//             <hr />
//             <p className="text-muted mb-0">Subject: {item.subject_name}</p>
//           </div>

//           {/* MOBILE VIEW */}
//           <div className="d-block d-md-none">
//             <p className="fw-semibold mb-1">Topic</p>
//             <p>{item.test_type}</p>

//             <p className="fw-semibold mb-1 mt-2">Result</p>
//             <span
//               className="px-3 py-2 mb-3"
//               style={{ backgroundColor: "#ffe5e5", color: "#d60000", borderRadius: "4px" }}
//             >
//               {item.result == 0 ? "Fail" : "Pass"}
//             </span>

//             <p className="fw-semibold mb-1">Percentage</p>
//             <p>{item.percentage}%</p>

//             <p className="fw-semibold mb-1">Exam Date</p>
//             <p>{formatDate(item.created_at)}</p>

//             {/* <button className="btn btn-dark w-100 my-3">Result</button> */}

//                  <div className="col-md-3 text-end">
//                 <Button
//                   name="Result"
//                   className="btn-dark fs-6 px-5 w-100"
//                   onClick={() =>
//                     navigate("/dashboard/results/etest-detail", {
//                       state: {
//                         testId: item.testId,
//                         subject: item.subject,
//                         topic: item.topic,
//                         percentage: item.percentage,
//                         result: item.result,
//                         examDate: item.examDate,
//                       },
//                     })
//                   }
//                 />
//               </div>

//             <hr />
//             <p className="text-muted mb-0">Subject: {item.subject_name}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import axios from "axios";
import InfoText from "../../component/InfoText";
import Button from "../../component/Button";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

export default function MockTest() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  // Format date: 2025-02-26 → 26 February 2025
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (!userId) return;

    const fetchMockResults = async () => {
      try {
        const res = await axios.post(
          "https://development.pilotexaminations.com/api/get-user-mock-test-results",
          { user_id: userId }
        );

        if (!res.data.error) {
          // Convert API response to Etest-like structure
          const formatted = res.data.results.map((item) => ({
            testId: item.test_id,
            topic: item.test_type,
            subject: item.subject_name,
            percentage: item.percentage,
            result: item.result == 0 ? "Fail" : "Pass",
            examDate: formatDate(item.created_at),
          }));

          setResults(formatted);
        }
      } catch (err) {
        console.log("MockTest API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMockResults();
  }, [userId]);

  // if (loading)
  //   return (
  //     <div className="container-fluid mt-4 text-center">
  //       <h5>Loading...</h5>
  //     </div>
  //   );

    if (loading) return <Loader message="Loading mocktest results....." />;

  return (
    <div className="container-fluid mt-4">
      <InfoText title="Mock Tests" text="simulate real exam pattern" />

      {results.length === 0 && (
        <div className="text-center mt-4">
          <p className="text-muted">No mock test results found.</p>
        </div>
      )}

      {results.map((item, index) => (
        <div
          key={index}
          className="p-4 my-4 shadow-sm rounded"
          style={{ background: "#fff", border: "1px solid #eee" }}
        >
          {/* DESKTOP VIEW */}
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
                    navigate("/dashboard/results/mocktest-detail", {
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

          {/* MOBILE VIEW */}
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
                navigate("/dashboard/results/mocktest-detail", {
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
