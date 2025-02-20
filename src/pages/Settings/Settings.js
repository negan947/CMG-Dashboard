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
  Select,
  SelectItem,
  Button,
  Badge,
  Switch,
} from '@tremor/react';
import {
  PaintBrushIcon,
  GlobeAltIcon,
  BellIcon,
  KeyIcon,
  CloudArrowUpIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [autoBackup, setAutoBackup] = useState(true);
  const [language, setLanguage] = useState('en');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');

  const integrations = [
    { name: 'Google Analytics', status: 'connected', lastSync: '2 hours ago' },
    { name: 'Facebook Ads', status: 'connected', lastSync: '1 hour ago' },
    { name: 'Twitter API', status: 'disconnected', lastSync: 'Never' },
    { name: 'LinkedIn', status: 'connected', lastSync: '30 minutes ago' },
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
            System Settings
          </h1>
          <p className={`mt-2 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Configure your dashboard preferences and system settings
          </p>
        </div>
      </motion.div>

      <TabGroup>
        <TabList className="mb-8">
          <Tab icon={PaintBrushIcon}>Appearance</Tab>
          <Tab icon={GlobeAltIcon}>Language & Region</Tab>
          <Tab icon={CloudArrowUpIcon}>Integrations</Tab>
          <Tab icon={ShieldCheckIcon}>Privacy & Security</Tab>
        </TabList>

        <TabPanels>
          {/* Appearance Panel */}
          <TabPanel>
            <Card>
              <Title>Theme Settings</Title>
              <div className="mt-6 space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div>
                    <Text>Dark Mode</Text>
                    <Text className="text-sm text-gray-500">Toggle between light and dark themes</Text>
                  </div>
                  <Switch
                    checked={isDarkMode}
                    onChange={toggleTheme}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div>
                    <Text>Compact Mode</Text>
                    <Text className="text-sm text-gray-500">Reduce spacing between elements</Text>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div>
                    <Text>Animations</Text>
                    <Text className="text-sm text-gray-500">Enable interface animations</Text>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </TabPanel>

          {/* Language & Region Panel */}
          <TabPanel>
            <Card>
              <Title>Language & Regional Settings</Title>
              <div className="mt-6 space-y-6">
                <div>
                  <Text>Language</Text>
                  <Select
                    className="mt-2"
                    value={language}
                    onValueChange={setLanguage}
                  >
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </Select>
                </div>

                <div>
                  <Text>Date Format</Text>
                  <Select
                    className="mt-2"
                    value={dateFormat}
                    onValueChange={setDateFormat}
                  >
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </Select>
                </div>

                <div>
                  <Text>Time Zone</Text>
                  <Select className="mt-2" defaultValue="UTC-5">
                    <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                    <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                    <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                  </Select>
                </div>

                <div>
                  <Text>Currency</Text>
                  <Select className="mt-2" defaultValue="USD">
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                    <SelectItem value="GBP">British Pound (£)</SelectItem>
                    <SelectItem value="JPY">Japanese Yen (¥)</SelectItem>
                  </Select>
                </div>
              </div>
            </Card>
          </TabPanel>

          {/* Integrations Panel */}
          <TabPanel>
            <Card>
              <Title>Connected Services</Title>
              <div className="mt-6 space-y-4">
                {integrations.map((integration, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <GlobeAltIcon className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <Text>{integration.name}</Text>
                        <Text className="text-sm text-gray-500">
                          Last synced: {integration.lastSync}
                        </Text>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge color={integration.status === 'connected' ? 'green' : 'gray'}>
                        {integration.status}
                      </Badge>
                      <Button size="sm" variant="secondary">
                        {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="mt-6">
              <Title>Backup Settings</Title>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div>
                    <Text>Automatic Backup</Text>
                    <Text className="text-sm text-gray-500">
                      Automatically backup your data daily
                    </Text>
                  </div>
                  <Switch
                    checked={autoBackup}
                    onChange={setAutoBackup}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div>
                    <Text>Last Backup</Text>
                    <Text className="text-sm text-gray-500">
                      Yesterday at 11:42 PM
                    </Text>
                  </div>
                  <Button size="sm">
                    Backup Now
                  </Button>
                </div>
              </div>
            </Card>
          </TabPanel>

          {/* Privacy & Security Panel */}
          <TabPanel>
            <div className="grid gap-6">
              <Card>
                <Title>Privacy Settings</Title>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div>
                      <Text>Usage Analytics</Text>
                      <Text className="text-sm text-gray-500">
                        Help improve our services by sharing usage data
                      </Text>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div>
                      <Text>Error Reporting</Text>
                      <Text className="text-sm text-gray-500">
                        Automatically send error reports to help fix issues
                      </Text>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </Card>

              <Card>
                <Title>Security Settings</Title>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div>
                      <Text>Session Timeout</Text>
                      <Text className="text-sm text-gray-500">
                        Automatically log out after period of inactivity
                      </Text>
                    </div>
                    <Select defaultValue="30">
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div>
                      <Text>Login History</Text>
                      <Text className="text-sm text-gray-500">
                        View and manage your login sessions
                      </Text>
                    </div>
                    <Button size="sm" variant="secondary">
                      View History
                    </Button>
                  </div>
                </div>
              </Card>

              <Card>
                <Title>Data Management</Title>
                <div className="mt-6">
                  <Button size="lg" color="red" variant="secondary">
                    Delete Account
                  </Button>
                  <Text className="text-sm text-gray-500 mt-2">
                    This action cannot be undone. All your data will be permanently deleted.
                  </Text>
                </div>
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default Settings;
