import React from "react";
import "./LeaveTestModal.css";

export default function LeaveTestModal({ visible, onExit, onStay }) {
  if (!visible) return null;

  return (
    <div className="leave-overlay">
      <div className="leave-modal-box">
        <h3 className="leave-title">
          Are you sure you want to leave the test?
        </h3>

        <div className="leave-btn-row">
          <button className="leave-exit-btn" onClick={onExit}>
            Exit this test
          </button>

          <button className="leave-join-btn" onClick={onStay}>
            Join Back
          </button>
        </div>
      </div>
    </div>
  );
}
