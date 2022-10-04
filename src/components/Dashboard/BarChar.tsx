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

const BarChar = ({ labelsQ, dataQ, color }) => {
  const options = {
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          stepSize: 10,
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
 
  const labels = labelsQ //["Mon", "Die", "Mie", "Don", "Fre", "Sam", "Son"];
  const data = {
    labels,
    datasets: [
      {
        label: "Clients",
        data: dataQ,
        backgroundColor: color,
      }
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChar;
