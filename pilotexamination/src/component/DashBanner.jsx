import manwomen from '../assets/images/manwoman.png'
import Button from '../component/Button'
import './Dashbanner.css'
function DashBanner({ dashtitle }) {
  return (
    <div className="banner  d-flex align-items-center justify-content-between px-4 py-4 rounded-3" style={{ backgroundColor: "#FCFAE9" }}>
      <div className='col-sm-5 col-md-5'>
        <p>{dashtitle}</p>
        <h2 className="" style={{ color: "#716810" }}>Welcome to PilotExaminations</h2>
        <p className="mb-3 fs-6 = fw-semibold">Ignite your flying career with a subscription.<br />Access unlimited topic-wise tests and mock tests from India's top <br /> aviators.</p>
        <Button name="Subscribe Now" className='btn-dark fs-5' />
      </div>
      <div className="triangle-container position-relative d-flex justify-content-center align-items-center">
        <div className="triangle layer3"></div>
        <div className="triangle layer2">

        </div>
        <div className="triangle layer1"></div>
        <img
          src={manwomen}
          alt="Pilot"
          className="position-absolute"
          style={{
            top: "66%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            width: "310px",
            height:"275px",
            zIndex: 3,
          }}
        />
      </div>


    </div>
  );
}

export default DashBanner;
