import manwomen from '../assets/images/manwoman.png';
import Button from '../component/Button';
import './Dashbanner.css';

function DashBanner({ dashtitle }) {
  return (
    <div className="banner container-fluid px-5 py-1 rounded-4">
      <div className="row align-items-center justify-content-between">
        
        {/* Left Column */}
        <div className="col-md-7 col-12 left-content">
          <p className="user-name mb-2">Hi Ashish Sharma,</p>
          <h2 className="welcome-text mb-1" style={{ fontWeight: '500' }}>
            Welcome to PilotExaminations
          </h2>
          <p className="desc-text mb-4" style={{ fontWeight: '500' }}>
            Ignite your flying career with a subscription.<br />
            Access unlimited topic-wise tests and mock tests from India&apos;s top aviators.
          </p>
          <Button name="Subscribe Now" className="btn-dark fs-6 subscribe-button" />
        </div>

        {/* Right Column */}
        <div className="col-md-5 d-none d-md-flex justify-content-center align-items-center right-graphic position-relative">
          <div className="triangle layer3"></div>
          <div className="triangle layer2"></div>
          <div className="triangle layer1"></div>

          <img
            src={manwomen}
            alt="Pilot"
            className="pilot-img position-absolute"
          />
        </div>
      </div>
    </div>
  );
}

export default DashBanner;
