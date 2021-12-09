import React, { useRef, useEffect, useCallback } from "react";
import CountryGlobe from "../country-globe";
import classes from "./Globe.module.css";
import { useAppDispatch } from "../hooks/redux-hooks";
import { gameActions, GameStep, GameType } from "../store";
import { useAppSelector } from "../hooks/redux-hooks";

let globe: CountryGlobe | null = null;

const Globe = () => {
  const { gameType, gameStep, currentQuestion, questions } = useAppSelector(
    (state) => state.game
  );
  const dispatch = useAppDispatch();
  const globeRef = useRef<HTMLDivElement | null>(null);

  const countrySelected = useCallback(
    (event: CustomEvent) => {
      dispatch(gameActions.countrySelected(event.detail as string));
    },
    [dispatch]
  );

  const countryGlobeLoaded = useCallback(
    (event: CustomEvent) => {
      dispatch(gameActions.setGlobeLoaded(true));
    },
    [dispatch]
  );

  useEffect(() => {
    if (
      gameType === GameType.Quiz &&
      gameStep === GameStep.InGame &&
      currentQuestion >= 0
    ) {
      let answer = questions[currentQuestion].correctAnswer;
      globe?.zoomToCountry(answer);
      globe?.highlightCounty(answer);
    }
  }, [gameStep, currentQuestion, questions, gameType]);

  useEffect(() => {
    if (gameType === GameType.Quiz) {
      globe?.setHighlightOnClickEnabled(false);
    } else {
      globe?.setHighlightOnClickEnabled(true);
    }
  }, [gameType]);

  useEffect(() => {
    if (globe === null) {
      globe = new CountryGlobe(globeRef.current as Element);
    } else {
      globe.setContainer(globeRef.current as Element);
      globe.fitToClientSize();
      globe.removeCountryHighlight();
      globe.setDefaultCoords();
    }
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
  }, [countryGlobeLoaded, countrySelected, dispatch]);

  return <div className={classes.globe} ref={globeRef}></div>;
};

export default Globe;
