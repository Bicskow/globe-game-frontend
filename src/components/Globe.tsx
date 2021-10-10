import React, { useRef, useEffect } from "react";
import CountryGlobe from "../country-globe";

const Globe = () => {
  const globeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log(globeRef);
    new CountryGlobe(globeRef.current as Element);

    globeRef.current?.addEventListener(
      "country_selected",
      countrySelected as EventListener
    );
  }, []);

  const countrySelected = (event: CustomEvent) => {
    console.log("SELECTED");
    console.log(event.detail);
  };

  return <div style={{ height: "500px" }} ref={globeRef}></div>;
};

export default Globe;
