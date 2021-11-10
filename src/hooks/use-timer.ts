import { useState, useEffect } from "react";

const useTimer = () => {
  const pad = (n: number) => {
    return ("0" + n).slice(-2);
  };
  const [timerRunning, setTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [timer, setTimer] = useState("00:00:00");

  const startTimer = () => {
    setTimerRunning(true);
    setStartTime(new Date().getTime());
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerRunning) {
        const currentTime = new Date().getTime();
        const timeDiff = new Date(currentTime - startTime);
        setTimer(
          `${pad(timeDiff.getMinutes())}:${pad(timeDiff.getUTCSeconds())}:${pad(
            Math.floor(timeDiff.getMilliseconds() / 16.66667)
          )}`
        );
      }
    }, 1);

    return () => clearInterval(interval);
  }, [timerRunning, startTime]);

  return {
    timer,
    startTimer,
    stopTimer,
  };
};

export default useTimer;
