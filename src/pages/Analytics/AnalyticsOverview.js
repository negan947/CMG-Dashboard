import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import {
  Card,
  Title,
  AreaChart,
  BarChart,
  Text,
  Flex,
  Grid,
  Metric,
  ProgressBar,
  BadgeDelta,
  DonutChart,
} from '@tremor/react';
import {
  UserGroupIcon,
  CursorArrowRaysIcon,
  ChartBarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const AnalyticsOverview = () => {
  const { isDarkMode } = useTheme();

  const websiteMetrics = [
    {
      title: "Total Visitors",
      metric: "156,789",
      icon: UserGroupIcon,
      delta: "+12.3%",
      deltaType: "increase",
    },
    {
      title: "Bounce Rate",
      metric: "32.1%",
      icon: CursorArrowRaysIcon,
      delta: "-8.1%",
      deltaType: "moderateDecrease",
    },
    {
      title: "Average Session",
      metric: "4m 12s",
      icon: ClockIcon,
      delta: "+14.2%",
      deltaType: "increase",
    },
    {
      title: "Conversion Rate",
      metric: "3.2%",
      icon: ChartBarIcon,
      delta: "+2.3%",
      deltaType: "moderateIncrease",
    },
  ];

  const trafficData = [
    { date: "Jan", Visitors: 2890, "Page Views": 8700 },
    { date: "Feb", Visitors: 2756, "Page Views": 8256 },
    { date: "Mar", Visitors: 3322, "Page Views": 9996 },
    { date: "Apr", Visitors: 3470, "Page Views": 10410 },
    { date: "May", Visitors: 3475, "Page Views": 10425 },
    { date: "Jun", Visitors: 3129, "Page Views": 9387 },
  ];

  const deviceData = [
    { device: "Desktop", sessions: 55 },
    { device: "Mobile", sessions: 35 },
    { device: "Tablet", sessions: 10 },
  ];

  const engagementData = [
    { category: "< 1 min", value: 35 },
    { category: "1-5 mins", value: 45 },
    { category: "5-10 mins", value: 15 },
    { category: "> 10 mins", value: 5 },
  ];

  const goalCompletions = [
    { name: "Sign ups", value: 85 },
    { name: "Downloads", value: 65 },
    { name: "Purchases", value: 42 },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl mb-8 p-8 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10"
      >
        <div className="absolute inset-0 bg-grid-white/10 mask-gradient-to-b"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            Analytics Overview
          </h1>
          <p className={`mt-2 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Monitor your website's performance and user engagement
          </p>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6 mb-6">
        {websiteMetrics.map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card decoration="top" decorationColor={item.deltaType === "increase" ? "green" : "red"}>
              <Flex alignItems="start">
                <div className="truncate">
                  <Text>{item.title}</Text>
                  <Metric>{item.metric}</Metric>
                  <Flex className="mt-2">
                    <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>
                    <Text className="truncate">vs. previous period</Text>
                  </Flex>
                </div>
                <item.icon className="w-6 h-6 text-gray-500" />
              </Flex>
            </Card>
          </motion.div>
        ))}
      </Grid>

      {/* Traffic Overview */}
      <Grid numItems={1} numItemsLg={2} className="gap-6 mb-6">
        <Card>
          <Title>Traffic Overview</Title>
          <AreaChart
            className="h-72 mt-4"
            data={trafficData}
            index="date"
            categories={["Visitors", "Page Views"]}
            colors={["blue", "purple"]}
          />
        </Card>
        
        <Card>
          <Title>Device Distribution</Title>
          <DonutChart
            className="h-72 mt-4"
            data={deviceData}
            category="sessions"
            index="device"
            valueFormatter={(number) => `${number}%`}
            colors={["cyan", "violet", "indigo"]}
          />
        </Card>
      </Grid>

      {/* Session Duration & Goals */}
      <Grid numItems={1} numItemsLg={2} className="gap-6">
        <Card>
          <Title>Session Duration Distribution</Title>
          <BarChart
            className="h-72 mt-4"
            data={engagementData}
            index="category"
            categories={["value"]}
            colors={["blue"]}
            valueFormatter={(number) => `${number}%`}
          />
        </Card>

        <Card>
          <Title>Goal Completions</Title>
          <div className="mt-4 space-y-4">
            {goalCompletions.map((goal) => (
              <div key={goal.name} className="space-y-2">
                <Flex>
                  <Text>{goal.name}</Text>
                  <Text>{goal.value}%</Text>
                </Flex>
                <ProgressBar value={goal.value} color="blue" />
              </div>
            ))}
          </div>
        </Card>
      </Grid>
    </div>
  );
};

export default AnalyticsOverview;
