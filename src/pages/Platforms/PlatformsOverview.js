import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import {
  Card,
  Title,
  Text,
  Metric,
  BarChart,
  LineChart,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Grid,
  Col,
  Badge,
} from '@tremor/react';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Linkedin as LinkedinIcon,
} from 'lucide-react';

const PlatformsOverview = () => {
  const { isDarkMode } = useTheme();
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const platformMetrics = [
    {
      name: 'Facebook',
      icon: FacebookIcon,
      followers: '24.5K',
      engagement: '3.2K',
      reach: '45.8K',
      growth: '+5.2%',
      color: 'blue',
    },
    {
      name: 'Twitter',
      icon: TwitterIcon,
      followers: '18.2K',
      engagement: '2.8K',
      reach: '38.1K',
      growth: '+3.8%',
      color: 'cyan',
    },
    {
      name: 'Instagram',
      icon: InstagramIcon,
      followers: '32.1K',
      engagement: '5.5K',
      reach: '62.3K',
      growth: '+7.4%',
      color: 'fuchsia',
    },
    {
      name: 'LinkedIn',
      icon: LinkedinIcon,
      followers: '15.8K',
      engagement: '1.9K',
      reach: '28.6K',
      growth: '+4.1%',
      color: 'indigo',
    },
  ];

  const engagementData = [
    { date: 'Jan', Facebook: 1200, Twitter: 800, Instagram: 1800, LinkedIn: 600 },
    { date: 'Feb', Facebook: 1400, Twitter: 900, Instagram: 2000, LinkedIn: 700 },
    { date: 'Mar', Facebook: 1300, Twitter: 950, Instagram: 2200, LinkedIn: 800 },
    { date: 'Apr', Facebook: 1600, Twitter: 1100, Instagram: 2400, LinkedIn: 900 },
    { date: 'May', Facebook: 1500, Twitter: 1000, Instagram: 2600, LinkedIn: 850 },
    { date: 'Jun', Facebook: 1800, Twitter: 1200, Instagram: 2800, LinkedIn: 1000 },
  ];

  const contentPerformance = [
    { type: 'Images', engagement: 65, reach: 8500, interactions: 2300 },
    { type: 'Videos', engagement: 82, reach: 12000, interactions: 3600 },
    { type: 'Stories', engagement: 45, reach: 6200, interactions: 1800 },
    { type: 'Reels', engagement: 78, reach: 15000, interactions: 4200 },
    { type: 'Text', engagement: 35, reach: 4500, interactions: 980 },
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
            Social Media Platforms
          </h1>
          <p className={`mt-2 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Monitor and manage your social media presence across platforms
          </p>
        </div>
      </motion.div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {platformMetrics.map((platform) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card
              decoration="left"
              decorationColor={platform.color}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <platform.icon className={`w-6 h-6 text-${platform.color}-500`} />
                <Badge color={platform.color}>{platform.growth}</Badge>
              </div>
              <Text>{platform.name}</Text>
              <Metric>{platform.followers}</Metric>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <Text className="text-xs">Engagement</Text>
                  <Text className="font-medium">{platform.engagement}</Text>
                </div>
                <div>
                  <Text className="text-xs">Reach</Text>
                  <Text className="font-medium">{platform.reach}</Text>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Analytics Tabs */}
      <TabGroup>
        <TabList className="mb-8">
          <Tab>Overview</Tab>
          <Tab>Content Performance</Tab>
          <Tab>Audience Insights</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} className="gap-6">
              <Card>
                <Title>Engagement Trends</Title>
                <LineChart
                  className="h-80 mt-4"
                  data={engagementData}
                  index="date"
                  categories={['Facebook', 'Twitter', 'Instagram', 'LinkedIn']}
                  colors={['blue', 'cyan', 'fuchsia', 'indigo']}
                />
              </Card>

              <Card>
                <Title>Content Performance</Title>
                <BarChart
                  className="h-80 mt-4"
                  data={contentPerformance}
                  index="type"
                  categories={['engagement']}
                  colors={['violet']}
                  valueFormatter={(number) => `${number}%`}
                />
              </Card>
            </Grid>
          </TabPanel>

          <TabPanel>
            <Card>
              <Title>Content Metrics</Title>
              <div className="mt-4">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left p-4">Content Type</th>
                      <th className="text-left p-4">Engagement Rate</th>
                      <th className="text-left p-4">Total Reach</th>
                      <th className="text-left p-4">Interactions</th>
                      <th className="text-left p-4">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contentPerformance.map((content) => (
                      <tr key={content.type} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="p-4">{content.type}</td>
                        <td className="p-4">{content.engagement}%</td>
                        <td className="p-4">{content.reach.toLocaleString()}</td>
                        <td className="p-4">{content.interactions.toLocaleString()}</td>
                        <td className="p-4">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${content.engagement}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabPanel>

          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <Title>Audience Demographics</Title>
                <div className="mt-4">
                  {/* Add demographics visualization here */}
                </div>
              </Card>
              <Card>
                <Title>Location Distribution</Title>
                <div className="mt-4">
                  {/* Add location visualization here */}
                </div>
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default PlatformsOverview;