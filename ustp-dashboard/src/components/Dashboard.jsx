import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard({ data }) {
  const labels = data.history.map((e) =>
    new Date(e.timestamp).toLocaleTimeString()
  );

  // Latest values for cards
  const latest = data.history[data.history.length - 1] || {};

  const configs = [
    { label: "Voltage (V)", key: "voltage" },
    { label: "Current (A)", key: "current" },
    { label: "Power (W)", key: "power" },
  ];

  return (
    <section className="dashboard">
      <div className="cards">
        <div className="card">
          <strong>Voltage:</strong> {latest.voltage?.toFixed(2) || "--"} V
        </div>
        <div className="card">
          <strong>Current:</strong> {latest.current?.toFixed(2) || "--"} A
        </div>
        <div className="card">
          <strong>Power:</strong> {latest.power?.toFixed(2) || "--"} W
        </div>
      </div>

      {configs.map(({ label, key }) => {
        const chartData = {
          labels,
          datasets: [
            {
              label,
              data: data.history.map((e) => e[key]),
              fill: false,
              backgroundColor: "#4db8ff",
              borderColor: "#3399ff",
              tension: 0.3,
            },
          ],
        };

        const options = {
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: label },
          },
          scales: { y: { beginAtZero: true } },
        };

        return (
          <div className="chart-container" key={key}>
            <Line data={chartData} options={options} />
          </div>
        );
      })}
    </section>
  );
}