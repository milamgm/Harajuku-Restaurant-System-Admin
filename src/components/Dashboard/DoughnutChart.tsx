import { Doughnut } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const DoughnutChart = () => {
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
    datasets: [
      {
        data: [12, 19, 3, 5, 9],
      },
    ],
  };
  return (
    <div>
      <Doughnut data={data}/>
    </div>
  );
};

export default DoughnutChart;
