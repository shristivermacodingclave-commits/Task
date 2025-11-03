import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import india from '../assets/images/india.svg'
import refresh from '../assets/images/refresh1.png'
import axios  from 'axios';

function RegisterModal({ show, handleClose }) {
  const [captcha, setCaptcha] = useState('dUsVPn'); // initial captcha
  const [captchaInput, setCaptchaInput] = useState('');

  
  const [name , setName] = useState('');
  const [phone , setPhone] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [confirmPassword , setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (captchaInput !== captcha) {
      alert('Invalid captcha');
      return;
    }

    if(password !== confirmPassword){
      alert('Passwords do not match');
      return;
    }

    // Proceed with registration
    const formData = {name , phone , email, password};

    try {
      const response = await axios.post('http://localhost:8000/user/register', formData);
      if (response.status === 201){
      alert('Registration successful');
      handleClose();
      }  
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed');
    }
  };



  const refreshCaptcha = () => {
    // simple random captcha generator (6 chars)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let newCaptcha = '';
    for (let i = 0; i < 6; i++) {
      newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(newCaptcha);
    setCaptchaInput('');
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton style={{ border: 'none' }}>
        <Modal.Title>Join Pilot Examinations</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <p>
          Or <a href="#" style={{ color: 'black' }}>Login</a>
        </p>

        <form onSubmit={handleRegister}>
          {/* Full Name */}
          <label>Full Name</label>
          <input type="text" placeholder="Enter your Name followed by surname" className="form-control mb-3" style={{padding:"0.8rem" , border:"1px solid black"}} value={name} onChange={(e) => setName(e.target.value)} />

          {/* Phone Number */}
          <label>Phone Number</label>
          <div className="d-flex mb-3 input-group">
            <span className="d-flex align-items-center px-2  bg-light input-group-prepend" style={{border:"1px solid black" , borderRadius:'5px 0px 0px 5px'}} >
              <img src={india} alt="ind" /> +91</span>
            <input type="text" className="form-control" placeholder="78667256327" style={{ border:"1px solid black", padding:"0.8rem"}}  value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          {/* Email */}
          <label>Email ID</label>
          <input type="email" placeholder="Enter Email" className="form-control mb-3" style={{padding:"0.8rem" , border:"1px solid black"}} value={email} onChange={(e) => setEmail(e.target.value)} />

          {/* Password */}
          <label>Password</label>
          <input type="password" placeholder="Enter Password" className="form-control mb-3" style={{padding:"0.8rem" , border:"1px solid black"}} value={password} onChange={(e) => setPassword(e.target.value)} />

          {/* Re-enter Password */}
          <label>Re-enter Password</label>
          <input type="password" placeholder="Please re-enter your password" className="form-control mb-3" style={{padding:"0.8rem" , border:"1px solid black"}} 
          value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

          {/* Captcha */}
          <div className="d-flex align-items-center mb-2 gap-2">
            <span className="px-3 py-2 bg-dark text-white" style={{borderRadius:"0.3rem"}}>{captcha}</span>
            <span>Captcha</span>
            <Button variant="link" onClick={refreshCaptcha} style={{ padding: '0 0.5rem' }}>
             <img src={refresh} alt="" />
            </Button>
          </div>
          <input
            type="text"
            placeholder="Enter Captcha..."
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            className="form-control mb-3"
            style={{padding:"0.8rem", border:"1px solid black"}}
          />

          <Button type="submit" className="btn btn-dark mb-4 px-3 py-2" style={{borderRadius:"0.3rem"}}>
            Register
          </Button>
        </form>
      </Modal.Body>

      {/* <Modal.Footer>
        
      </Modal.Footer> */}
    </Modal>
  );
}

export default RegisterModal;
