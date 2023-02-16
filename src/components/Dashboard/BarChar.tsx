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
import { IAnalytics } from "../../scripts/analitics";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface BarCharProps {
  labelsQ: string[];
  dataQ: IAnalytics["profit"];
  color: string;
}
interface IData {
  labels: BarCharProps["labelsQ"];
  datasets: [
    {
      label: string;
      data: BarCharProps["dataQ"];
      backgroundColor: string;
    }
  ];
}
const BarChar = ({ labelsQ, dataQ, color }: BarCharProps) => {
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

  const labels = labelsQ;
  const data: IData = {
    labels,
    datasets: [
      {
        label: "Clients",
        data: dataQ,
        backgroundColor: color,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChar;
