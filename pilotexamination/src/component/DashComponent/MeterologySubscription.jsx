// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Button from "../../component/Button";
// import meterology from "../../assets/images/Meterology.png";
// import "./MeterologySubscription.css"; 

// function MeteorologySubscription() {
//   const [selected, setSelected] = useState("12");

//   const plans = [
//     {
//       id: "12",
//       duration: "12 Month",
//       price: 5299,
//       oldPrice: 6288,
//       perMonth: 442,
//       saveText: "Save Extra 16%",
//       saveBg: "#d8ebd1",
//       saveColor: "green",
//       recommended: true,
//     },
//     {
//       id: "6",
//       duration: "6 Month",
//       price: 2879,
//       oldPrice: 3294,
//       perMonth: 480,
//       saveText: "Save Extra 13%",
//       saveBg: "#fffbd2",
//       saveColor: "#ecce39",
//     },
//     {
//       id: "3",
//       duration: "3 Month",
//       price: 1649,
//       oldPrice: 1797,
//       perMonth: 550,
//       saveText: "Save Extra 8%",
//       saveBg: "#fffbd2",
//       saveColor: "#ecce39",
//     },
//     {
//       id: "1",
//       duration: "1 Month",
//       price: 799,
//       oldPrice: 899,
//       saveBg: "bg-warning-subtle",
//       isShort: true,
//     },
//   ];

//   return (
//     <div className="container py-5 meteorology-container">
//       {/* ---- Heading ---- */}
//       <div className="row mb-5">
//         <div className="col text-center">
//           <h4 className="fw-semibold mb-1">Subscription Plans</h4>
//           <p className="text-muted small mb-0">
//             ⚡ Early Bird Discount for Limited Period Only
//           </p>
//         </div>
//       </div>

//       <div className="row justify-content-center align-items-start g-4">
//         {/* Left Card */}
//         <div className="col-md-4">
//           <div className="card border-0 shadow-sm rounded-4 h-100">
//             <img
//               src={meterology}
//               className="card-img-top rounded-top-4"
//               alt="Air Meteorology"
//               style={{ height: "200px" }}
//             />
//             <div className="card-body">
//               <h3 className="card-title my-3">Air Meteorology</h3>
//               <ul className="mb-0 ps-3 small fs-5">
//                 <li>Atmosphere</li>
//                 <li>Atmosphere Pressure</li>
//                 <li>Temperature</li>
//                 <li>Air Density</li>
//                 <li>And More...</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Right Plans */}
//         <div className="col-md-7">
//           {plans.map((plan, index) => (
//             <div key={plan.id} className="plan-wrapper position-relative">
//               {plan.recommended && index === 0 && (
//                 <div className="recommended-badge">Recommended</div>
//               )}

//               <div
//                 className={`plan-card d-flex align-items-center justify-content-between px-4 py-4 my-3 rounded-4 shadow-sm ${
//                   selected === plan.id ? "active" : ""
//                 } ${plan.isShort ? "short-card" : ""}`}
//                 onClick={() => setSelected(plan.id)}
//               >
//                 <div className="d-flex align-items-center gap-5">
//                   <input
//                     type="radio"
//                     className="plan-radio"
//                     checked={selected === plan.id}
//                     onChange={() => setSelected(plan.id)}
//                   />
//                   <div>
//                     <h6 className="mb-1 fw-semibold">{plan.duration}</h6>
//                     {plan.saveText && (
//                       <span
//                         className="badge"
//                         style={{
//                           backgroundColor: plan.saveBg,
//                           color: plan.saveColor,
//                           borderRadius: "10px",
//                         }}
//                       >
//                         {plan.saveText}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//                 <div className="text-end">
//                   <h5 className="mb-0 fw-bold">₹{plan.price}</h5>
//                   <small className="text-muted text-decoration-line-through">
//                     ₹{plan.oldPrice}
//                   </small>
//                   {!plan.isShort && (
//                     <div className="small text-muted">
//                       @ ₹{plan.perMonth} / month
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* Coupon and Review Section */}
//           <form className="mt-4">
//             <div className="coupon-card row g-3 align-items-center coupon-row my-5"  style={{backgroundColor:"#ffffff", borderRadius:"10px" , padding:"0rem 1rem 1rem 1rem"}}>
//               <div className="col-md-8 col-sm-8 col-7">
//                 <input
//                   type="text"
//                   className="form-control coupon-input"
//                   placeholder="Have a Coupon Code?"
//                 />
//               </div>
//               <div className="col-md-4 col-sm-4 col-5">
//                 <Button
//                   name="Apply Coupon"
//                   className="btn-dark w-100 coupon-btn "
//                 />
//               </div>
//               <div className="mt-2">
//                 <p className="small mb-0 fw-semibold invalid-text"style={{color:"#008000", fontSize:"1.1rem"}}>
//                   Coupon code not valid or does not exist
//                 </p>
//               </div>
//             </div>

//             <div className="mt-4">
//               <Button
//                 name={`Review Order →`}
//                 className="btn-dark w-100 py-3 fs-6"
//               />
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MeteorologySubscription;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Button from "../../component/Button";
// import meterology from "../../assets/images/Meterology.png";
// import "./MeterologySubscription.css";

// function MeteorologySubscription() {
//   const [selected, setSelected] = useState("12");
//   const [plans, setPlans] = useState([]);

//   // 🔥 Fetch Payment Plans API
//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const fetchPlans = async () => {
//     try {
//       const res = await axios.get(
//         "https://development.pilotexaminations.com/api/payment-plans/1"
//       );

//       if (res.data && res.data.plans) {
//         const apiPlans = res.data.plans.map((p) => {
//           const discountPercent = Math.round(
//             ((p.plan_price - p.selling_price) / p.plan_price) * 100
//           );

//           return {
//             id: p.months.toString(), // "12", "6", "3", "1"
//             duration: p.sub_title, // "12 Month"
//             price: p.selling_price, // selling
//             oldPrice: p.plan_price, // actual
//             perMonth:
//               p.months > 1
//                 ? Math.round(p.selling_price / p.months)
//                 : null,
//             saveText:
//               discountPercent > 0 ? `Save Extra ${discountPercent}%` : null,

//             saveBg:
//               p.months === 12
//                 ? "#d8ebd1"
//                 : p.months === 6
//                 ? "#fffbd2"
//                 : p.months === 3
//                 ? "#fffbd2"
//                 : "#fffbd2",
//             saveColor:
//               p.months === 12
//                 ? "green"
//                 : p.months === 6
//                 ? "#ecce39"
//                 : "#ecce39",

//             recommended: p.months === 12, // ⭐ biggest plan recommended
//             isShort: p.months === 1,
//           };
//         });

//         setPlans(apiPlans);
//       }
//     } catch (error) {
//       console.error("Failed to fetch plans:", error);
//     }
//   };

//   return (
//     <div className="container py-5 meteorology-container">
//       {/* ---- Heading ---- */}
//       <div className="row mb-5">
//         <div className="col text-center">
//           <h4 className="fw-semibold mb-1">Subscription Plans</h4>
//           <p className="text-muted small mb-0">
//             ⚡ Early Bird Discount for Limited Period Only
//           </p>
//         </div>
//       </div>

//       <div className="row justify-content-center align-items-start g-4">
//         {/* Left Card */}
//         <div className="col-md-4">
//           <div className="card border-0 shadow-sm rounded-4 h-100">
//             <img
//               src={meterology}
//               className="card-img-top rounded-top-4"
//               alt="Air Meteorology"
//               style={{ height: "200px" }}
//             />
//             <div className="card-body">
//               <h3 className="card-title my-3">Air Meteorology</h3>
//               <ul className="mb-0 ps-3 small fs-5">
//                 <li>Atmosphere</li>
//                 <li>Atmosphere Pressure</li>
//                 <li>Temperature</li>
//                 <li>Air Density</li>
//                 <li>And More...</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Right Plans */}
//         <div className="col-md-7">

//           {plans.length === 0 ? (
//             <p className="text-muted">Loading plans...</p>
//           ) : (
//             plans.map((plan, index) => (
//               <div key={plan.id} className="plan-wrapper position-relative">
//                 {plan.recommended && (
//                   <div className="recommended-badge">Recommended</div>
//                 )}

//                 <div
//                   className={`plan-card d-flex align-items-center justify-content-between px-4 py-4 my-3 rounded-4 shadow-sm ${
//                     selected === plan.id ? "active" : ""
//                   } ${plan.isShort ? "short-card" : ""}`}
//                   onClick={() => setSelected(plan.id)}
//                 >
//                   <div className="d-flex align-items-center gap-5">
//                     <input
//                       type="radio"
//                       className="plan-radio"
//                       checked={selected === plan.id}
//                       onChange={() => setSelected(plan.id)}
//                     />
//                     <div>
//                       <h6 className="mb-1 fw-semibold">{plan.duration}</h6>

//                       {plan.saveText && (
//                         <span
//                           className="badge"
//                           style={{
//                             backgroundColor: plan.saveBg,
//                             color: plan.saveColor,
//                             borderRadius: "10px",
//                           }}
//                         >
//                           {plan.saveText}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="text-end">
//                     <h5 className="mb-0 fw-bold">₹{plan.price}</h5>
//                     <small className="text-muted text-decoration-line-through">
//                       ₹{plan.oldPrice}
//                     </small>

//                     {!plan.isShort && (
//                       <div className="small text-muted">
//                         @ ₹{plan.perMonth} / month
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}

//           {/* Coupon */}
//           <form className="mt-4">
//             <div
//               className="coupon-card row g-3 align-items-center coupon-row my-5"
//               style={{
//                 backgroundColor: "#ffffff",
//                 borderRadius: "10px",
//                 padding: "0rem 1rem 1rem 1rem",
//               }}
//             >
//               <div className="col-md-8 col-sm-8 col-7">
//                 <input
//                   type="text"
//                   className="form-control coupon-input"
//                   placeholder="Have a Coupon Code?"
//                 />
//               </div>

//               <div className="col-md-4 col-sm-4 col-5">
//                 <Button
//                   name="Apply Coupon"
//                   className="btn-dark w-100 coupon-btn"
//                 />
//               </div>

//               <div className="mt-2">
//                 <p
//                   className="small mb-0 fw-semibold invalid-text"
//                   style={{ color: "#008000", fontSize: "1.1rem" }}
//                 >
//                   Coupon code not valid or does not exist
//                 </p>
//               </div>
//             </div>

//             <div className="mt-4">
//               <Button
//                 name={`Review Order →`}
//                 className="btn-dark w-100 py-3 fs-6"
//               />
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MeteorologySubscription;



import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../../component/Button";
import meterology from "../../assets/images/Meterology.png";
import "./MeterologySubscription.css";
import Loader from "../Loader";

function MeteorologySubscription() {
  const [selected, setSelected] = useState("12");
  const [plans, setPlans] = useState([]);
  const [topics, setTopics] = useState([]); // ⭐ NEW: dynamic topics

  // Fetch plans + topics from API
  useEffect(() => {
    fetchPlanData();
  }, []);

  const fetchPlanData = async () => {
    try {
      const res = await axios.get(
        "https://development.pilotexaminations.com/api/payment-plans/1"
      );

      // ⭐ Dynamic Topics
      if (res.data.topics) {
        setTopics(res.data.topics);
      }

      // ⭐ Dynamic Plans
      if (res.data.plans) {
        const apiPlans = res.data.plans.map((p) => {
          const discountPercent = Math.round(
            ((p.plan_price - p.selling_price) / p.plan_price) * 100
          );

          return {
            id: p.months.toString(),
            duration: p.sub_title,
            price: p.selling_price,
            oldPrice: p.plan_price,
            perMonth: p.months > 1 ? Math.round(p.selling_price / p.months) : null,
            saveText: discountPercent > 0 ? `Save Extra ${discountPercent}%` : null,

            saveBg:
              p.months === 12
                ? "#d8ebd1"
                : p.months === 6
                ? "#fffbd2"
                : p.months === 3
                ? "#fffbd2"
                : "#fffbd2",

            saveColor:
              p.months === 12
                ? "green"
                : p.months === 6
                ? "#ecce39"
                : "#ecce39",

            recommended: p.months === 12,
            isShort: p.months === 1,
          };
        });

        // Maintain your custom plan order
        const order = ["12", "6", "3", "1"];
        apiPlans.sort(
          (a, b) => order.indexOf(a.id) - order.indexOf(b.id)
        );

        setPlans(apiPlans);
      }
    } catch (err) {
      console.error("Error fetching subscription data:", err);
    }
  };

  return (
    <div className="container py-5 meteorology-container">
      {/* ---- Heading ---- */}
      <div className="row mb-5">
        <div className="col text-center">
          <h4 className="fw-semibold mb-1">Subscription Plans</h4>
          <p className="text-muted small mb-0">
            ⚡ Early Bird Discount for Limited Period Only
          </p>
        </div>
      </div>

      <div className="row justify-content-center align-items-start g-4">
        {/* LEFT CARD */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <img
              src={meterology}
              className="card-img-top rounded-top-4"
              alt="Air Meteorology"
              style={{ height: "200px" }}
            />

            <div className="card-body">
              <h3 className="card-title my-3">Air Meteorology</h3>

              <ul className="mb-0 ps-3 small fs-5">
                {topics.length === 0 ? (
                  <li>
                    <Loader message="Loading topics..." compact />
                  </li>
                ) : (
                  topics.slice(0, 4).map((t) => (
                    <li key={t.topic_id}>{t.topic_name}</li>
                  ))
                )}

                {/* Show “And More…” if topics > 4 */}
                {topics.length > 4 && <li>And More...</li>}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - PLANS */}
        <div className="col-md-7">

          {plans.length === 0 ? (
            <Loader message="Loading plans..." />
          ) : (
            plans.map((plan, index) => (
              <div key={plan.id} className="plan-wrapper position-relative">
                {plan.recommended && (
                  <div className="recommended-badge">Recommended</div>
                )}

                <div
                  className={`plan-card d-flex align-items-center justify-content-between px-4 py-4 my-3 rounded-4 shadow-sm ${
                    selected === plan.id ? "active" : ""
                  } ${plan.isShort ? "short-card" : ""}`}
                  onClick={() => setSelected(plan.id)}
                >
                  <div className="d-flex align-items-center gap-5">
                    <input
                      type="radio"
                      className="plan-radio"
                      checked={selected === plan.id}
                      onChange={() => setSelected(plan.id)}
                    />

                    <div>
                      <h6 className="mb-1 fw-semibold">{plan.duration}</h6>

                      {plan.saveText && (
                        <span
                          className="badge"
                          style={{
                            backgroundColor: plan.saveBg,
                            color: plan.saveColor,
                            borderRadius: "10px",
                          }}
                        >
                          {plan.saveText}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-end">
                    <h5 className="mb-0 fw-bold">₹{plan.price}</h5>
                    <small className="text-muted text-decoration-line-through">
                      ₹{plan.oldPrice}
                    </small>

                    {!plan.isShort && (
                      <div className="small text-muted">
                        @ ₹{plan.perMonth} / month
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Coupon Section */}
          <form className="mt-4">
            <div
              className="coupon-card row g-3 align-items-center coupon-row my-5"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                padding: "0rem 1rem 1rem 1rem",
              }}
            >
              <div className="col-md-8 col-sm-8 col-7">
                <input
                  type="text"
                  className="form-control coupon-input"
                  placeholder="Have a Coupon Code?"
                />
              </div>

              <div className="col-md-4 col-sm-4 col-5">
                <Button
                  name="Apply Coupon"
                  className="btn-dark w-100 coupon-btn"
                />
              </div>

              <div className="mt-2">
                <p
                  className="small mb-0 fw-semibold invalid-text"
                  style={{ color: "#008000", fontSize: "1.1rem" }}
                >
                  Coupon code not valid or does not exist
                </p>
              </div>
            </div>

            <div className="mt-4">
              <Button
                name={`Review Order →`}
                className="btn-dark w-100 py-3 fs-6"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MeteorologySubscription;
