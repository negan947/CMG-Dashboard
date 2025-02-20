import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { useTheme } from '../../context/ThemeContext';
import '../../config/chartConfig';

const AnalyticsTraffic = () => {
  const { isDarkMode } = useTheme();

  const data = useMemo(() => ({
    labels: ['Organic', 'Paid', 'Referral', 'Social'],
    datasets: [
      {
        label: 'Traffic Sources',
        data: [55, 25, 10, 10],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', 
          'rgba(255, 99, 132, 0.6)', 
          'rgba(255, 206, 86, 0.6)', 
          'rgba(54, 162, 235, 0.6)',
        ],
      },
    ],
  }), []);

  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: { 
        labels: { color: isDarkMode ? '#ccc' : '#333' } 
      }
    }
  }), [isDarkMode]);

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
      <h2 className="text-xl font-bold mb-4">
        Traffic Sources
      </h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default AnalyticsTraffic;
