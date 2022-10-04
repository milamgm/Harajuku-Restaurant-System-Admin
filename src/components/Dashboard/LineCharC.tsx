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
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineCharC = ({ labelsQ, dataQ, color }) => {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
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

  const labels = labelsQ//["18h", "19h", "20h", "21h", "22h", "23h", "24h"];
  const data = {
    labels,
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        label: "Dataset 1",
        data: dataQ,
        backgroundColor: color,
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default LineCharC;
