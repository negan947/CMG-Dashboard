import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register required Chart.js components for Pie charts
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);