import React from "react";
import "./Loader.css";

function Loader({ message = "Loading...", compact = false }) {
  return (
    <div
      className={`pe-loader ${compact ? "pe-loader--compact" : ""}`}
      role="status"
      aria-live="polite"
    >
      <span className="pe-loader__spinner" />
      {message && <span className="pe-loader__text">{message}</span>}
    </div>
  );
}

export default Loader;
