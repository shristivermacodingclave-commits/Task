import { useState } from 'react';
import whitelogo from '../assets/images/white-logo.svg';
import Modal from './LoginModal';
import RegisterModal from './RegisterModal';
import './CustomNavbar.css';
import Button from '../component/Button'



function CustomNavbar() {
  const [show, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
    const toggleModal = () => setShow(!show);

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
            <div className="ms-auto d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-4">
              <Button name="Login" onClick={()=>{setShow(true);}} className="btn-light text-dark fs-6"/>
              <Button name="Sign Up" onClick={()=>{setShowRegister(true)}} className="btn-dark text-light fs-6"/>
            </div>
          </div>
        </div>
      </nav>

      {/*Conditionally render the Modal */}
      <Modal show={show} handleClose={toggleModal} />
       <RegisterModal show={showRegister} handleClose={() => setShowRegister(false)} />
    </>
  );
}

export default CustomNavbar;
