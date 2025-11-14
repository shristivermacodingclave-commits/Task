import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from '../../component/Button'

export default function ProfileUpdate({ show, handleClose, handleUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <div
        className="p-4"
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {/* Title */}
        <h5 className="fw-semibold mb-3">Upload New Profile Image</h5>

        {/* Choose File */}
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="form-label fw-semibold mb-2">
              Choose Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleFileChange}
              required
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "8px",
              }}
            />
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-center gap-3 mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-outline-dark px-4 fw-semibold"
              style={{
                borderRadius: "8px",
                minWidth: "100px",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-dark px-4 fw-semibold"
              style={{
                borderRadius: "8px",
                minWidth: "100px",
              }}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
