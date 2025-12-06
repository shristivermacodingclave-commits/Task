import React, { useState } from "react";

const ReviewMessage = ({ onSubmit }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(message);
  };

  return (
    <div className="container-fluid px-3">
  
    
      
       <h3 className="fw-bold my-2 mb-4 mt-4">Review Message</h3>
        <hr />

      <div
        className="p-5 mt-5 bookmark-card"
        style={{
          background: "#fff",
          borderRadius: "10px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Message</label>
            <textarea
              className="form-control"
              rows="2"
              style={{
                border: "1px solid black",
                boxShadow: "none",
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn mt-2 "
            style={{
              background: "#F2C94C",
              borderColor: "#C99A1C",
              color: "#000",
              fontWeight: "600",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewMessage;
