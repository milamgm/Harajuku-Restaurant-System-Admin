import { Doughnut } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const DoughnutChart = ({labelsQ, dataQ}) => {
  const data = {
    labels: labelsQ,
    datasets: [
      {
        data: dataQ,
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
