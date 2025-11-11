// import Carousel from 'react-bootstrap/Carousel';
// import DashBanner from '../component/DashBanner'; 
// import DashSubject from '../component/DashSubject';
// import DashComboSubject from '../component/DashComboSubject';
// import airplane from '../assets/images/airplanflight.png'
// import Button from '../component/Button';
// import './Dashboard.css';


// function DashboardHome() {
//   return (
  
//         <div className="container-fluid " style={{backgroundColor:"#f9faf744"}} >
//           {/* dash banner */}
//           <DashBanner dashtitle={"Hi Ashish Sharma,"} />

//           {/* related subject */}
//           <div className='related-subjects mt-5'> 
//           <h3 className="fw-bold my-2 mb-4">Related Subjects</h3>
//           <hr/>

//           <Carousel
//             indicators
//             controls={false}  // hide arrows
//             interval={3000}
//             pause="hover"
//             className="mt-4"
//           >
//             <Carousel.Item>
//               <DashSubject showDescription={false} withSpacing={false}/>
//             </Carousel.Item>
//             <Carousel.Item>
//                 <DashSubject showDescription={false} withSpacing={false}/>
//             </Carousel.Item>
//             <Carousel.Item>
//                 <DashSubject showDescription={false} withSpacing={false}/>
//             </Carousel.Item>
//           </Carousel>
//           </div>
          

//            {/* start exploring */}

//            <div className=' start-exploring mt-5 py-5 text-center rounded-3 'style={{backgroundColor:"#ffffff"}}>
//               <h4 className='fw-bolder '>Take Control of Your Learning</h4>
//               <p className='fw-semibold'>Discover subjects and choose your path to DCGA exam success</p>

//                <div className="row">
//                 <div className="col-sm-4 col-md-4 text-center"></div>
//                 <div className="col-sm-4 col-md-4 text-center">
//                 <Button name="Start Exploring" className="btn-dark btn-lg fs-6 subscribe-button "/>
//                 </div>
//                 <div className="col-sm-4 col-md-4 text-center">
//                    <img src={airplane} alt="airplane"  style={{marginTop:"-25px"}}/>
//                 </div>
//                </div>
               
//            </div>


//            {/* combosubject */}
//            <div className='dash-combo-subject mt-5'>
//              <h3 className="fw-bold my-2 mb-4">Combo Subjects</h3>
//              <hr />

//              <DashComboSubject withSpacing={false}/>
//            </div>
//         </div>

//   );
// }

// export default DashboardHome;


import React from "react";
import Carousel from "react-bootstrap/Carousel";
import DashBanner from "../component/DashBanner";
import DashComboSubject from "../component/DashComboSubject";
import { DashSubjects } from "../assets/DashSubjects";
import airplane from "../assets/images/airplanflight.png";
import Button from "../component/Button";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function DashboardHome() {
  const navigate = useNavigate();

  const goToPlans = (path) => {
    navigate(path);
  };

  // 🔹 Split subjects into groups of 3 for carousel
  const groupedSubjects = [];
  for (let i = 0; i < DashSubjects.length; i += 3) {
    groupedSubjects.push(DashSubjects.slice(i, i + 3));
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: "#f9faf744" }}>
      {/* dash banner */}
      <DashBanner dashtitle={"Hi Ashish Sharma,"} />

      {/* related subject */}
      <div className="related-subjects mt-5">
        <h3 className="fw-bold my-2 mb-4">Related Subjects</h3>
        <hr />

        {/* ✅ Carousel showing 3 cards per slide */}
        <Carousel
          indicators={true}
          controls={false}
          interval={3500}
          pause="hover"
          className="mt-4 subject-carousel"
        >
          {groupedSubjects.map((group, index) => (
            <Carousel.Item key={index}>
              <div className="row justify-content-center">
                {group.map((subject) => (
                  <div className="col-md-4 mb-3" key={subject.id}>
                    <div className="subject-card h-100 shadow-sm rounded-4">
                      {/* Header */}
                      <div
                        className="subject-header py-4 text-center rounded-top-4"
                        style={{ backgroundColor: subject.bg_color }}
                      >
                        <h4 className="subject-title fw-bold">
                          {subject.name}
                        </h4>
                        <img
                          src={subject.icon}
                          alt={subject.name}
                          className="subject-icon mt-2"
                          width="50"
                        />
                      </div>

                      {/* Topics */}
                      <div className="subject-topics p-3">
                        <div className="row mb-2">
                          <div className="col-6">
                            <h6>Topics Covered</h6>
                          </div>
                          <div className="col-6 text-end">
                            <Link
                              to={subject.viewDetailPath}
                              style={{
                                color: "black",
                                fontWeight: "bold",
                              }}
                              className="details-hover"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                        <ul className="ps-3">
                          {subject.topics.map((topic, i) => (
                            <li key={i}>
                              <h6>{topic}</h6>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <hr className="m-0" />

                      {/* Footer */}
                      <div className="text-center p-3">
                        <p className="text-success mt-3 fw-bold">
                          ⚡ Prices Starting at just ₹{subject.price}
                        </p>

                        <Button
                          name="Enroll Now"
                          className="btn-dark fs-6 form-control mb-2 subscribe-button"
                          onClick={() => goToPlans(subject.enrollplanPath)}
                        />

                        <button
                          className="btn btn-link w-100 details-hover"
                          style={{ color: "black", fontWeight: "500" }}
                        >
                          Take Demo MockTest
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* start exploring */}
      <div
        className="start-exploring mt-5 py-5 text-center rounded-3"
        style={{ backgroundColor: "#ffffff" }}
      >
        <h4 className="fw-bolder">Take Control of Your Learning</h4>
        <p className="fw-semibold">
          Discover subjects and choose your path to DCGA exam success
        </p>

        <div className="row align-items-center">
          <div className="col-sm-4"></div>
          <div className="col-sm-4 text-center">
            <Button
              name="Start Exploring"
              className="btn-dark btn-lg fs-6 subscribe-button"
            />
          </div>
          <div className="col-sm-4 text-center">
            <img
              src={airplane}
              alt="airplane"
              style={{ marginTop: "-25px", maxWidth: "100px" }}
            />
          </div>
        </div>
      </div>

      {/* combo subject */}
      <div className="dash-combo-subject mt-5">
        <h3 className="fw-bold my-2 mb-4">Combo Subjects</h3>
        <hr />
        <DashComboSubject withSpacing={false} />
      </div>
    </div>
  );
}

export default DashboardHome;

