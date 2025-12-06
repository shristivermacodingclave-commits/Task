import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../component/Button';

function LoginModal({ show, handleClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://development.pilotexaminations.com/api/login_1',
        { email, password }
      );

      console.log('Login response:', response.data);

      const { error, token, message, data } = response.data;

      if (!error && token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(data));
        handleClose();

        navigate('/dashboard');
      } else {
        alert(message || 'Invalid credentials!');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Invalid credentials!');
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton style={{ border: 'none' }}>
          <Modal.Title></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>Login</h3>
          <p>
            Or&nbsp;
            <a href="#" style={{ color: 'black' }}>
              Create your account
            </a>
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />

            {/* Password Input with Toggle */}
            <div className="position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                aria-hidden="true"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#666',
                }}
              ></i>
            </div>

            <br />
            <a href="#" style={{ color: 'black', textDecoration: 'none' }}>
              Forgot your password?
            </a>
            <br />
            <br />

            <Button name="Login" className="btn-dark text-light" />
          </form>
        </Modal.Body>

        <Modal.Footer>
          <div>
            <p className="text-left">
              Having Trouble? <br />
              Please contact{' '}
              <a href="#" style={{ color: 'black' }}>
                pilotexamination@gmail.com
              </a>{' '}
              Or call{' '}
              <a href="#" style={{ color: 'black', textDecoration: 'none' }}>
                +91-8447814070
              </a>
            </p>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginModal;

