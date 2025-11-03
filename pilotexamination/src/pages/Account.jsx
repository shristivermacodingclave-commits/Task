import React, { useState } from "react";
import "./Account.css";
import defaultImg from "../assets/images/default.svg";
import Button from "../component/Button";
import { NavLink } from "react-router-dom";
import indiaFlag from "../assets/images/india.svg";
const Account = () => {
  // store edit state for multiple fields
  const [edit, setEdit] = useState([]);

  const toggleEdit = (id) => {
    setEdit((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const fields = [
    { id: "name", label: "Full Name", type: "text", value: "Ashish Sharma" },
    { id: "phone", label: "Phone Number", type: "number", value: "8726777887" },
    { id: "email", label: "Email ID", type: "email", value: "ashishofficial@hotmail.com" },
  ];

  return (
    <div className="profile container-fluid">
    <h3 className="fw-bold my-2 mb-4 mt-4">My Account</h3>
      <hr />
       <div className="col-md-12 pt-3 pb-3 ps-4 pe-4 mb-4 rounded gap-4 d-flex flex-row results-card">
        <NavLink to="/results/e-test" className="results-link fw-semibold">
          Profile
        </NavLink>
        <NavLink to="/results/practice-test" className="results-link fw-semibold">
         Change Password
        </NavLink>
        
      </div>

      <div className="row mt-4">
        {/* Right Section - Image (comes first on small screens) */}
        <div className="col-lg-4 col-12 mt-4 mt-lg-0 text-center order-1 order-lg-2">
          <div className="card-box d-flex flex-column align-items-center">
            <img src={defaultImg} alt="Profile" className="avatar" />
            <Button
              name="Edit Profile Picture"
              className="btn-light text-dark form-control edit-button mt-3"
            />
          </div>
        </div>

        {/* Left Section - Info (comes second on small screens) */}
        <div className="col-lg-8 col-12 order-2 order-lg-1">
         
         {fields.map((f) => (
  <div key={f.id} className="card-box position-relative">
    {/* Hide edit button when editing */}
    {!edit.includes(f.id) && (
      <button className="edit" onClick={() => toggleEdit(f.id)}>
        <i className="fa-solid fa-pencil" />
      </button>
    )}

    {edit.includes(f.id) ? (
      <>
        <p>{f.label}</p>

        {f.id === "phone" ? (
          <div className="d-flex align-items-center gap-2">
            {/* Indian flag and code */}
            <input
              type={f.type}
              defaultValue={f.value}
              className="form-control ms-2"
              style={{ flex: 1 }}
            />
          </div>
        ) : (
          <input
            type={f.type}
            defaultValue={f.value}
            className="form-control"
          />
        )}

        <div className="btns mt-3">
          <button className="btn black">Update</button>
          <button className="btn black" onClick={() => toggleEdit(f.id)}>
            Cancel
          </button>
        </div>
      </>
    ) : (
      <>
        <p className="sub">{f.label}</p>
        <h4 className="d-flex">
          {f.id === "phone" ? (
            <>
              <img
                src={indiaFlag}
                alt="India"
                className="me-2"
                style={{ width: "30px", height: "20px", borderRadius: "2px" }}
              />
              {f.value}
            </>
          ) : (
            f.value
          )}
        </h4>
      </>
    )}
  </div>
))}

          
        </div>
      </div>

<div className="changepassword-section p-4 mt-4 rounded">
  <div className="row">
    <div className="col-md-6 col-1g-6 bg-white rounded p-4 mt-4">
      <form className="d-flex flex-column gap-3">
        <div>
          <label className="fw-semibold mb-1">Current Password</label>
          <input
            type="password"
            placeholder="Enter Current Password"
            className="form-control"
          />
        </div>

        <div>
          <label className="fw-semibold mb-1">Enter New Password</label>
          <input
            type="password"
            placeholder="Please Enter New Password"
            className="form-control"
          />
        </div>

        <div>
          <label className="fw-semibold mb-1">Confirm New Password</label>
          <input
            type="password"
            placeholder="Please Confirm Your New Password"
            className="form-control"
          />
        </div>

        <div className="text-end mt-2">
          <Button name="Update" className="btn-dark px-5 py-2" />
        </div>
      </form>
    </div>
  </div>
</div>

    </div>
  );
};

export default Account;
