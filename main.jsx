import React from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));

async function fetchReward() {
  const res = await fetch("https://reeward-backend.onrender.com/reward/testuser");
  const data = await res.json();
  return data;
}

function App() {
  const [reward, setReward] = React.useState(null);
  const [timeLeft, setTimeLeft] = React.useState(300);

  React.useEffect(() => {
    fetchReward().then(setReward);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progress = reward ? Math.min((reward.total_earned / 5) * 100, 100) : 0;

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1>Benvenuto su Reeward!</h1>
      {reward ? (
        <div>
          <p><strong>Utente:</strong> {reward.user_id}</p>
          <p><strong>Guadagno:</strong> €{reward.total_earned.toFixed(2)}</p>
          <p><strong>Prelevabile:</strong> {reward.can_withdraw ? "Sì" : "No"}</p>
          <div style={{ marginTop: "20px" }}>
            <p>⏱️ Tempo rimanente: <strong>{formatTime(timeLeft)}</strong></p>
            <div style={{ background: "#eee", height: "20px", borderRadius: "10px", overflow: "hidden" }}>
              <div style={{ width: `${progress}%`, background: "#4caf50", height: "100%" }}></div>
            </div>
            <p style={{ textAlign: "center", marginTop: "5px" }}>{progress.toFixed(1)}% verso i 5€</p>
          </div>
        </div>
      ) : (
        <p>Caricamento dati...</p>
      )}
    </div>
  );
}

root.render(<App />);