import React, { useContext } from "react";
import { LoaderContext } from "./LoaderContext";
import "./planeLoader.css";

export default function GlobalLoader() {
  const { loading } = useContext(LoaderContext);

  if (!loading) return null;

  return (
    <div id="loading">
      <div id="loader">
        <lottie-player
          src="https://assets9.lottiefiles.com/packages/lf20_cwyrgj4k.json"
          background="transparent"
          speed="1"
          style={{ width: "100%" }}
          loop
          autoplay
        ></lottie-player>
      </div>

      <h1>Fasten Your Seatbelts</h1>
      <p>Loading Best User Experience</p>
    </div>
  );
}
