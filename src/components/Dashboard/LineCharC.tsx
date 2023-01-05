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

interface ILineCharC {
  labelsQ: string[];
  dataQ: string[];
  color: string;
}
const LineCharC = ({ labelsQ, dataQ, color }: ILineCharC) => {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 9,
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

  const labels = labelsQ;
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
