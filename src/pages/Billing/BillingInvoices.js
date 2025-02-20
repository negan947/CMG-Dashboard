import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import {
  Card,
  Title,
  Text,
  Badge,
  Button,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Select,
  SelectItem,
  TextInput,
} from '@tremor/react';
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

const BillingInvoices = () => {
  const { isDarkMode } = useTheme();
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('last3months');
  const [searchTerm, setSearchTerm] = useState('');

  const [invoices] = useState([
    {
      id: 'INV-2024-001',
      date: '2024-01-15',
      dueDate: '2024-01-30',
      amount: 299.99,
      status: 'paid',
      items: [
        { description: 'Premium Plan - Monthly', amount: 299.99 }
      ]
    },
    {
      id: 'INV-2023-012',
      date: '2023-12-15',
      dueDate: '2023-12-30',
      amount: 299.99,
      status: 'paid',
      items: [
        { description: 'Premium Plan - Monthly', amount: 299.99 }
      ]
    },
    {
      id: 'INV-2023-011',
      date: '2023-11-15',
      dueDate: '2023-11-30',
      amount: 299.99,
      status: 'paid',
      items: [
        { description: 'Premium Plan - Monthly', amount: 299.99 }
      ]
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'overdue':
        return 'red';
      default:
        return 'gray';
    }
  };

  const handleDownloadInvoice = (invoiceId) => {
    // Implement invoice download functionality
    console.log(`Downloading invoice ${invoiceId}`);
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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
            Invoices
          </h1>
          <p className={`mt-2 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            View and manage your billing history
          </p>
        </div>
      </motion.div>

      {/* Filters Section */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <Text>Search Invoices</Text>
            <div className="relative mt-2">
              <TextInput
                icon={DocumentTextIcon}
                placeholder="Search by invoice number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <Text>Status</Text>
            <Select
              className="mt-2"
              value={filterStatus}
              onValueChange={setFilterStatus}
            >
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </Select>
          </div>
          <div className="w-full md:w-48">
            <Text>Date Range</Text>
            <Select
              className="mt-2"
              value={dateRange}
              onValueChange={setDateRange}
            >
              <SelectItem value="last3months">Last 3 Months</SelectItem>
              <SelectItem value="last6months">Last 6 Months</SelectItem>
              <SelectItem value="lastyear">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </Select>
          </div>
          <Button
            icon={FunnelIcon}
            variant="secondary"
          >
            Apply Filters
          </Button>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <Title>Total Invoices</Title>
          <div className="mt-4">
            <Text className="text-2xl font-semibold">{invoices.length}</Text>
            <Text className="text-sm text-gray-500">Last 3 months</Text>
          </div>
        </Card>
        <Card>
          <Title>Total Amount</Title>
          <div className="mt-4">
            <Text className="text-2xl font-semibold">
              ${invoices.reduce((sum, inv) => sum + inv.amount, 0).toFixed(2)}
            </Text>
            <Text className="text-sm text-gray-500">Last 3 months</Text>
          </div>
        </Card>
        <Card>
          <Title>Average Invoice</Title>
          <div className="mt-4">
            <Text className="text-2xl font-semibold">
              ${(invoices.reduce((sum, inv) => sum + inv.amount, 0) / invoices.length).toFixed(2)}
            </Text>
            <Text className="text-sm text-gray-500">Per invoice</Text>
          </div>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <Title>Invoice History</Title>
        <Table className="mt-6">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Invoice Number</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Due Date</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <DocumentTextIcon className="w-5 h-5 text-gray-400" />
                    <span>{invoice.id}</span>
                  </div>
                </TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge color={getStatusColor(invoice.status)}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      icon={ArrowDownTrayIcon}
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDownloadInvoice(invoice.id)}
                    >
                      Download
                    </Button>
                    <Button
                      icon={ChevronRightIcon}
                      variant="light"
                      size="sm"
                    >
                      View
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredInvoices.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <Text>No invoices found matching your filters</Text>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default BillingInvoices;
