import React, { useEffect, useState } from "react";
function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return (
      (hours < 10 ? "0" + hours : hours) +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const btnStyle = {
    flex: 1,
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    color: "white",
  };
  return (
    <div
      style={{
        height: "95vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#22254b",
          padding: "40px",
          borderRadius: "25px",
          width: "350px",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{ color: "#ffffff", fontSize: "24px", marginBottom: "20px" }}
        >
          React Timer
        </h1>

        <div
          style={{
            fontSize: "55px",
            fontWeight: "bold",
            color: "#00d2ff",
            marginBottom: "30px",
          }}
        >
          {formatTime()}
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <button
            style={{ ...btnStyle, background: "#00b4db" }}
            onClick={() => setIsRunning(true)}
          >
            Start
          </button>

          <button
            style={{ ...btnStyle, background: "#f12711" }}
            onClick={() => setIsRunning(false)}
          >
            Pause
          </button>

          <button
            style={{ ...btnStyle, background: "#555" }}
            onClick={() => {
              setIsRunning(false);
              setTime(0);
            }}
          >
            Reset
          </button>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            style={{ ...btnStyle, background: "#333", color: "#aaa" }}
            onClick={() => setTime((prev) => prev + 10)}
          >
            +10 sec
          </button>

          <button
            style={{ ...btnStyle, background: "#333", color: "#aaa" }}
            onClick={() => setTime((prev) => (prev >= 10 ? prev - 10 : 0))}
          >
            -10 sec
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;