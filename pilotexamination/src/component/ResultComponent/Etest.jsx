import React from "react";
import InfoText from "../../component/InfoText";
import Button from '../../component/Button'
import { useNavigate } from "react-router-dom";

export default function Etest() {
  const navigate = useNavigate();
  const results = [
    {
      topic: "The Earth & Direction, Latitude and Longitude",
      result: "Fail",
      percentage: 0,
      examDate: "08 March 2024",
      subject: "Air Navigation",
    },
    {
      topic: "The Earth & Direction, Latitude and Longitude",
      result: "Fail",
      percentage: 14,
      examDate: "08 October 2022",
      subject: "Air Navigation",
    },
    {
      topic: "International Organisations and Conventions",
      result: "Fail",
      percentage: 0,
      examDate: "06 April 2022",
      subject: "Air Regulation",
    },
    {
      topic: "International Organisations and Conventions",
      result: "Fail",
      percentage: 0,
      examDate: "29 March 2022",
      subject: "Air Regulation",
    },
    {
      topic: "International Organisations and Conventions",
      result: "Fail",
      percentage: 4,
      examDate: "20 March 2022",
      subject: "Air Regulation",
    },
  ];

  return (
    <div className="container-fluid mt-4">
     <InfoText title="E-tests" text="are topic wise test from each subject" />
      {results.map((item, index) => (
        <div
          key={index}
          className="p-4 my-4 shadow-sm rounded"
          style={{
            background: "#fff",
            border: "1px solid #eee",
          }}
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
                  className=""
                  style={{ backgroundColor: "#ffe5e5", color: "#d60000" , borderRadius:"4px" , fontSize:"14px",padding:"0.3rem 0.8rem"}}
                >
                  {item.result}
                </span>
              </div>

              <div className="col-md-2">
                <p className="fw-semibold mb-1">Percentage</p>
                <p className="mb-0">{item.percentage}</p>
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
                    navigate("/dashboard/results/detail", {
                      state: {
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
              className=" px-3 py-2 mb-3"
              style={{ backgroundColor: "#ffe5e5", color: "#d60000" , borderRadius:"4px" }}
            >
              {item.result}
            </span>

            <p className="fw-semibold mb-1">Percentage</p>
            <p>{item.percentage}</p>

            <p className="fw-semibold mb-1">Exam Date</p>
            <p>{item.examDate}</p>

            <button
              className="btn btn-dark w-100 my-3"
              onClick={() =>
                navigate("/dashboard/results/detail", {
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
