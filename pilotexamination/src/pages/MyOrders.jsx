
// function MyOrders() {
//   return (
//     <div className="container-fluid ">
//       <h3 className="fw-bold my-2 mb-4 mt-4">My Orders</h3>
//       <hr />
//     </div>
//   );
// }

// export default MyOrders;




// import React from "react";
// import "./MyOrders.css"; 

// export default function MyOrders() {
//   // --- STATIC DATA (You can replace with API later) ---
//   const orders = [
//     {
//       id: "#669",
//       course: "Air Meteorology",
//       duration: "1 month",
//       purchaseDate: "05 January 2024",
//       validTill: "05 February 2024",
//       status: "Expired",
//       total: "₹499",
//       validMessage: "Valid till : 05 February 2024",
//     },
//     {
//       id: "#82",
//       course: "Air Meteorology",
//       duration: "12 month",
//       purchaseDate: "17 March 2022",
//       validTill: "17 March 2023",
//       status: "Expired",
//       total: "₹4999",
//       validMessage: "Valid till : 17 March 2023",
//     },
//     {
//       id: "#80",
//       course: "Air Regulation",
//       duration: "12 month",
//       purchaseDate: "17 March 2022",
//       validTill: "17 March 2023",
//       status: "Expired",
//       total: "₹4999",
//       validMessage: "Valid till : 17 March 2023",
//     },
//   ];

//   return (
//     <div className="container my-4">
//       <h3 className="fw-bold mb-3">My Orders</h3>
//       <hr />

//       {orders.map((item, index) => (
//         <div
//           key={index}
//           className="p-4 my-4 shadow-sm rounded"
//           style={{ background: "#fff", border: "1px solid #eee" }}
//         >
//           <div className="row">
//             {/* Course Name */}
//             <div className="col-md-3">
//               <p className="fw-semibold mb-1">{item.course}</p>
//               <p className="text-muted mb-0">Order {item.id}</p>
//             </div>

//             {/* Duration */}
//             <div className="col-md-2">
//               <p className="fw-semibold mb-1">Duration</p>
//               <p className="mb-0">{item.duration}</p>
//             </div>

//             {/* Purchase Date */}
//             <div className="col-md-2">
//               <p className="fw-semibold mb-1">Purchase Date</p>
//               <p className="mb-0">{item.purchaseDate}</p>
//             </div>

//             {/* Valid Till */}
//             <div className="col-md-2">
//               <p className="fw-semibold mb-1">Valid Till</p>
//               <p className="mb-0">{item.validTill}</p>
//             </div>

//             {/* Status */}
//             <div className="col-md-1">
//               <p className="fw-semibold mb-1">Status</p>
//               <span
//                 className="badge "
//                 style={{ backgroundColor: "#e6e6e6", color: "#000" }}
//               >
//                 {item.status}
//               </span>
//             </div>

//             {/* Total */}
//             <div className="col-md-2">
//               <p className="fw-semibold mb-1">Total</p>
//               <p className="mb-0">{item.total}</p>
//             </div>
//           </div>

//           <hr />

//           {/* Bottom Area */}
//           <div className="d-flex justify-content-between align-items-center">
//             <p className="text-danger fw-semibold mb-0">{item.validMessage}</p>

//             <button className="btn btn-dark px-4">Renew Now</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }



// import React from "react";
// import "./MyOrders.css";
// import Button from "../component/Button";

// export default function MyOrders() {
//   const orders = [
//     {
//       id: "#669",
//       course: "Air Meteorology",
//       duration: "1 month",
//       purchaseDate: "05 January 2024",
//       validTill: "05 February 2024",
//       status: "Expired",
//       total: "₹499",
//       validMessage: "Valid till : 05 February 2024",
//     },
//     {
//       id: "#82",
//       course: "Air Meteorology",
//       duration: "12 month",
//       purchaseDate: "17 March 2022",
//       validTill: "17 March 2023",
//       status: "Expired",
//       total: "₹4999",
//       validMessage: "Valid till : 17 March 2023",
//     },
//     {
//       id: "#80",
//       course: "Air Regulation",
//       duration: "12 month",
//       purchaseDate: "17 March 2022",
//       validTill: "17 March 2023",
//       status: "Expired",
//       total: "₹4999",
//       validMessage: "Valid till : 17 March 2023",
//     },
//   ];

//   return (
//     <div className="container-fluid my-4">
//       <h3 className="fw-bold mb-3">My Orders</h3>
//       <hr />

//       {orders.map((item, index) => (
//         <div
//           key={index}
//           className="p-4 my-4 shadow-sm rounded single-order-card"
//           style={{ background: "#fff", border: "1px solid #eee" }}
//         >
//           {/* DESKTOP VIEW */}
//           <div className="d-none d-md-block">
//             <div className="row align-items-start">
//               <div className="col-md-2">
//                 <p className="fw-semibold mb-1">{item.course}</p>
//                 <p className="text-muted mb-0">Order {item.id}</p>
//               </div>

//               <div className="col-md-2">
//                 <p className="fw-semibold mb-1">Duration</p>
//                 <p className="mb-0">{item.duration}</p>
//               </div>

//               <div className="col-md-2">
//                 <p className="fw-semibold mb-1">Purchase Date</p>
//                 <p className="mb-0">{item.purchaseDate}</p>
//               </div>

//               <div className="col-md-2">
//                 <p className="fw-semibold mb-1">Valid Till</p>
//                 <p className="mb-0">{item.validTill}</p>
//               </div>

//               <div className="col-md-2">
//                 <p className="fw-semibold mb-1">Status</p>
//                 <span
//                   className="badge px-3 py-2"
//                   style={{ backgroundColor: "#e6e6e6", color: "#000" }}
//                 >
//                   {item.status}
//                 </span>
//               </div>

//               <div className="col-md-2 text-start">
//                 <p className="fw-semibold mb-1">Total</p>
//                 <p className="mb-0">{item.total}</p>
//               </div>
//             </div>

//             <hr />

//             <div className="d-flex justify-content-end gap-3 align-items-center">
//               <p className="text-danger fw-semibold mb-0">{item.validMessage}</p>
//               <Button name="Renew Now" className="btn-dark fs-6 px-5"/>
//             </div>
//           </div>

//           {/* MOBILE VIEW */}
//           <div className="d-block d-md-none">
//             <p className="fw-semibold mb-1">{item.course}</p>
//             <p className="text-muted mb-3">Order {item.id}</p>

//             <p className="fw-semibold mb-1">Duration</p>
//             <p>{item.duration}</p>

//             <p className="fw-semibold mb-1">Purchase Date</p>
//             <p>{item.purchaseDate}</p>

//             <p className="fw-semibold mb-1">Valid Till</p>
//             <p>{item.validTill}</p>

//             {/* Status + Total on same line */}
//             <div className="d-flex justify-content-between align-items-center my-2">
//               <div>
//                 <p className="fw-semibold mb-1">Status</p>
//                 <span
//                   className="badge px-3 py-2"
//                   style={{ backgroundColor: "#e6e6e6", color: "#000" }}
//                 >
//                   {item.status}
//                 </span>
//               </div>

//               <div>
//                 <p className="fw-semibold mb-1">Total</p>
//                 <p className="mb-0">{item.total}</p>
//               </div>
//             </div>

//             <hr />

//             {/* Renew button full width */}
//             <button className="btn btn-dark w-100 mb-3">Renew Now</button>

//             {/* Valid Till Message */}
//             <p className="text-danger text-center fw-semibold">
//               {item.validMessage}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import Button from "../component/Button";
import axios from "axios";
import Loader from "../component/Loader";
import { subjectPaths } from "../assets/subjectPaths";
import { useNavigate } from "react-router-dom";


export default function MyOrders() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  /* -------- FETCH ORDERS API -------- */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `https://development.pilotexaminations.com/api/my-orders/${userId}`,

        );

        console.log("ORDERS API:", res.data);

        if (!res.data.error) {
          setOrders(res.data.orders || []);
        }
        setLoading(false);
      } catch (err) {
        console.log("Orders API Error:", err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);


  const handleRenew = (title) => {
    const subject = subjectPaths[title];

    if (!subject) {
      console.error("No enroll plan found for:", title);
      return;
    }

    navigate(subject.enrollplanPath);
  };

  if (loading) return <Loader message="Loading Orders....." />;

  return (
    <div className="container-fluid my-4">
      <h3 className="fw-bold mb-3">My Orders</h3>
      <hr />

      {orders.length === 0 && (
        <p className="text-center text-muted my-5">No orders found.</p>
      )}

      {orders.map((item, index) => (
        <div
          key={index}
          className="p-4 my-4 shadow-sm rounded single-order-card"
          style={{ background: "#fff", border: "1px solid #eee" }}
        >
          {/* DESKTOP VIEW */}
          <div className="d-none d-md-block">
            <div className="row align-items-start">
              <div className="col-md-2">
                <p className="fw-semibold mb-1">{item.title}</p>
                <p className="text-muted mb-0">Order #{item.order_id}</p>
              </div>

              <div className="col-md-2">
                <p className="fw-semibold mb-1">Duration</p>
                <p className="mb-0">{item.duration}</p>
              </div>

              <div className="col-md-2">
                <p className="fw-semibold mb-1">Purchase Date</p>
                <p className="mb-0">{item.purchase_date}</p>
              </div>

              <div className="col-md-2">
                <p className="fw-semibold mb-1">Valid Till</p>
                <p className="mb-0">{item.valid_till}</p>
              </div>


              <div className="col-md-2">
                <p className="fw-semibold mb-1">Status</p>
                <span
                  className="badge px-3 py-2"
                  style={{
                    backgroundColor: item.status === "Active" ? "#B3E7C7" : "#e6e6e6",
                    color:
                      item.status === "Active"
                        ? "#00b046ff"
                        : "#000000",

                  }}
                >
                  {item.status}
                </span>
              </div>


              <div className="col-md-2 text-start">
                <p className="fw-semibold mb-1">Total</p>
                <p className="mb-0">₹{item.amount}</p>
              </div>
            </div>

            <hr />

            <div className="d-flex justify-content-end gap-3 align-items-center">
              <p className="text-danger fw-semibold mb-0">
                Valid till : {item.valid_till}
              </p>

              
              {
                item.renew_available && (
                  <Button
                    name="Renew Now"
                    className="btn-dark fs-6 px-5"
                    onClick={() => handleRenew(item.title)}
                  />
                )
              }
            </div>
          </div>

          {/* MOBILE VIEW */}
          <div className="d-block d-md-none">
            <p className="fw-semibold mb-1">{item.title}</p>
            <p className="text-muted mb-3">Order #{item.order_id}</p>

            <p className="fw-semibold mb-1">Duration</p>
            <p>{item.duration}</p>

            <p className="fw-semibold mb-1">Purchase Date</p>
            <p>{item.purchase_date}</p>

            <p className="fw-semibold mb-1">Valid Till</p>
            <p>{item.valid_till}</p>

            {/* Status + Total */}
            <div className="d-flex justify-content-between align-items-center my-2">
              <div>
                <p className="fw-semibold mb-1">Status</p>
                <span
                  className="badge px-3 py-2"
                  style={{
                    backgroundColor: item.status === "Active" ? "#B3E7C7" : "#e6e6e6",
                    color:
                      item.status === "Active"
                        ? "#00b046ff"
                        : "#000000",

                  }}
                >
                  {item.status}
                </span>
              </div>

              <div>
                <p className="fw-semibold mb-1">Total</p>
                <p className="mb-0">₹{item.amount}</p>
              </div>
            </div>

            <hr />

              {
                item.renew_available && (
                  <Button
                    name="Renew Now"
                    className="btn-dark fs-6 px-5"
                    onClick={() => handleRenew(item.title)}
                  />
                )
              }

            

            <p className="text-danger text-center fw-semibold">
              Valid till : {item.valid_till}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
