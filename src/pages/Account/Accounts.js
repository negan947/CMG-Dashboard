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
  Button,
  Badge,
  Select,
  SelectItem,
} from '@tremor/react';
import {
  UserCircleIcon,
  KeyIcon,
  BellIcon,
  ShieldCheckIcon,
  CircleStackIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';
import { useProfile } from '../../context/ProfileContext';

const Accounts = () => {
  const { isDarkMode } = useTheme();
  const { profileImage, setProfileImage } = useProfile();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
            Account Settings
          </h1>
          <p className={`mt-2 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage your account preferences and settings
          </p>
        </div>
      </motion.div>

      <TabGroup>
        <TabList className="mb-8">
          <Tab icon={UserCircleIcon}>Profile</Tab>
          <Tab icon={KeyIcon}>Security</Tab>
          <Tab icon={BellIcon}>Notifications</Tab>
          <Tab icon={DevicePhoneMobileIcon}>Connected Devices</Tab>
        </TabList>

        <TabPanels>
          {/* Profile Panel */}
          <TabPanel>
            <div className="grid gap-6">
              <Card>
                <Title>Profile Information</Title>
                <div className="mt-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-xl overflow-hidden">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white text-2xl font-semibold">A</span>
                          </div>
                        )}
                      </div>
                      <label
                        htmlFor="profile-upload"
                        className="absolute bottom-0 right-0 p-1 rounded-full bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <input
                          id="profile-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                    <div>
                      <Text>Profile Photo</Text>
                      <Text className="text-sm text-gray-500">
                        Upload a new profile photo (JPG or PNG, max 2MB)
                      </Text>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Text>First Name</Text>
                        <TextInput
                          placeholder="John"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Text>Last Name</Text>
                        <TextInput
                          placeholder="Doe"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Text>Email Address</Text>
                      <TextInput
                        type="email"
                        placeholder="john@example.com"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Text>Phone Number</Text>
                      <TextInput
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Text>Time Zone</Text>
                      <Select defaultValue="UTC-5" className="mt-1">
                        <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                        <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                        <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button size="lg">Save Changes</Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabPanel>

          {/* Security Panel */}
          <TabPanel>
            <div className="grid gap-6">
              <Card>
                <Title>Security Settings</Title>
                <div className="mt-6 space-y-6">
                  <div>
                    <Text>Change Password</Text>
                    <div className="mt-4 space-y-4">
                      <TextInput
                        type="password"
                        placeholder="Current Password"
                      />
                      <TextInput
                        type="password"
                        placeholder="New Password"
                      />
                      <TextInput
                        type="password"
                        placeholder="Confirm New Password"
                      />
                      <Button>Update Password</Button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <Text>Two-Factor Authentication</Text>
                    <div className="mt-4">
                      <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                          <ShieldCheckIcon className="w-6 h-6 text-green-500" />
                          <div>
                            <Text>Two-Factor Authentication</Text>
                            <Text className="text-sm text-gray-500">Add an extra layer of security to your account</Text>
                          </div>
                        </div>
                        <Badge color="green">Enabled</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <Title>Login Sessions</Title>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <CircleStackIcon className="w-6 h-6 text-blue-500" />
                      <div>
                        <Text>Current Session</Text>
                        <Text className="text-sm text-gray-500">Windows • Chrome • New York, USA</Text>
                      </div>
                    </div>
                    <Badge color="green">Active Now</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <CircleStackIcon className="w-6 h-6 text-gray-500" />
                      <div>
                        <Text>Previous Session</Text>
                        <Text className="text-sm text-gray-500">iPhone • Safari • New York, USA</Text>
                      </div>
                    </div>
                    <Button size="sm" variant="secondary" color="red">End Session</Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabPanel>

          {/* Notifications Panel */}
          <TabPanel>
            <Card>
              <Title>Notification Preferences</Title>
              <div className="mt-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div>
                      <Text>Email Notifications</Text>
                      <Text className="text-sm text-gray-500">Receive updates and alerts via email</Text>
                    </div>
                    <div>
                      <Button
                        size="sm"
                        variant={notifications.email ? "primary" : "secondary"}
                        onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                      >
                        {notifications.email ? 'Enabled' : 'Disabled'}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div>
                      <Text>Push Notifications</Text>
                      <Text className="text-sm text-gray-500">Receive notifications in your browser</Text>
                    </div>
                    <div>
                      <Button
                        size="sm"
                        variant={notifications.push ? "primary" : "secondary"}
                        onClick={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
                      >
                        {notifications.push ? 'Enabled' : 'Disabled'}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div>
                      <Text>SMS Notifications</Text>
                      <Text className="text-sm text-gray-500">Receive notifications via SMS</Text>
                    </div>
                    <div>
                      <Button
                        size="sm"
                        variant={notifications.sms ? "primary" : "secondary"}
                        onClick={() => setNotifications(prev => ({ ...prev, sms: !prev.sms }))}
                      >
                        {notifications.sms ? 'Enabled' : 'Disabled'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabPanel>

          {/* Connected Devices Panel */}
          <TabPanel>
            <Card>
              <Title>Connected Devices</Title>
              <div className="mt-6 space-y-4">
                {[
                  { name: 'iPhone 13', type: 'Mobile', lastActive: 'Now', status: 'active' },
                  { name: 'MacBook Pro', type: 'Desktop', lastActive: '2 hours ago', status: 'active' },
                  { name: 'iPad Air', type: 'Tablet', lastActive: '3 days ago', status: 'inactive' },
                ].map((device, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <DevicePhoneMobileIcon className="w-6 h-6 text-blue-500" />
                      <div>
                        <Text>{device.name}</Text>
                        <Text className="text-sm text-gray-500">{device.type} • Last active {device.lastActive}</Text>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge color={device.status === 'active' ? 'green' : 'gray'}>
                        {device.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                      <Button size="sm" variant="secondary" color="red">
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default Accounts;
