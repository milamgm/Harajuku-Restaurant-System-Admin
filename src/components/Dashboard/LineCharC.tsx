import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  


const LineCharC = () => {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: false,
            text: '',
          },
        },
      };
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: [36,6,75,7454,15,872,1],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: [343,6,72,7854,15,8756,2],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
            
    
  return (
    <Line options={options} data={data} />
  )
}

export default LineCharC