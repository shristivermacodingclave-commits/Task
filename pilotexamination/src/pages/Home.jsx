import './Home.css'
import Banner from '../component/Banner';
import Rating from '../component/Rating';
import Point from '../component/Point';
import Subject from '../component/Subject';
import ComboSubject from '../component/ComboSubject';
import Contact from '../component/Contact';
import Testimonials from '../component/Testimonials';
import Footer from '../component/Footer';

function Home() {
    return (

        <>
            <div className="container-fluid main-div">
                <Banner />
                <Rating />
                <Point />
                <Subject  title={<>Choose <br /> Subjects</>} subtitle={"If you are a fresher writing your CPL paper or an experienced pilot preparing for your ATPL we've got you covered in all scenarios."}  showDescription={true} />
                <ComboSubject title={<>Choose <br />Combo Subjects</>}/>
                <Testimonials />
                <Contact />
                <Footer />
            </div>


        </>
    )
}

export default Home;