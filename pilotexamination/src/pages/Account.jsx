
// import React, { useState } from "react";
// import "./Account.css";
// import defaultImg from "../assets/images/default.svg";
// import Button from "../component/Button";
// import { NavLink, useLocation, Outlet} from "react-router-dom";
// import indiaFlag from "../assets/images/india.svg";

// const Account = () => {
//   const [edit, setEdit] = useState([]);
//   const location = useLocation(); // 👈 gives current path

//   const toggleEdit = (id) => {
//     setEdit((prev) =>
//       prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
//     );
//   };

//   const fields = [
//     { id: "name", label: "Full Name", type: "text", value: "Ashish Sharma" },
//     { id: "phone", label: "Phone Number", type: "number", value: "8726777887" },
//     { id: "email", label: "Email ID", type: "email", value: "ashishofficial@hotmail.com" },
//   ];

//   return (
//     <div className="profile container-fluid">
//       <h3 className="fw-bold my-2 mb-4 mt-4">My Account</h3>
//       <hr />

//       <div className="col-md-12 pt-3 pb-3 ps-4 pe-4 mb-4 rounded gap-4 d-flex flex-row results-card">
//         <NavLink to="index" className="results-link fw-semibold">
//           Profile
//         </NavLink>
//         <NavLink to="change-password" className="results-link fw-semibold">
//           Change Password
//         </NavLink>
//       </div>

//     <Outlet/>

//       {location.pathname.endsWith("index") || location.pathname.endsWith("my-account") ? (
//         // -------------------- PROFILE SECTION --------------------
//         <div className="row mt-4">
//           {/* Right Section - Image */}
//           <div className="col-lg-4 col-12 mt-4 mt-lg-0 text-center order-1 order-lg-2">
//             <div className="card-box d-flex flex-column align-items-center">
//               <img src={defaultImg} alt="Profile" className="avatar" />
//               <Button
//                 name="Edit Profile Picture"
//                 className="btn-light text-dark form-control edit-button mt-3"
//               />
//             </div>
//           </div>

//           {/* Left Section - Info */}
//           <div className="col-lg-8 col-12 order-2 order-lg-1">
//             {fields.map((f) => (
//               <div key={f.id} className="card-box position-relative">
//                 {!edit.includes(f.id) && (
//                   <button className="edit" onClick={() => toggleEdit(f.id)}>
//                     <i className="fa-solid fa-pencil" />
//                   </button>
//                 )}

//                 {edit.includes(f.id) ? (
//                   <>
//                     <p>{f.label}</p>
//                     {f.id === "phone" ? (
//                       <div className="d-flex align-items-center gap-2">
//                         <input
//                           type={f.type}
//                           defaultValue={f.value}
//                           className="form-control ms-2"
//                           style={{ flex: 1 }}
//                         />
//                       </div>
//                     ) : (
//                       <input
//                         type={f.type}
//                         defaultValue={f.value}
//                         className="form-control"
//                       />
//                     )}

//                     <div className="btns mt-3">
//                       <button className="btn black">Update</button>
//                       <button className="btn black" onClick={() => toggleEdit(f.id)}>
//                         Cancel
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <p className="sub">{f.label}</p>
//                     <h4 className="d-flex">
//                       {f.id === "phone" ? (
//                         <>
//                           <img
//                             src={indiaFlag}
//                             alt="India"
//                             className="me-2"
//                             style={{
//                               width: "30px",
//                               height: "20px",
//                               borderRadius: "2px",
//                             }}
//                           />
//                           {f.value}
//                         </>
//                       ) : (
//                         f.value
//                       )}
//                     </h4>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : location.pathname.endsWith("change-password") ? (
//         // -------------------- CHANGE PASSWORD SECTION --------------------
//         <div className="changepassword-section px-2 rounded">
//           <div className="row">
//             <div className="col-md-8 col-lg-8 rounded p-4 mt-1">
//               <form className="d-flex flex-column gap-3">
//                 <div>
//                   <label className="fw-semibold mb-1">Current Password</label>
//                   <input
//                     type="password"
//                     placeholder="Enter Current Password"
//                     className="form-control"
//                     style={{border:'1px solid black',padding:"0.7rem 0rem 0.7rem 0.3rem"}}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="fw-semibold mb-1">Enter New Password</label>
//                   <input
//                     type="password"
//                     placeholder="Please Enter New Password"
//                     className="form-control"
//                     style={{border:'1px solid black',padding:"0.7rem 0rem 0.7rem 0.3rem"}}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="fw-semibold mb-1">Confirm New Password</label>
//                   <input
//                     type="password"
//                     placeholder="Please Confirm Your New Password"
//                     className="form-control "
//                     style={{border:'1px solid black', padding:"0.7rem 0rem 0.7rem 0.3rem"}}
//                     required
//                   />
//                 </div>

//                 <div className="text-end mt-2">
//                   <Button name="Update" className="btn-dark px-5 py-2" />
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p>No matching section found.</p>
//       )}
//     </div>
//   );
// };

// export default Account;






// import React, { useState } from "react";
// import "./Account.css";
// import defaultImg from "../assets/images/default.svg";
// import indiaFlag from "../assets/images/india.svg";
// import Button from "../component/Button";
// import { NavLink, useLocation, Outlet } from "react-router-dom";
// import ProfileUpdate from "../component/AccountComponent/ProfieUpdate";
// const Account = () => {
//   const [edit, setEdit] = useState([]);
//   const [showUpload, setShowUpload] = useState(false);
//   const location = useLocation();

//   const toggleEdit = (id) => {
//     setEdit((prev) =>
//       prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
//     );
//   };

//   // Dummy upload function — replace later with your API call
//   const handleUpload = (file) => {
//     console.log("Selected File:", file);
//     alert(`Profile image selected: ${file.name}`);
//     setShowUpload(false);
//   };

//   const fields = [
//     { id: "name", label: "Full Name", type: "text", value: "Ashish Sharma" },
//     { id: "phone", label: "Phone Number", type: "number", value: "8726777887" },
//     { id: "email", label: "Email ID", type: "email", value: "ashishofficial@hotmail.com" },
//   ];

//   return (
//     <div className="profile container-fluid">
//       <h3 className="fw-bold my-2 mb-4 mt-4">My Account</h3>
//       <hr />

//       <div className="col-md-12 pt-3 pb-3 ps-4 pe-4 mb-4 rounded gap-4 d-flex flex-row results-card">
//         <NavLink to="index" className="results-link fw-semibold">
//           Profile
//         </NavLink>
//         <NavLink to="change-password" className="results-link fw-semibold">
//           Change Password
//         </NavLink>
//       </div>

//       <Outlet />

//       {location.pathname.endsWith("index") ||
//       location.pathname.endsWith("my-account") ? (
//         // -------------------- PROFILE SECTION --------------------
//         <div className="row mt-4">
//           {/* Right Section - Image */}
//           <div className="col-lg-4 col-12 mt-4 mt-lg-0 text-center order-1 order-lg-2">
//             <div className="card-box d-flex flex-column align-items-center">
//               <img src={defaultImg} alt="Profile" className="avatar" />
//               <Button
//                 name="Edit Profile Picture"
//                 className="btn-light text-dark form-control edit-button mt-3"
//                 onClick={() => setShowUpload(true)} // show modal
//               />
//             </div>
//           </div>

//           {/* Left Section - Info */}
//           <div className="col-lg-8 col-12 order-2 order-lg-1">
//             {fields.map((f) => (
//               <div key={f.id} className="card-box position-relative">
//                 {!edit.includes(f.id) && (
//                   <button className="edit" onClick={() => toggleEdit(f.id)}>
//                     <i className="fa-solid fa-pencil" />
//                   </button>
//                 )}

//                 {edit.includes(f.id) ? (
//                   <>
//                     <p>{f.label}</p>
//                     {f.id === "phone" ? (
//                       <div className="d-flex align-items-center gap-2">
//                         <input
//                           type={f.type}
//                           defaultValue={f.value}
//                           className="form-control ms-2"
//                           style={{ flex: 1 }}
//                         />
//                       </div>
//                     ) : (
//                       <input
//                         type={f.type}
//                         defaultValue={f.value}
//                         className="form-control"
//                       />
//                     )}

//                     <div className="btns mt-3">
//                       <button className="btn black">Update</button>
//                       <button
//                         className="btn black"
//                         onClick={() => toggleEdit(f.id)}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <p className="sub">{f.label}</p>
//                     <h4 className="d-flex">
//                       {f.id === "phone" ? (
//                         <>
//                           <img
//                             src={indiaFlag}
//                             alt="India"
//                             className="me-2"
//                             style={{
//                               width: "30px",
//                               height: "20px",
//                               borderRadius: "2px",
//                             }}
//                           />
//                           {f.value}
//                         </>
//                       ) : (
//                         f.value
//                       )}
//                     </h4>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : location.pathname.endsWith("change-password") ? (
//         // -------------------- CHANGE PASSWORD SECTION --------------------
//         <div className="changepassword-section px-2 rounded">
//           <div className="row">
//             <div className="col-md-8 col-lg-8 rounded p-4 mt-1">
//               <form className="d-flex flex-column gap-3">
//                 <div>
//                   <label className="fw-semibold mb-1">Current Password</label>
//                   <input
//                     type="password"
//                     placeholder="Enter Current Password"
//                     className="form-control"
//                     style={{
//                       border: "1px solid black",
//                       padding: "0.7rem 0rem 0.7rem 0.3rem",
//                     }}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="fw-semibold mb-1">Enter New Password</label>
//                   <input
//                     type="password"
//                     placeholder="Please Enter New Password"
//                     className="form-control"
//                     style={{
//                       border: "1px solid black",
//                       padding: "0.7rem 0rem 0.7rem 0.3rem",
//                     }}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="fw-semibold mb-1">Confirm New Password</label>
//                   <input
//                     type="password"
//                     placeholder="Please Confirm Your New Password"
//                     className="form-control "
//                     style={{
//                       border: "1px solid black",
//                       padding: "0.7rem 0rem 0.7rem 0.3rem",
//                     }}
//                     required
//                   />
//                 </div>

//                 <div className="text-end mt-2">
//                   <Button name="Update" className="btn-dark px-5 py-2" />
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p>No matching section found.</p>
//       )}

//       {/* ✅ Upload Modal */}
//       <ProfileUpdate
//         show={showUpload}
//         handleClose={() => setShowUpload(false)}
//         handleUpload={handleUpload}
//       />
//     </div>
//   );
// };

// export default Account;





// import React, { useState, useEffect } from "react";
// import "./Account.css";
// import defaultImg from '../assets/images/default.svg'
// import indiaFlag from "../assets/images/india.svg";
// import Button from "../component/Button";
// import { NavLink, useLocation, Outlet } from "react-router-dom";
// import ProfileUpdate from "../component/AccountComponent/ProfieUpdate";

// const Account = () => {
//   const [edit, setEdit] = useState([]);
//   const [showUpload, setShowUpload] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const location = useLocation();

//   // ✅ Fetch user data from localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         setUserData(JSON.parse(storedUser));
//       } catch (err) {
//         console.error("Error parsing user data:", err);
//       }
//     }
//   }, []);

//   const toggleEdit = (id) => {
//     setEdit((prev) =>
//       prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
//     );
//   };

//   // Dummy upload function — replace later with API call
//   const handleUpload = (file) => {
//     console.log("Selected File:", file);
//     alert(`Profile image selected: ${file.name}`);
//     setShowUpload(false);
//   };

//   if (!userData) {
//     return (
//       <div className="text-center py-5">
//         <h5>Loading your profile...</h5>
//       </div>
//     );
//   }

//   const { name, email, phone, profile_photo_url } = userData;

//   return (
//     <div className="profile container-fluid">
//       <h3 className="fw-bold my-2 mb-4 mt-4">My Account</h3>
//       <hr />

//       <div className="col-md-12 pt-3 pb-3 ps-4 pe-4 mb-4 rounded gap-4 d-flex flex-row results-card">
//         <NavLink to="index" className="results-link fw-semibold">
//           Profile
//         </NavLink>
//         <NavLink to="change-password" className="results-link fw-semibold">
//           Change Password
//         </NavLink>
//       </div>

//       <Outlet />

//       {location.pathname.endsWith("index") ||
//         location.pathname.endsWith("my-account") ? (
//         // -------------------- PROFILE SECTION --------------------
//         <div className="row mt-4">
//           {/* Right Section - Image */}
//           <div className="col-lg-4 col-12 mt-4 mt-lg-0 text-center order-1 order-lg-2">
//             <div className="card-box d-flex flex-column align-items-center">
//               <img
//                 src={
//                   profile_photo_url &&
//                     !profile_photo_url.includes("ui-avatars.com")
//                     ? profile_photo_url
//                     : defaultImg
//                 }
//                 alt="Profile"
//                 className="avatar"
//               />

//               <Button
//                 name="Edit Profile Picture"
//                 className="btn-light text-dark form-control edit-button mt-3"
//                 onClick={() => setShowUpload(true)} // show modal
//               />
//             </div>
//           </div>

//           {/* Left Section - Info */}
//           <div className="col-lg-8 col-12 order-2 order-lg-1">
//             {/* Full Name */}
//             <div className="card-box position-relative">
//               {!edit.includes("name") && (
//                 <button className="edit" onClick={() => toggleEdit("name")}>
//                   <i className="fa-solid fa-pencil" />
//                 </button>
//               )}

//               {edit.includes("name") ? (
//                 <>
//                   <p>Full Name</p>
//                   <input
//                     type="text"
//                     defaultValue={name || ""}
//                     className="form-control"
//                   />
//                   <div className="btns mt-3">
//                     <button className="btn black">Update</button>
//                     <button
//                       className="btn black"
//                       onClick={() => toggleEdit("name")}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <p className="sub">Full Name</p>
//                   <h4 className="d-flex text-capitalize">{name || "—"}</h4>
//                 </>
//               )}
//             </div>

//             {/* Phone */}
//             <div className="card-box position-relative">
//               {!edit.includes("phone") && (
//                 <button className="edit" onClick={() => toggleEdit("phone")}>
//                   <i className="fa-solid fa-pencil" />
//                 </button>
//               )}

//               {edit.includes("phone") ? (
//                 <>
//                   <p>Phone Number</p>
//                   <div className="d-flex align-items-center gap-2">
//                     <input
//                       type="number"
//                       defaultValue={phone || ""}
//                       className="form-control ms-2"
//                       style={{ flex: 1 }}
//                     />
//                   </div>
//                   <div className="btns mt-3">
//                     <button className="btn black">Update</button>
//                     <button
//                       className="btn black"
//                       onClick={() => toggleEdit("phone")}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <p className="sub">Phone Number</p>
//                   <h4 className="d-flex">
//                     <img
//                       src={indiaFlag}
//                       alt="India"
//                       className="me-2"
//                       style={{
//                         width: "30px",
//                         height: "20px",
//                         borderRadius: "2px",
//                       }}
//                     />
//                     {phone || "Not Provided"}
//                   </h4>
//                 </>
//               )}
//             </div>

//             {/* Email */}
//             <div className="card-box position-relative">
//               {!edit.includes("email") && (
//                 <button className="edit" onClick={() => toggleEdit("email")}>
//                   <i className="fa-solid fa-pencil" />
//                 </button>
//               )}

//               {edit.includes("email") ? (
//                 <>
//                   <p>Email ID</p>
//                   <input
//                     type="email"
//                     defaultValue={email || ""}
//                     className="form-control"
//                   />
//                   <div className="btns mt-3">
//                     <button className="btn black">Update</button>
//                     <button
//                       className="btn black"
//                       onClick={() => toggleEdit("email")}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <p className="sub">Email ID</p>
//                   <h4>{email || "—"}</h4>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : location.pathname.endsWith("change-password") ? (
//         // -------------------- CHANGE PASSWORD SECTION --------------------
//         <div className="changepassword-section px-2 rounded">
//           <div className="row">
//             <div className="col-md-8 col-lg-8 rounded p-4 mt-1">
//               <form className="d-flex flex-column gap-3">
//                 <div>
//                   <label className="fw-semibold mb-1">Current Password</label>
//                   <input
//                     type="password"
//                     placeholder="Enter Current Password"
//                     className="form-control"
//                     style={{
//                       border: "1px solid black",
//                       padding: "0.7rem 0rem 0.7rem 0.3rem",
//                     }}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="fw-semibold mb-1">Enter New Password</label>
//                   <input
//                     type="password"
//                     placeholder="Please Enter New Password"
//                     className="form-control"
//                     style={{
//                       border: "1px solid black",
//                       padding: "0.7rem 0rem 0.7rem 0.3rem",
//                     }}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="fw-semibold mb-1">Confirm New Password</label>
//                   <input
//                     type="password"
//                     placeholder="Please Confirm Your New Password"
//                     className="form-control "
//                     style={{
//                       border: "1px solid black",
//                       padding: "0.7rem 0rem 0.7rem 0.3rem",
//                     }}
//                     required
//                   />
//                 </div>

//                 <div className="text-end mt-2">
//                   <Button name="Update" className="btn-dark px-5 py-2" />
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p>No matching section found.</p>
//       )}

//       {/* ✅ Upload Modal */}
//       <ProfileUpdate
//         show={showUpload}
//         handleClose={() => setShowUpload(false)}
//         handleUpload={handleUpload}
//       />
//     </div>
//   );
// };

// export default Account;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Account.css";
// import defaultImg from "../assets/images/default.svg";
// import indiaFlag from "../assets/images/india.svg";
// import Button from "../component/Button";
// import { NavLink, useLocation, Outlet } from "react-router-dom";
// import ProfileUpdate from "../component/AccountComponent/ProfieUpdate";

// const Account = () => {
//   const [edit, setEdit] = useState([]);
//   const [showUpload, setShowUpload] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [formValues, setFormValues] = useState({});
//   const location = useLocation();

//   // ✅ Fetch user data from localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         setUserData(parsedUser);
//         setFormValues({
//           name: parsedUser.name || "",
//           email: parsedUser.email || "",
//           phone: parsedUser.phone || "",
//         });
//       } catch (err) {
//         console.error("Error parsing user data:", err);
//       }
//     }
//   }, []);

//   const toggleEdit = (id) => {
//     setEdit((prev) =>
//       prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
//     );
//   };

//   // ✅ Handle input change
//   const handleChange = (id, value) => {
//     setFormValues((prev) => ({ ...prev, [id]: value }));
//   };

//   // ✅ API call for updating account
//   const handleUpdate = async (field) => {
//     const token = localStorage.getItem("token");
//     if (!token) return alert("You must be logged in.");

//     try {
//       const response = await axios.post(
//         "https://development.pilotexaminations.com/api/update-account",
//         {
//           name: formValues.name,
//           email: formValues.email,
//           phone: formValues.phone,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.data.error) {
//         alert("Profile updated successfully!");
//         setUserData(response.data.data);
//         localStorage.setItem("user", JSON.stringify(response.data.data));
//         setEdit((prev) => prev.filter((f) => f !== field));
//       } else {
//         alert(response.data.message || "Failed to update profile");
//       }
//     } catch (error) {
//       console.error("Update failed:", error.response?.data || error.message);
//       alert("Something went wrong while updating profile.");
//     }
//   };

//   // Dummy upload function — replace later with API call
//   const handleUpload = (file) => {
//     console.log("Selected File:", file);
//     alert(`Profile image selected: ${file.name}`);
//     setShowUpload(false);
//   };

//   if (!userData) {
//     return (
//       <div className="text-center py-5">
//         <h5>Loading your profile...</h5>
//       </div>
//     );
//   }

//   const { name, email, phone, profile_photo_url } = userData;

//   return (
//     <div className="profile container-fluid">
//       <h3 className="fw-bold my-2 mb-4 mt-4">My Account</h3>
//       <hr />

//       <div className="col-md-12 pt-3 pb-3 ps-4 pe-4 mb-4 rounded gap-4 d-flex flex-row results-card">
//         <NavLink to="index" className="results-link fw-semibold">
//           Profile
//         </NavLink>
//         <NavLink to="change-password" className="results-link fw-semibold">
//           Change Password
//         </NavLink>
//       </div>

//       <Outlet />

//       {location.pathname.endsWith("index") ||
//       location.pathname.endsWith("my-account") ? (
//         // -------------------- PROFILE SECTION --------------------
//         <div className="row mt-4">
//           {/* Right Section - Image */}
//           <div className="col-lg-4 col-12 mt-4 mt-lg-0 text-center order-1 order-lg-2">
//             <div className="card-box d-flex flex-column align-items-center">
//               <img
//                 src={
//                   profile_photo_url &&
//                   !profile_photo_url.includes("ui-avatars.com")
//                     ? profile_photo_url
//                     : defaultImg
//                 }
//                 alt="Profile"
//                 className="avatar"
//               />
//               <Button
//                 name="Edit Profile Picture"
//                 className="btn-light text-dark form-control edit-button mt-3"
//                 onClick={() => setShowUpload(true)} // show modal
//               />
//             </div>
//           </div>

//           {/* Left Section - Info */}
//           <div className="col-lg-8 col-12 order-2 order-lg-1">
//             {/* Full Name */}
//             <div className="card-box position-relative">
//               {!edit.includes("name") && (
//                 <button className="edit" onClick={() => toggleEdit("name")}>
//                   <i className="fa-solid fa-pencil" />
//                 </button>
//               )}

//               {edit.includes("name") ? (
//                 <>
//                   <p>Full Name</p>
//                   <input
//                     type="text"
//                     value={formValues.name}
//                     onChange={(e) => handleChange("name", e.target.value)}
//                     className="form-control"
//                   />
//                   <div className="btns mt-3">
//                     <button
//                       className="btn black"
//                       onClick={() => handleUpdate("name")}
//                     >
//                       Update
//                     </button>
//                     <button
//                       className="btn black"
//                       onClick={() => toggleEdit("name")}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <p className="sub">Full Name</p>
//                   <h4 className="d-flex text-capitalize">
//                     {formValues.name || "—"}
//                   </h4>
//                 </>
//               )}
//             </div>

//             {/* Phone */}
//             <div className="card-box position-relative">
//               {!edit.includes("phone") && (
//                 <button className="edit" onClick={() => toggleEdit("phone")}>
//                   <i className="fa-solid fa-pencil" />
//                 </button>
//               )}

//               {edit.includes("phone") ? (
//                 <>
//                   <p>Phone Number</p>
//                   <div className="d-flex align-items-center gap-2">
//                     <input
//                       type="number"
//                       value={formValues.phone}
//                       onChange={(e) => handleChange("phone", e.target.value)}
//                       className="form-control ms-2"
//                       style={{ flex: 1 }}
//                     />
//                   </div>
//                   <div className="btns mt-3">
//                     <button
//                       className="btn black"
//                       onClick={() => handleUpdate("phone")}
//                     >
//                       Update
//                     </button>
//                     <button
//                       className="btn black"
//                       onClick={() => toggleEdit("phone")}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <p className="sub">Phone Number</p>
//                   <h4 className="d-flex">
//                     <img
//                       src={indiaFlag}
//                       alt="India"
//                       className="me-2"
//                       style={{
//                         width: "30px",
//                         height: "20px",
//                         borderRadius: "2px",
//                       }}
//                     />
//                     {formValues.phone || "Not Provided"}
//                   </h4>
//                 </>
//               )}
//             </div>

//             {/* Email */}
//             <div className="card-box position-relative">
//               {!edit.includes("email") && (
//                 <button className="edit" onClick={() => toggleEdit("email")}>
//                   <i className="fa-solid fa-pencil" />
//                 </button>
//               )}

//               {edit.includes("email") ? (
//                 <>
//                   <p>Email ID</p>
//                   <input
//                     type="email"
//                     value={formValues.email}
//                     onChange={(e) => handleChange("email", e.target.value)}
//                     className="form-control"
//                   />
//                   <div className="btns mt-3">
//                     <button
//                       className="btn black"
//                       onClick={() => handleUpdate("email")}
//                     >
//                       Update
//                     </button>
//                     <button
//                       className="btn black"
//                       onClick={() => toggleEdit("email")}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <p className="sub">Email ID</p>
//                   <h4>{formValues.email || "—"}</h4>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : location.pathname.endsWith("change-password") ? (
//         // -------------------- CHANGE PASSWORD SECTION --------------------
//         <div className="changepassword-section px-2 rounded">
//           <div className="row">
//             <div className="col-md-8 col-lg-8 rounded p-4 mt-1">
//               <form className="d-flex flex-column gap-3">
//                 <div>
//                   <label className="fw-semibold mb-1">Current Password</label>
//                   <input
//                     type="password"
//                     placeholder="Enter Current Password"
//                     className="form-control"
//                     style={{
//                       border: "1px solid black",
//                       padding: "0.7rem 0rem 0.7rem 0.3rem",
//                     }}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="fw-semibold mb-1">Enter New Password</label>
//                   <input
//                     type="password"
//                     placeholder="Please Enter New Password"
//                     className="form-control"
//                     style={{
//                       border: "1px solid black",
//                       padding: "0.7rem 0rem 0.7rem 0.3rem",
//                     }}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="fw-semibold mb-1">
//                     Confirm New Password
//                   </label>
//                   <input
//                     type="password"
//                     placeholder="Please Confirm Your New Password"
//                     className="form-control "
//                     style={{
//                       border: "1px solid black",
//                       padding: "0.7rem 0rem 0.7rem 0.3rem",
//                     }}
//                     required
//                   />
//                 </div>

//                 <div className="text-end mt-2">
//                   <Button name="Update" className="btn-dark px-5 py-2" />
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p>No matching section found.</p>
//       )}

//       {/* ✅ Upload Modal */}
//       <ProfileUpdate
//         show={showUpload}
//         handleClose={() => setShowUpload(false)}
//         handleUpload={handleUpload}
//       />
//     </div>
//   );
// };

// export default Account;




import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Account.css";
import defaultImg from "../assets/images/default.svg";
import indiaFlag from "../assets/images/india.svg";
import Button from "../component/Button";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import ProfileUpdate from "../component/AccountComponent/ProfieUpdate";

const Account = () => {
  const [edit, setEdit] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formValues, setFormValues] = useState({});
  const location = useLocation();

  // ✅ Fetch user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser);
        setFormValues({
          name: parsedUser.name || "",
          email: parsedUser.email || "",
          phone: parsedUser.phone || "",
        });
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
  }, []);

  const toggleEdit = (id) => {
    setEdit((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleChange = (id, value) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  // ✅ Update profile API with dynamic user ID
  const handleUpdate = async (field) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in.");

    if (!userData?.id) return alert("User ID not found!");

    try {
      const response = await axios.put(
        `https://development.pilotexaminations.com/api/update-account/${userData.id}`,
        { 
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.error) {
        alert("Profile updated successfully!");
        setUserData(response.data.data);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setEdit((prev) => prev.filter((f) => f !== field));
      } else {
        alert(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
      alert("Something went wrong while updating your profile.");
    }
  };

  // Dummy upload — will connect later
  const handleUpload = (file) => {
    console.log("Selected File:", file);
    alert(`Profile image selected: ${file.name}`);
    setShowUpload(false);
  };

  if (!userData) {
    return (
      <div className="text-center py-5">
        <h5>Loading your profile...</h5>
      </div>
    );
  }

  const { name, email, phone, profile_photo_url } = userData;

  return (
    <div className="profile container-fluid">
      <h3 className="fw-bold my-2 mb-4 mt-4">My Account</h3>
      <hr />

      <div className="col-md-12 pt-3 pb-3 ps-4 pe-4 mb-4 rounded gap-4 d-flex flex-row results-card">
        <NavLink to="index" className="results-link fw-semibold">
          Profile
        </NavLink>
        <NavLink to="change-password" className="results-link fw-semibold">
          Change Password
        </NavLink>
      </div>

      <Outlet />

      {location.pathname.endsWith("index") ||
      location.pathname.endsWith("my-account") ? (
        // -------------------- PROFILE SECTION --------------------
        <div className="row mt-4">
          {/* Right Section - Image */}
          <div className="col-lg-4 col-12 mt-4 mt-lg-0 text-center order-1 order-lg-2">
            <div className="card-box d-flex flex-column align-items-center">
              <img
                src={
                  profile_photo_url &&
                  !profile_photo_url.includes("ui-avatars.com")
                    ? profile_photo_url
                    : defaultImg
                }
                alt="Profile"
                className="avatar"
              />
              <Button
                name="Edit Profile Picture"
                className="btn-light text-dark form-control edit-button mt-3"
                onClick={() => setShowUpload(true)}
              />
            </div>
          </div>

          {/* Left Section - Info */}
          <div className="col-lg-8 col-12 order-2 order-lg-1">
            {/* Full Name */}
            <div className="card-box position-relative">
              {!edit.includes("name") && (
                <button className="edit" onClick={() => toggleEdit("name")}>
                  <i className="fa-solid fa-pencil" />
                </button>
              )}
              {edit.includes("name") ? (
                <>
                  <p>Full Name</p>
                  <input
                    type="text"
                    value={formValues.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="form-control"
                  />
                  <div className="btns mt-3">
                    <button
                      className="btn black"
                      onClick={() => handleUpdate("name")}
                    >
                      Update
                    </button>
                    <button
                      className="btn black"
                      onClick={() => toggleEdit("name")}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="sub">Full Name</p>
                  <h4 className="d-flex text-capitalize">
                    {formValues.name || "—"}
                  </h4>
                </>
              )}
            </div>

            {/* Phone */}
            <div className="card-box position-relative">
              {!edit.includes("phone") && (
                <button className="edit" onClick={() => toggleEdit("phone")}>
                  <i className="fa-solid fa-pencil" />
                </button>
              )}
              {edit.includes("phone") ? (
                <>
                  <p>Phone Number</p>
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="number"
                      value={formValues.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="form-control ms-2"
                      style={{ flex: 1 }}
                    />
                  </div>
                  <div className="btns mt-3">
                    <button
                      className="btn black"
                      onClick={() => handleUpdate("phone")}
                    >
                      Update
                    </button>
                    <button
                      className="btn black"
                      onClick={() => toggleEdit("phone")}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="sub">Phone Number</p>
                  <h4 className="d-flex">
                    <img
                      src={indiaFlag}
                      alt="India"
                      className="me-2"
                      style={{
                        width: "30px",
                        height: "20px",
                        borderRadius: "2px",
                      }}
                    />
                    {formValues.phone || "Not Provided"}
                  </h4>
                </>
              )}
            </div>

            {/* Email */}
            <div className="card-box position-relative">
              {!edit.includes("email") && (
                <button className="edit" onClick={() => toggleEdit("email")}>
                  <i className="fa-solid fa-pencil" />
                </button>
              )}
              {edit.includes("email") ? (
                <>
                  <p>Email ID</p>
                  <input
                    type="email"
                    value={formValues.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="form-control"
                  />
                  <div className="btns mt-3">
                    <button
                      className="btn black"
                      onClick={() => handleUpdate("email")}
                    >
                      Update
                    </button>
                    <button
                      className="btn black"
                      onClick={() => toggleEdit("email")}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="sub">Email ID</p>
                  <h4>{formValues.email || "—"}</h4>
                </>
              )}
            </div>
          </div>
        </div>
      ) : location.pathname.endsWith("change-password") ? (
        // -------------------- CHANGE PASSWORD SECTION --------------------
        <div className="changepassword-section px-2 rounded">
          <div className="row">
            <div className="col-md-8 col-lg-8 rounded p-4 mt-1">
              <form className="d-flex flex-column gap-3">
                <div>
                  <label className="fw-semibold mb-1">Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter Current Password"
                    className="form-control"
                    style={{
                      border: "1px solid black",
                      padding: "0.7rem 0rem 0.7rem 0.3rem",
                    }}
                    required
                  />
                </div>
                <div>
                  <label className="fw-semibold mb-1">Enter New Password</label>
                  <input
                    type="password"
                    placeholder="Please Enter New Password"
                    className="form-control"
                    style={{
                      border: "1px solid black",
                      padding: "0.7rem 0rem 0.7rem 0.3rem",
                    }}
                    required
                  />
                </div>
                <div>
                  <label className="fw-semibold mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Please Confirm Your New Password"
                    className="form-control "
                    style={{
                      border: "1px solid black",
                      padding: "0.7rem 0rem 0.7rem 0.3rem",
                    }}
                    required
                  />
                </div>
                <div className="text-end mt-2">
                  <Button name="Update" className="btn-dark px-5 py-2" />
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <p>No matching section found.</p>
      )}

      {/* ✅ Upload Modal */}
      <ProfileUpdate
        show={showUpload}
        handleClose={() => setShowUpload(false)}
        handleUpload={handleUpload}
      />
    </div>
  );
};

export default Account;


