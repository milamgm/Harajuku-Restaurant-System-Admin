import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChar = ({analitics}) => {
  const options = {
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          stepSize: 8,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "",
      },
    },
  };

  const labels = ["Mon", "Die", "Mie", "Don", "Fre", "Sam", "Son"];
  const data = {
    labels,
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        label: "Clients",
        data: [9, 2, 9, 9, 3, 4, 9, 5, 9],
        backgroundColor: "rgba(0, 133, 190, 0.591)",
      },
      {
        label: "Profit",
        data: [1, 6, 3, 9, 7, 4,5, 5, 6],
        backgroundColor: "rgba(255, 19, 19, 0.591)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChar;
