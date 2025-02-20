import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import {
  Card,
  Title,
  Text,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TextInput,
  Textarea,
  Button,
  Select,
  SelectItem,
  Badge,
} from '@tremor/react';
import {
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

const Support = () => {
  const { isDarkMode } = useTheme();
  const [ticketType, setTicketType] = useState('technical');
  const [priority, setPriority] = useState('medium');

  const faqItems = [
    {
      question: 'How do I connect my social media accounts?',
      answer: 'Go to Settings > Integrations and click on the social media platform you want to connect. Follow the authentication process to link your account.'
    },
    {
      question: 'Can I schedule posts across multiple platforms?',
      answer: 'Yes! Use our Content Calendar feature to schedule and manage posts across all your connected social media platforms.'
    },
    {
      question: 'How often is the analytics data updated?',
      answer: 'Analytics data is updated in real-time for most metrics. Historical data is processed and updated every 24 hours.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.'
    },
  ];

  const tutorials = [
    {
      title: 'Getting Started Guide',
      description: 'Learn the basics of using the dashboard',
      duration: '5 min',
      type: 'video',
    },
    {
      title: 'Advanced Analytics',
      description: 'Deep dive into analytics features',
      duration: '10 min',
      type: 'article',
    },
    {
      title: 'Content Management',
      description: 'Master content scheduling and publishing',
      duration: '8 min',
      type: 'video',
    },
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
            Support Center
          </h1>
          <p className={`mt-2 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Get help and learn how to use the platform effectively
          </p>
        </div>
      </motion.div>

      <TabGroup>
        <TabList className="mb-8">
          <Tab icon={QuestionMarkCircleIcon}>FAQ</Tab>
          <Tab icon={ChatBubbleLeftRightIcon}>Contact Support</Tab>
          <Tab icon={DocumentTextIcon}>Documentation</Tab>
          <Tab icon={VideoCameraIcon}>Video Tutorials</Tab>
        </TabList>

        <TabPanels>
          {/* FAQ Panel */}
          <TabPanel>
            <div className="grid gap-6">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                    <Text>{item.answer}</Text>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabPanel>

          {/* Contact Support Panel */}
          <TabPanel>
            <Card>
              <Title>Submit a Support Ticket</Title>
              <div className="mt-6 space-y-6">
                <div>
                  <Text>Ticket Type</Text>
                  <Select
                    className="mt-2"
                    value={ticketType}
                    onValueChange={setTicketType}
                  >
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="billing">Billing Question</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </Select>
                </div>

                <div>
                  <Text>Priority</Text>
                  <Select
                    className="mt-2"
                    value={priority}
                    onValueChange={setPriority}
                  >
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </Select>
                </div>

                <div>
                  <Text>Subject</Text>
                  <TextInput
                    className="mt-2"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div>
                  <Text>Description</Text>
                  <Textarea
                    className="mt-2"
                    placeholder="Provide detailed information about your issue..."
                    rows={5}
                  />
                </div>

                <div>
                  <Button
                    size="lg"
                    variant="primary"
                    className="w-full md:w-auto"
                  >
                    Submit Ticket
                  </Button>
                </div>
              </div>
            </Card>
          </TabPanel>

          {/* Documentation Panel */}
          <TabPanel>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <Title>Quick Start Guides</Title>
                <div className="mt-4 space-y-4">
                  {['Dashboard Overview', 'Client Management', 'Analytics', 'Social Media Integration'].map((guide, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <DocumentTextIcon className="w-5 h-5 text-blue-500" />
                        <Text>{guide}</Text>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <Title>API Documentation</Title>
                <div className="mt-4 space-y-4">
                  {['Authentication', 'Endpoints', 'Rate Limits', 'Examples'].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <DocumentTextIcon className="w-5 h-5 text-purple-500" />
                        <Text>{doc}</Text>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabPanel>

          {/* Video Tutorials Panel */}
          <TabPanel>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials.map((tutorial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <Title>{tutorial.title}</Title>
                        <Text className="mt-2">{tutorial.description}</Text>
                      </div>
                      {tutorial.type === 'video' ? (
                        <VideoCameraIcon className="w-6 h-6 text-blue-500" />
                      ) : (
                        <DocumentTextIcon className="w-6 h-6 text-purple-500" />
                      )}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Badge color="blue">
                        {tutorial.duration}
                      </Badge>
                      <Text>{tutorial.type}</Text>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  )
};

export default Support;
