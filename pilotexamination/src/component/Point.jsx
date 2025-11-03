import React from 'react'
import './Point.css'
import point1 from '../assets/images/point-1.svg';
import point2 from '../assets/images/point-2.svg';
import homesvg from '../assets/images/homesvg.svg';
function Point() {
    return (
        <div className='container point-section'>
            <div className='row mt-5 '>
                <div className="col-md-6 col-sm-6">
                    <h2>Schedule that
                        <br />
                        works for you
                    </h2>
                    <p>Enroll in unlimited Mock tests, Give test as per your convinent</p>
                </div>
                <div className="col-md-6 col-sm-6">
                    <img src={point1} alt="point1" />
                </div>
            </div>
            <div className='row mt-5'>
                <div className="col-md-6 col-sm-6 ">
                    <h2>Learn anytime,
                        <br />
                        anywhere
                    </h2>
                    <p>Practice tests from the comfort of your
                        <br />
                        mobile, PC or tablet
                    </p>
                </div>
                <div className="col-md-6 col-sm-6 ">
                    <img src={point2} alt="point1" />
                </div>
            </div>
            <div className='row mt-5'>
                <div className="col-md-6 col-sm-6 ">
                    <h2>Real DGCA like
                        <br />
                        Exam Pattern
                    </h2>
                    <p>Take mock tests curated in line with the exam pattern to measure your progress, and stay on track</p>
                </div>
                <div className="col-md-6 col-sm-6">
                    <img src={homesvg} alt="point1" />
                </div>
            </div>
        </div>

    )
}

export default Point