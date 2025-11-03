import React from 'react'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import check from '../assets/images/check.svg'
import './Rating.css'
function Rating() {
    return (
        <div className="bg-light py-5 rating-section ">
            <div className='container'>
                <div className="row p-2 ">
                    {/* Left Side - Rating */}
                    <div className="col-lg-5 col-md-5 col-sm-12 text-left mb-4 mb-md-0">
                        <h1 className="display-4 mb-2" >
                            4.9
                        </h1>
                        <div className="d-flex align-items-start mb-2">
                            <FaStar color="#ffd900bd" size={30} className='star'/>
                            <FaStar color="#ffd900bd" size={30} className='star'/>
                            <FaStar color="#ffd900bd" size={30} className='star'/>
                            <FaStar color="#ffd900bd" size={30} className='star'/>
                            <FaStarHalfAlt color="#ffd900bd" size={30} className='star'/>
                        </div>
                        <p className="text-muted mb-0">Google Ratings</p>
                    </div>
                    {/* Right Side - Features List */}
                    <div className="col-lg-7 col-md-7  col-sm-12">
                        <ul className="list-unstyled mb-0">
                            <li className="d-flex align-items-center mb-3">
                                <span
                                    className="me-3 "
                                >
                                    <img src={check} alt="check" />
                                </span>
                                <span>Detailed Solutions</span>
                            </li>
                            <li className="d-flex align-items-center mb-3">
                                <span
                                    className="me-3 "

                                >
                                    <img src={check} alt="check" />
                                </span>
                                <span >
                                    Unlimited Randomized Mock test
                                </span>
                            </li>
                            <li className="d-flex align-items-center mb-3">
                                <span
                                    className="me-3 "

                                >
                                    <img src={check} alt="check" />
                                </span>
                                <span >Real DGCA Exam Like feel</span>
                            </li>
                            <li className="d-flex align-items-center">
                                <span
                                    className="me-3 text-warning"

                                >
                                    <img src={check} alt="check" />
                                </span>
                                <span >100+ Happy Students</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rating