import React, { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { handleMouseMove } from '../utils/glassEffect';
import styles from '../styles/GlassMorphism.module.css';
import { Card, Title, Text, DonutChart, LineChart, Metric } from '@tremor/react';
import { getGradientColor } from '../config/chart';

// Helper function to calculate trends
const calculateTrends = (data) => {
  // Keep original data if no filtering/sorting needed
  return data;
};

const Dashboard = () => {
  const { isDarkMode } = useTheme();

  // Separate states for period and sort
  const [selectedPeriod, setSelectedPeriod] = useState('this-month');
  const [selectedSort, setSelectedSort] = useState('performance');

  // Handlers for each dropdown
  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  // Metrics data with exact numbers from requirements
  const metrics = [
    {
      title: "Objectives",
      metric: "53%",
      subtext: "+5% this week",
      color: "blue"
    },
    {
      title: "New Leads",
      metric: "134",
      subtext: "+28 this week",
      color: "emerald"
    },
    {
      title: "Inquiry Success Rate",
      metric: "36.2%",
      subtext: "+7% this week",
      color: "violet"
    },
    {
      title: "Overdue Tasks",
      metric: "12",
      subtext: "+3 this week",
      color: "amber"
    }
  ];

  // Client categories data
  const clientCategories = [
    { name: "Fashion", value: 35 },
    { name: "Health and Careness", value: 25 },
    { name: "Electronics", value: 20 },
    { name: "Sporting Goods", value: 20 }
  ];

  // Client trends data over 4 weeks
  const baseClientTrends = [
    { week: "Week 1", "KLINT.RO": 85, Rustfuria: 65, Nike: 45 },
    { week: "Week 2", "KLINT.RO": 92, Rustfuria: 72, Nike: 52 },
    { week: "Week 3", "KLINT.RO": 88, Rustfuria: 78, Nike: 58 },
    { week: "Week 4", "KLINT.RO": 95, Rustfuria: 82, Nike: 62 }
  ];

  // Filter and sort client trends based on selected period and sort
  const clientTrends = useMemo(() => {
    return calculateTrends(baseClientTrends);
  }, [baseClientTrends]); // Added baseClientTrends to dependency array

  return (
    <div className={`min-h-screen relative ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
        <div className={styles.orb3}></div>
      </div>

      {/* Welcome Section */}
      <motion.div 
        className={`relative overflow-hidden rounded-2xl mb-8 p-8 ${styles.glassCard}`}
        onMouseMove={handleMouseMove}
      >
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            Bine ai venit!
          </h1>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {metrics.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card 
              className={`relative ${styles.glassCard}`}
              decoration="top"
              decorationColor={item.color}
              onMouseMove={handleMouseMove}
            >
              <div className="relative z-10">
                <Text className="text-sm font-medium opacity-70">{item.title}</Text>
                <Metric className={`mt-2 font-bold bg-gradient-to-r ${getGradientColor(item.color)} bg-clip-text text-transparent`}>
                  {item.metric}
                </Metric>
                <Text className={`mt-2 text-${item.color}-500 text-sm font-medium`}>
                  {item.subtext}
                </Text>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card 
            className={`relative ${styles.glassCard}`}
            onMouseMove={handleMouseMove}
            style={{ minHeight: '400px' }}
          >
            <div className="relative z-10">
              <Title>Client Category</Title>
              <DonutChart
                className="h-80 mt-4"
                data={clientCategories}
                category="value"
                index="name"
                valueFormatter={(number) => `${number}%`}
                colors={['blue', 'emerald', 'violet', 'amber']}
                showAnimation={true}
              />
              {/* Additional info under piechart */}
              <div className="p-2 bg-white/[0.05] rounded mt-2">
                <p className="text-sm">Additional client info: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac eros vel justo sagittis placerat.</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card 
            className={`relative ${styles.glassCard} overflow-visible`} 
            onMouseMove={handleMouseMove}
            style={{ minHeight: '400px' }}
          >
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <Title>Clients Trends</Title>
                <div className="flex space-x-4">
                  <select 
                    value={selectedPeriod} 
                    onChange={handlePeriodChange} 
                    className="w-40 bg-transparent backdrop-blur-md border border-white/10 rounded-lg p-2"
                  >
                    <option value="this-month">This Month</option>
                    <option value="last-month">Last Month</option>
                    <option value="3-months">Last 3 Months</option>
                    <option value="6-months">Last 6 Months</option>
                  </select>
                  <select 
                    value={selectedSort} 
                    onChange={handleSortChange} 
                    className="w-32 bg-transparent backdrop-blur-md border border-white/10 rounded-lg p-2"
                  >
                    <option value="performance">Performance</option>
                    <option value="activity">Activity</option>
                    <option value="progress">Progress</option>
                  </select>
                </div>
              </div>
              <LineChart
                className="h-80 mt-4"
                data={clientTrends}
                index="week"
                categories={['KLINT.RO', 'Rustfuria', 'Nike']}
                colors={['emerald', 'blue', 'amber']}
                showAnimation={true}
                showLegend={true}
                showGridLines={false}
                curveType="monotone"
              />
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
