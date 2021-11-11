import React, { useRef, useEffect, useCallback } from "react";
import CountryGlobe from "../country-globe";
import classes from "./Globe.module.css";
import { useAppDispatch } from "../hooks/redux-hooks";
import { gameActions } from "../store";

const Globe = () => {
  const dispatch = useAppDispatch();
  const globeRef = useRef<HTMLDivElement | null>(null);
  let globe: CountryGlobe;

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
    globe = new CountryGlobe(globeRef.current as Element);
    globe.getCountryList().then((result: string[]) => {
      dispatch(gameActions.setCountryList(result));
    });

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
