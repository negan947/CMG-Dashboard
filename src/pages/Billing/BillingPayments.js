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
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
} from '@tremor/react';
import {
  CreditCardIcon,
  BanknotesIcon,
  ClockIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

const BillingPayments = () => {
  const { isDarkMode } = useTheme();
  const [activeMethod, setActiveMethod] = useState('creditCard');

  const paymentMethods = [
    {
      id: 1,
      type: 'Credit Card',
      last4: '4242',
      expiry: '12/24',
      isDefault: true,
      brand: 'Visa',
    },
    {
      id: 2,
      type: 'Credit Card',
      last4: '8456',
      expiry: '08/25',
      isDefault: false,
      brand: 'Mastercard',
    },
  ];

  const recentTransactions = [
    {
      id: 'TRX-001',
      date: '2024-01-15',
      amount: 299.99,
      status: 'completed',
      method: 'Credit Card (*4242)',
      description: 'Monthly Subscription',
    },
    {
      id: 'TRX-002',
      date: '2023-12-15',
      amount: 299.99,
      status: 'completed',
      method: 'Credit Card (*4242)',
      description: 'Monthly Subscription',
    },
    {
      id: 'TRX-003',
      date: '2023-11-15',
      amount: 299.99,
      status: 'completed',
      method: 'Credit Card (*4242)',
      description: 'Monthly Subscription',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'failed':
        return 'red';
      default:
        return 'gray';
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
            Payment Settings
          </h1>
          <p className={`mt-2 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage your payment methods and view transactions
          </p>
        </div>
      </motion.div>

      <TabGroup>
        <TabList className="mb-8">
          <Tab icon={CreditCardIcon}>Payment Methods</Tab>
          <Tab icon={ClockIcon}>Transaction History</Tab>
          <Tab icon={BanknotesIcon}>Billing Settings</Tab>
        </TabList>

        <TabPanels>
          {/* Payment Methods Panel */}
          <TabPanel>
            <div className="grid gap-6">
              <Card>
                <Title>Saved Payment Methods</Title>
                <div className="mt-6 space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`p-4 rounded-xl border ${
                        isDarkMode ? 'border-gray-700' : 'border-gray-200'
                      } flex items-center justify-between`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${
                          isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                        }`}>
                          <CreditCardIcon className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                          <Text>{method.brand} ending in {method.last4}</Text>
                          <Text className="text-sm text-gray-500">Expires {method.expiry}</Text>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {method.isDefault && (
                          <Badge color="blue">Default</Badge>
                        )}
                        <Button size="sm" variant="secondary">Edit</Button>
                        <Button size="sm" variant="secondary" color="red">Remove</Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Title>Add New Payment Method</Title>
                  <div className="mt-4 space-y-4">
                    <div>
                      <Text>Card Number</Text>
                      <TextInput
                        placeholder="1234 5678 9012 3456"
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Text>Expiration Date</Text>
                        <TextInput
                          placeholder="MM/YY"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Text>CVC</Text>
                        <TextInput
                          placeholder="123"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <Button size="lg">Add Payment Method</Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabPanel>

          {/* Transaction History Panel */}
          <TabPanel>
            <Card>
              <div className="flex justify-between items-center mb-6">
                <Title>Recent Transactions</Title>
                <Button
                  icon={ArrowPathIcon}
                  variant="secondary"
                >
                  Refresh
                </Button>
              </div>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Transaction ID</TableHeaderCell>
                    <TableHeaderCell>Date</TableHeaderCell>
                    <TableHeaderCell>Description</TableHeaderCell>
                    <TableHeaderCell>Amount</TableHeaderCell>
                    <TableHeaderCell>Method</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                      <TableCell>{transaction.method}</TableCell>
                      <TableCell>
                        <Badge color={getStatusColor(transaction.status)}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabPanel>

          {/* Billing Settings Panel */}
          <TabPanel>
            <div className="grid gap-6">
              <Card>
                <Title>Billing Information</Title>
                <div className="mt-6 space-y-4">
                  <div>
                    <Text>Billing Email</Text>
                    <TextInput
                      defaultValue="billing@company.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Text>Billing Address</Text>
                    <TextInput
                      placeholder="Street Address"
                      className="mt-1"
                    />
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <TextInput placeholder="City" />
                      <TextInput placeholder="State/Province" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <TextInput placeholder="ZIP/Postal Code" />
                      <Select defaultValue="US">
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                      </Select>
                    </div>
                  </div>
                  <Button size="lg">Save Changes</Button>
                </div>
              </Card>

              <Card>
                <Title>Billing Preferences</Title>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <CheckCircleIcon className="w-6 h-6 text-green-500" />
                      <div>
                        <Text>Automatic Payments</Text>
                        <Text className="text-sm text-gray-500">Charges are automatically processed on due date</Text>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge color="green">Enabled</Badge>
                      <Button size="sm" variant="secondary">Configure</Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <ExclamationCircleIcon className="w-6 h-6 text-yellow-500" />
                      <div>
                        <Text>Payment Reminders</Text>
                        <Text className="text-sm text-gray-500">Receive email notifications before due date</Text>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge color="yellow">3 Days Before</Badge>
                      <Button size="sm" variant="secondary">Configure</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default BillingPayments;
