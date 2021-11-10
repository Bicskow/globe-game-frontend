import React, { useRef, useEffect, useCallback } from "react";
import CountryGlobe from "../country-globe";
import classes from "./Globe.module.css";
import { useAppDispatch } from "../hooks/redux-hooks";
import { gameActions } from "../store";

const Globe = () => {
  const dispatch = useAppDispatch();
  const globeRef = useRef<HTMLDivElement | null>(null);

  const countrySelected = (event: CustomEvent) => {
    console.log("SELECTED");
    console.log(event.detail);
  };

  const countryGlobeLoaded = useCallback(
    (event: CustomEvent) => {
      dispatch(gameActions.setGlobeLoaded(true));
    },
    [dispatch]
  );

  useEffect(() => {
    new CountryGlobe(globeRef.current as Element);

    globeRef.current?.addEventListener(
      "country_selected",
      countrySelected as EventListener
    );

    globeRef.current?.addEventListener(
      "country_globe_loaded",
      countryGlobeLoaded as EventListener
    );
  }, [countryGlobeLoaded]);

  return <div className={classes.globe} ref={globeRef}></div>;
};

export default Globe;
