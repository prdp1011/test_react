import "./styles.css";
import { useEffect, useState, memo } from "react";
function StopWatchFn() {
  const [timer, setTimer] = useState(0);
  const [isActive, setActive] = useState(false);
  //  action start -> stop -> reset
  // onChangeAction
  //  (timer/10 * 100) % 60 = 1s &   (timer/(10 * 100 * 60)) % 60= 1min
  // (timer/10) % 100
  const attachEvents = () => {
    document.addEventListener("keydown", (event) => {
      if (event.keyCode === 13) {
        setActive((active) => !active);
      }
    });
  };
  useEffect(() => {
    attachEvents();
  }, []);
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = scheduler();
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const formateData = (time) => {
    time = Math.floor(time);
    return time > 9 ? time : "0" + time;
  };

  const reset = () => {
    setActive(false);
    setTimer(0);
  };

  const scheduler = () => {
    return setInterval(() => {
      setTimer((timer) => timer + 10);
    }, 10);
  };

  return (
    <div className="App">
      <h1>Stop Watch</h1>
      <div>
        {formateData((timer / (10 * 100 * 60 * 12)) % 12)} :
        {formateData((timer / (10 * 100 * 60)) % 60)} :
        {formateData((timer / (10 * 100)) % 60)} :
        {formateData((timer / 10) % 100)}
      </div>
      <div>
        <button onClick={() => setActive((active) => !active)}>
          {isActive ? "Stop" : "Start"}
        </button>
        <button onClick={() => reset()}>Reset</button>
      </div>
    </div>
  );
}

// lazy load images
const StopWatch = memo(StopWatchFn);
export default function App() {
  return (
    <div className="App">
      <StopWatch />
    </div>
  );
}
