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
      
      const labels = ['18h', '19h', '20h', '21h', '22h', '23h', '24h'];
      const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: [36,6,75,7454,15,872,1],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
            
    
  return (
    <Line options={options} data={data} />
  )
}

export default LineCharC