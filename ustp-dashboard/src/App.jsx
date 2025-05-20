import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";

function App() {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://appdev-energysensorbackend.onrender.com/api/readings";

  const fetchReadings = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setReadings(data);
      setLoading(false);
    } catch (e) {
      console.error("Fetch error:", e);
      setError("Unable to load data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReadings();
    const id = setInterval(fetchReadings, 60000);
    return () => clearInterval(id);
  }, []);

  const totalEnergy = readings.reduce((sum, r) => sum + (r.energy || 0), 0);
  const history = readings.map((r) => ({
    timestamp: r.timestamp,
    voltage: r.voltage,
    current: r.current,
    power: r.power,
    usage: r.energy, 
  }));

  return (
    <main>
      <h1>USTP Electricity Dashboard</h1>
      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <Dashboard data={{ total: totalEnergy, history }} />
      )}
    </main>
  );
}

export default App;