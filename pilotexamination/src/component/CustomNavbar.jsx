// import { useState } from 'react';
// import whitelogo from '../assets/images/white-logo.svg';
// import Modal from './LoginModal';
// import RegisterModal from './RegisterModal';
// import './CustomNavbar.css';
// import Button from '../component/Button'
// import { useNavigate } from 'react-router-dom';



// function CustomNavbar() {
//   const [show, setShow] = useState(false);
//   const [showRegister, setShowRegister] = useState(false);
//   const toggleModal = () => setShow(!show);

//   const navigate = useNavigate();


//   const token = localStorage.getItem("token");
//   const user = localStorage.getItem("user");

//   const goto = ()=>{
//     navigate("/dashboard");
//   }



//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-dark absolute">
//         <div className="container">
//           {/* Brand (left) */}
//           <a className="navbar-brand d-flex align-items-center gap-2" href="#">
//             <img src={whitelogo} alt="Logo" width="120" height="auto" />
//           </a>

//           {/* Toggler */}
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#mainNav"
//             aria-controls="mainNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="mainNav">
         
             
//             <div className="ms-auto d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-4">
//               <Button name="Login" onClick={()=>{setShow(true);}} className="btn-light text-dark fs-6"/>
//               <Button name="Sign Up" onClick={()=>{setShowRegister(true)}} className="btn-dark text-light fs-6"/>
//             </div>

//              <div className="ms-auto d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-4">
//               <Button name="Dashboard" onClick={goto} className="btn-light text-dark fs-6"/>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/*Conditionally render the Modal */}
//       <Modal show={show} handleClose={toggleModal} />
//        <RegisterModal show={showRegister} handleClose={() => setShowRegister(false)} />
//     </>
//   );
// }

// export default CustomNavbar;





import { useState } from "react";
import whitelogo from "../assets/images/white-logo.svg";
import Modal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import "./CustomNavbar.css";
import Button from "../component/Button";
import { useNavigate } from "react-router-dom";

function CustomNavbar() {
  const [show, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const toggleModal = () => setShow(!show);
  const navigate = useNavigate();

  // ✅ Check login state
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const gotoDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark absolute">
        <div className="container">
          {/* Brand (left) */}
          <a className="navbar-brand d-flex align-items-center gap-2" href="#">
            <img src={whitelogo} alt="Logo" width="120" height="auto" />
          </a>

          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            {/*Conditional Buttons */}
            {!token || !user ? (
              <div className="ms-auto d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-4">
                <Button
                  name="Login"
                  onClick={() => setShow(true)}
                  className="btn-light text-dark fs-6"
                />
                <Button
                  name="Sign Up"
                  onClick={() => setShowRegister(true)}
                  className="btn-dark text-light fs-6"
                />
              </div>
            ) : (
              <div className="ms-auto d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-4">
                <Button
                  name="Dashboard"
                  onClick={gotoDashboard}
                  className="btn-dark text-light fs-6"
                />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <Modal show={show} handleClose={toggleModal} />

      {/* Register Modal */}
      <RegisterModal
        show={showRegister}
        handleClose={() => setShowRegister(false)}
      />
    </>
  );
}

export default CustomNavbar;

