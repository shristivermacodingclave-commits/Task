// src/context/PurchaseContext.js

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const PurchaseContext = createContext();

export const PurchaseProvider = ({ children }) => {
  const BASE_URL = "https://development.pilotexaminations.com/";

  const [purchasedIds, setPurchasedIds] = useState([]);       // ONLY IDs
  const [loadingPurchase, setLoadingPurchase] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    let userId = null;

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        userId = parsed?.id || parsed?.user_id || parsed?.data?.id;
      } catch {
        console.warn("Invalid User Found");
      }
    }

    if (!userId) {
      console.log("No user ID → skipping purchase load");
      setLoadingPurchase(false);
      return;
    }

    axios
      .post(`${BASE_URL}api/subjects`, { user_id: userId })
      .then((res) => {
       

        const subjects = res.data?.subjects || [];

        // ✔ Extract purchased subject IDs
        const purchased = subjects
          .filter((sub) => sub.allow_mocktest === true)
          .map((sub) => sub.subject_id);

        setPurchasedIds(purchased);
        console.log("Subjects (Purchase Context):", purchased);
      })
      .catch((err) => {
        console.error("PurchaseContext Error:", err);
        setPurchasedIds([]);
      })
      .finally(() => setLoadingPurchase(false));
  }, []);

  return (
    <PurchaseContext.Provider value={{ purchasedIds, loadingPurchase }}>
      {children}
    </PurchaseContext.Provider>
  );
};

export const usePurchase = () => useContext(PurchaseContext);
