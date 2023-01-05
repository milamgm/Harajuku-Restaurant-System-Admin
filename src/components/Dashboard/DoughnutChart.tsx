import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

interface IDoughnutChart {
  labelsQ: string[];
  dataQ: string[];
}

const DoughnutChart = ({ labelsQ, dataQ }: IDoughnutChart) => {
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
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;
