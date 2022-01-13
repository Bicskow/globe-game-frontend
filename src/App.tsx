import React, { useEffect } from "react";
import "./App.css";
import MainPage from "./components/MainPage";
import ReactGA from "react-ga4";

function App() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.initialize("G-EBFKQ7Y5DX");
      ReactGA.send("pageview");
    }
  }, []);

  return <MainPage></MainPage>;
}

export default App;
