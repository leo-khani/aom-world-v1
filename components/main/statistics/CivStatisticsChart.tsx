"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mapping civilization IDs to names
const civilizationNames = {
  1: "Zeus",
  2: "Hades",
  3: "Poseidon",
  4: "Ra",
  5: "Isis",
  6: "Set",
  7: "Thor",
  8: "Odin",
  9: "Loki",
  10: "Kronos",
  11: "Oranos",
  12: "Gaia",
  13: "Freyr",
};

const CivStatisticsChart = ({ data }: any) => {
  const labels = data.map(
    (item: { winner_race_id: keyof typeof civilizationNames }) =>
      civilizationNames[item.winner_race_id]
  );
  const winRates = data.map((item: { win_rate: any }) => item.win_rate);

  // Calculate min and max win rates
  const maxWinRate = Math.max(...winRates);
  const minWinRate = Math.min(...winRates);

  // Function to get color based on win rate// Function to get Tailwind color based on win rate
  const getColor = (winRate: number) => {
    if (winRate >= maxWinRate - (maxWinRate - minWinRate) * 0.25) {
      return "rgba(34, 197, 94, 0.6)"; // Green-500
    } else if (winRate >= minWinRate + (maxWinRate - minWinRate) * 0.25) {
      return "rgba(251, 191, 36, 0.6)"; // Orange-500
    } else {
      return "rgba(239, 68, 68, 0.6)"; // Red-500
    }
  };
  const chartData = {
    labels,
    datasets: [
      {
        label: "Win Rate",
        data: winRates,
        backgroundColor: winRates.map(getColor), // Assign colors based on win rates
        barThickness: 20,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100, // Assuming win rates are between 0 and 100
      },
      x: {
        ticks: {
          callback: (value: string | number, index: number) => {
            // Return the civilization name for each tick
            return civilizationNames[
              data[index as number]
                .winner_race_id as keyof typeof civilizationNames
            ];
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Civilization Win Rates</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CivStatisticsChart;
