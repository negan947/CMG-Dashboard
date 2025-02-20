import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const chartColors = {
  primary: ['rgba(99, 102, 241, 0.8)', 'rgba(139, 92, 246, 0.8)', 'rgba(217, 70, 239, 0.8)'],
  glass: ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.1)'],
  accents: ['rgba(14, 165, 233, 0.8)', 'rgba(245, 158, 11, 0.8)', 'rgba(16, 185, 129, 0.8)'],
};

export const chartConfig = {
  style: {
    backgroundColor: 'transparent',
  },
  gridLines: {
    color: 'rgba(255, 255, 255, 0.05)',
  },
  text: {
    fill: 'rgba(255, 255, 255, 0.7)',
  },
};

export const getGradientColor = (color) => {
  const gradients = {
    blue: "from-blue-400/80 to-blue-600/80",
    emerald: "from-emerald-400/80 to-emerald-600/80",
    violet: "from-violet-400/80 to-violet-600/80",
    amber: "from-amber-400/80 to-amber-600/80",
  };
  return gradients[color] || "from-blue-400/80 to-blue-600/80";
};