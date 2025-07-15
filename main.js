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

  React.useEffect(() => {
    fetchReward().then(setReward);
  }, []);

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>Benvenuto su Reeward!</h1>
      {reward ? (
        <div>
          <p>Utente: {reward.user_id}</p>
          <p>Guadagno totale: €{reward.total_earned}</p>
          <p>Prelevabile: {reward.can_withdraw ? "Sì" : "No"}</p>
        </div>
      ) : (
        <p>Caricamento dati...</p>
      )}
    </div>
  );
}

root.render(<App />);