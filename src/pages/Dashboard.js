import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { handleMouseMove } from '../utils/glassEffect';
import styles from '../styles/GlassMorphism.module.css';
import {
  Card,
  Title,
  Text,
  DonutChart,
  LineChart,
  Grid,
  Metric,
  Select,
  SelectItem,
} from '@tremor/react';

const Dashboard = () => {
  const { isDarkMode } = useTheme();

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

  const getGradientColor = (color) => {
    const gradients = {
      blue: "from-blue-400 to-blue-600",
      emerald: "from-emerald-400 to-emerald-600",
      violet: "from-violet-400 to-violet-600",
      amber: "from-amber-400 to-amber-600"
    };
    return gradients[color] || "from-blue-400 to-blue-600";
  };

  // Client categories data
  const clientCategories = [
    { name: "Fashion", value: 35 },
    { name: "Health and Careness", value: 25 },
    { name: "Electronics", value: 20 },
    { name: "Sporting Goods", value: 20 }
  ];

  // Client trends data over 4 weeks
  const clientTrends = [
    { week: "Week 1", "KLINT.RO": 85, Rustfuria: 65, Nike: 45 },
    { week: "Week 2", "KLINT.RO": 92, Rustfuria: 72, Nike: 52 },
    { week: "Week 3", "KLINT.RO": 88, Rustfuria: 78, Nike: 58 },
    { week: "Week 4", "KLINT.RO": 95, Rustfuria: 82, Nike: 62 }
  ];

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
          >
            <div className="relative z-10">
              <Title>Client Category</Title>
              <DonutChart
                className="h-80 mt-4"
                data={clientCategories}
                category="value"
                index="name"
                valueFormatter={(number) => `${number}%`}
                colors={["blue", "emerald", "violet", "amber"]}
                showAnimation={true}
              />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card 
            className={`relative ${styles.glassCard}`}
            onMouseMove={handleMouseMove}
          >
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <Title>Clients Trends</Title>
                <div className="flex space-x-4">
                  <Select defaultValue="this-month" className={`w-40 ${styles.glassSelect}`}>
                    <SelectItem value="this-month">This Month</SelectItem>
                  </Select>
                  <Select defaultValue="name" className={`w-32 ${styles.glassSelect}`}>
                    <SelectItem value="name">Sort by</SelectItem>
                  </Select>
                </div>
              </div>
              <LineChart
                className="h-80 mt-4"
                data={clientTrends}
                index="week"
                categories={["KLINT.RO", "Rustfuria", "Nike"]}
                colors={["emerald", "blue", "amber"]}
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
