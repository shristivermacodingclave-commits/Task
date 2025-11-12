// import React from 'react'
// import './Testimonials.css'
// import { testimonials } from "../assets/Testimonials";
// function chunk(arr, size) {
//     const out = [];
//     for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
//     return out;
// }
// function Testimonials() {
//       const slides = chunk(testimonials, 3);
//     return (
//         <div className='testimonial-outer-section'>
//         <div className="container py-4 testimonial-section">
//             <h1 className='main-title'>Students<br />Testimonial</h1>
//             <div className="row">
//                 <div className="col-md-12 col-sm-12 ">
//                     <p className="mt-4 sub-title-testimonial">
//                         Over 200+ students have cleared CPL and ATPL papers using PilotExaminations test series , here are few stories.
//                     </p>
//                 </div>
//             </div>
//         </div>

//                 {/* testimonials */ }
//     <div id="testimonialCarousel"
//         className="carousel slide"
//         data-bs-ride="carousel"
//         data-bs-interval="5000"
//         data-bs-pause="hover">


//         {/* dots */}
//         <div className="carousel-indicators">
//             {slides.map((_, i) => (
//                 <button key={i}
//                     type="button"
//                     data-bs-target="#testimonialCarousel"
//                     data-bs-slide-to={i}
//                     className={i === 0 ? "active" : ""}
//                     aria-current={i === 0 ? "true" : "false"}
//                     aria-label={`Slide ${i + 1}`}
//                 />
//             ))}
//         </div>

//         {/* slides */}
//         <div className="carousel-inner">
//             {slides.map((group, i) => (
//                 <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={i}>
//                     <div className="row g-3">
//                         {group.map((t) => (
//                             <div className="col-12 col-md-6 col-lg-4" key={t.id}>
//                                 <article className="t-card" style={{ background: t.bg }}>
//                                     <p className="t-text">{t.text}</p>

//                                     <div className="t-footer">
//                                         <img className="t-avatar" src={t.avatar} alt={t.name} />
//                                         <span className="t-name">{t.name}</span>
//                                     </div>
//                                 </article>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ))}
//         </div>

//         {/* arrows (optional) */}
//         <button className="carousel-control-prev" type="button"
//             data-bs-target="#testimonialCarousel" data-bs-slide="prev">
//             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//             <span className="visually-hidden">Previous</span>
//         </button>
//         <button className="carousel-control-next" type="button"
//             data-bs-target="#testimonialCarousel" data-bs-slide="next">
//             <span className="carousel-control-next-icon" aria-hidden="true"></span>
//             <span className="visually-hidden">Next</span>
//         </button>
//     </div>
//   </div>
//   )

// }

// export default Testimonials



import React, { useEffect, useState } from 'react';
import './Testimonials.css';
import axios from 'axios';

function chunk(arr, size) {
    const out = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
}

function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://development.pilotexaminations.com/api/testimonials')
            .then((response) => {
                if (!response.data.error) {
                    const colors = ["#EAF6E8", "#EAEAF6", "#E7F3FF"];
                    const fetchedData = response.data.data.map((item, index) => ({
                        id: index + 1,
                        text: item.review_message,
                        name: item.user_name,
                        avatar: `https://i.pravatar.cc/64?img=${index + 10}`,
                        bg: colors[index % colors.length]
                    }));

                    // If fewer than 9 testimonials, repeat them to fill slides
                    const minSlides = 9;
                    const data = fetchedData.length < minSlides
                        ? Array(Math.ceil(minSlides / fetchedData.length))
                            .fill(fetchedData)
                            .flat()
                            .slice(0, minSlides)
                        : fetchedData;

                    setTestimonials(data);
                } else {
                    setError("Error fetching testimonials");
                }
            })
            .catch(() => setError("Failed to load testimonials"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-center py-5">Loading testimonials...</p>;
    if (error) return <p className="text-center text-danger py-5">{error}</p>;

    const slides = chunk(testimonials, 3);

    return (
        <div className='testimonial-outer-section'>
            <div className="container py-4 testimonial-section">
                <h1 className='main-title'>Students<br />Testimonial</h1>
                <div className="row">
                    <div className="col-md-12 col-sm-12 ">
                        <p className="mt-4 sub-title-testimonial">
                            Over 200+ students have cleared CPL and ATPL papers using PilotExaminations test series , here are few stories.
                        </p>
                    </div>
                </div>
            </div>

            {/* testimonials */}
            <div id="testimonialCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
                data-bs-interval="5000"
                data-bs-pause="hover"
                data-bs-wrap="true">

                {/* dots */}
                <div className="carousel-indicators">
                    {slides.map((_, i) => (
                        <button key={i}
                            type="button"
                            data-bs-target="#testimonialCarousel"
                            data-bs-slide-to={i}
                            className={i === 0 ? "active" : ""}
                            aria-current={i === 0 ? "true" : "false"}
                            aria-label={`Slide ${i + 1}`}
                        />
                    ))}
                </div>

                {/* slides */}
                <div className="carousel-inner">
                    {slides.map((group, i) => (
                        <div className={`carousel-item ${i === 0 ? "active" : ""}`} key={i}>
                            <div className="row g-3">
                                {group.map((t) => (
                                    <div className="col-12 col-md-6 col-lg-4" key={t.id}>
                                        <article className="t-card" style={{
                                            background: t.bg,
                                            padding: "1.5rem",
                                            borderRadius: "32px",
                                            minHeight: "28rem"
                                        }}>
                                            <p className="t-text">{t.text}</p>
                                            <div className="t-footer">
                                                <img className="t-avatar" src={t.avatar} alt={t.name} />
                                                <span className="t-name">{t.name}</span>
                                            </div>
                                        </article>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* arrows */}
                <button className="carousel-control-prev" type="button"
                    data-bs-target="#testimonialCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button"
                    data-bs-target="#testimonialCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Testimonials;
