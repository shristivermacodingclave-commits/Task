import Carousel from 'react-bootstrap/Carousel';
import DashBanner from '../component/DashBanner'; 
import Subject from '../component/Subject';
import ComboSubject from '../component/ComboSubject';
import airplane from '../assets/images/airplanflight.png'
import Button from '../component/Button';
import './Dashboard.css';

function DashboardHome() {
  return (
  
        <div className="container-fluid " style={{backgroundColor:"#f9faf744"}} >
          {/* dash banner */}
          <DashBanner dashtitle={"Hi Ashish Sharma,"} />

          {/* related subject */}
          <div className='related-subjects'> 
          <h3 className="fw-bold my-2 mb-4">Related Subjects</h3>
          <hr/>

          <Carousel
            indicators
            controls={false}  // hide arrows
            interval={3000}
            pause="hover"
            className="mt-4"
          >
            <Carousel.Item>
              <Subject title="Mathematics" showDescription={false} withSpacing={false} />
            </Carousel.Item>
            <Carousel.Item>
              <Subject title="Science" showDescription={false} withSpacing={false} />
            </Carousel.Item>
            <Carousel.Item>
              <Subject title="English" showDescription={false} withSpacing={false} />
            </Carousel.Item>
          </Carousel>
          </div>

           {/* start exploring */}

           <div className=' start-exploring mt-5 py-5 text-center rounded-3 'style={{backgroundColor:"#ffffff"}}>
              <h4 className='fw-bolder '>Take Control of Your Learning</h4>
              <p className='fw-semibold'>Discover subjects and choose your path to DCGA exam success</p>

               <div className="row">
                <div className="col-sm-4 col-md-4 text-center"></div>
                <div className="col-sm-4 col-md-4 text-center">
                  {/* <button  className='btn btn-dark text-white p-2 btn-lg'>
                 Start Exploring
               </button> */}
                <Button name="Start Exploring" className="btn-dark btn-lg px-5" />
                </div>
                <div className="col-sm-4 col-md-4 text-center">
                   <img src={airplane} alt="airplane"  style={{marginTop:"-25px"}}/>
                </div>
               </div>
               
           </div>


           {/* combosubject */}
           <div className='dash-combo-subject mt-5'>
             <h3 className="fw-bold my-2 mb-4">Combo Subjects</h3>
             <hr />

             <ComboSubject withSpacing={false}/>
           </div>
        </div>

  );
}

export default DashboardHome;
