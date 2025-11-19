// import React, { useState } from "react";
// import { Modal } from "react-bootstrap";
// import Button from '../../component/Button'

// export default function ProfileUpdate({ show, handleClose, handleUpload }) {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     if (file) {
//       handleUpload(file);
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <div
//         className="p-4"
//         style={{
//           backgroundColor: "#fff",
//           borderRadius: "10px",
//           fontFamily: "Poppins, sans-serif",
//         }}
//       >
//         {/* Title */}
//         <h5 className="fw-semibold mb-3">Upload New Profile Image</h5>

//         {/* Choose File */}
//         <form onSubmit={onSubmit}>
//           <div className="mb-4">
//             <label className="form-label fw-semibold mb-2">
//               Choose Profile Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               className="form-control"
//               onChange={handleFileChange}
//               required
//               style={{
//                 border: "1px solid #ccc",
//                 borderRadius: "5px",
//                 padding: "8px",
//               }}
//             />
//           </div>

//           {/* Buttons */}
//           <div className="d-flex justify-content-center gap-3 mt-4">
//             <button
//               type="button"
//               onClick={handleClose}
//               className="btn btn-outline-dark px-4 fw-semibold"
//               style={{
//                 borderRadius: "8px",
//                 minWidth: "100px",
//               }}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="btn btn-dark px-4 fw-semibold"
//               style={{
//                 borderRadius: "8px",
//                 minWidth: "100px",
//               }}
//             >
//               Upload
//             </button>
//           </div>
//         </form>
//       </div>
//     </Modal>
//   );
// }


import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "../../component/Button";

export default function ProfileUpdate({ show, handleClose }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get user ID from localStorage
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");
    if (!userId) return alert("User not found in localStorage!");

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `https://development.pilotexaminations.com/api/user/update-photo/${userId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert("Profile photo updated successfully!");
        handleClose();
      } else {
        alert(result.message || "Failed to upload");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleUpload();
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
        <h5 className="fw-semibold mb-3">Upload New Profile Image</h5>

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

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-outline-dark px-4 fw-semibold"
              style={{ borderRadius: "8px", minWidth: "100px" }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-dark px-4 fw-semibold"
              style={{ borderRadius: "8px", minWidth: "100px" }}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}


