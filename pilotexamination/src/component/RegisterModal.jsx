import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import india from '../assets/images/india.svg';
import refresh from '../assets/images/refresh1.png';
import axios from 'axios';

function RegisterModal({ show, handleClose }) {
  const [captcha, setCaptcha] = useState('dUsVPn');
  const [captchaInput, setCaptchaInput] = useState('');

  const [full_name, setFull_name] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (captchaInput !== captcha) {
      alert('Invalid captcha');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const formData = {
      full_name,
      phone_number,
      email,
      password,
      password_confirmation: confirmPassword, 
    };

    try {
      setLoading(true);
      const response = await axios.post(
        'https://development.pilotexaminations.com/api/register',
        formData
      );

      if (response.data.error === false) {
        alert(response.data.message || 'Registration successful');
        localStorage.setItem('token', response.data.token);
        setFull_name('');
        setPhone_number('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setCaptchaInput('');
        refreshCaptcha();

        handleClose(); 
      } else {
        alert(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const refreshCaptcha = () => {
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

      <Modal.Body>
        <p>
          Or <a href="#" style={{ color: 'black' }}>Login</a>
        </p>

        <form onSubmit={handleRegister}>
          {/* Full Name */}
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your Name followed by surname"
            className="form-control mb-3"
            style={{ padding: '0.8rem', border: '1px solid black' }}
            value={full_name}
            onChange={(e) => setFull_name(e.target.value)}
            required
          />

          {/* Phone Number */}
          <label>Phone Number</label>
          <div className="d-flex mb-3 input-group">
            <span
              className="d-flex align-items-center px-2 bg-light input-group-prepend"
              style={{
                border: '1px solid black',
                borderRadius: '5px 0px 0px 5px',
              }}
            >
              <img src={india} alt="ind" /> +91
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="7866725632"
              maxLength={10}
              style={{ border: '1px solid black', padding: '0.8rem' }}
              value={phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <label>Email ID</label>
          <input
            type="email"
            placeholder="Enter Email"
            className="form-control mb-3"
            style={{ padding: '0.8rem', border: '1px solid black' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            className="form-control mb-3"
            style={{ padding: '0.8rem', border: '1px solid black' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Re-enter Password */}
          <label>Re-enter Password</label>
          <input
            type="password"
            placeholder="Please re-enter your password"
            className="form-control mb-3"
            style={{ padding: '0.8rem', border: '1px solid black' }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* Captcha */}
          <div className="d-flex align-items-center mb-2 gap-2">
            <span
              className="px-3 py-2 bg-dark text-white"
              style={{ borderRadius: '0.3rem' }}
            >
              {captcha}
            </span>
            <span>Captcha</span>
            <Button
              variant="link"
              onClick={refreshCaptcha}
              style={{ padding: '0 0.5rem' }}
            >
              <img src={refresh} alt="refresh" />
            </Button>
          </div>

          <input
            type="text"
            placeholder="Enter Captcha..."
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            className="form-control mb-3"
            style={{ padding: '0.8rem', border: '1px solid black' }}
            required
          />

          <Button
            type="submit"
            className="btn btn-dark mb-4 px-3 py-2 signup-button"
            style={{ borderRadius: '0.3rem' }}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterModal;

