import { useState, useEffect } from "react";

const useTimer = () => {
  const pad = (n: number) => {
    return ("0" + n).slice(-2);
  };
  const timerRunning = true;
  const startTime = new Date();
  const [timer, setTimer] = useState("00:00:00");

  const startTimer = () => {};

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerRunning) {
        const currentTime = new Date();
        const timeDiff = new Date(currentTime.getTime() - startTime.getTime());
        setTimer(
          `${pad(timeDiff.getMinutes())}:${pad(timeDiff.getUTCSeconds())}:${pad(
            Math.floor(timeDiff.getMilliseconds() / 16.66667)
          )}`
        );
      }
    }, 1);

    return () => clearInterval(interval);
  }, []);

  return {
    timer,
    startTimer,
  };
};

export default useTimer;
