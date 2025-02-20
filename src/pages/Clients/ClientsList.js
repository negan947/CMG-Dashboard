import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import {
  Card,
  Title,
  Text,
  Badge,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  TextInput,
  Select,
  SelectItem,
} from '@tremor/react';
import { 
  MagnifyingGlassIcon, 
  PlusCircleIcon,
  ChevronRightIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { clientService } from '../../services/clientService';

const ClientsList = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setLoading(true);
      const data = await clientService.getAllClients();
      setClients(data);
    } catch (error) {
      console.error('Error loading clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contactName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.industry?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || client.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'green';
      case 'inactive': return 'gray';
      case 'pending': return 'yellow';
      default: return 'gray';
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
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              Clients
            </h1>
            <p className={`mt-2 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Manage and monitor your client relationships
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/clients/new')}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 
              transition-all duration-200 flex items-center space-x-2"
          >
            <PlusCircleIcon className="w-5 h-5" />
            <span>Add New Client</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Filters Section */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <Text>Search Clients</Text>
            <div className="relative mt-2">
              <TextInput
                icon={MagnifyingGlassIcon}
                placeholder="Search by name, contact, or industry..."
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
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </Select>
          </div>
          <div className="w-full md:w-48">
            <Text>Priority</Text>
            <Select
              className="mt-2"
              value={filterPriority}
              onValueChange={setFilterPriority}
            >
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </Select>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadClients}
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 
              dark:border-gray-600 dark:hover:bg-gray-800 transition-colors flex items-center space-x-2"
          >
            <ArrowPathIcon className="w-5 h-5" />
            <span>Refresh</span>
          </motion.button>
        </div>
      </Card>

      {/* Clients Table */}
      <Card>
        <Title>Client List</Title>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <Table className="mt-4">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Client Name</TableHeaderCell>
                <TableHeaderCell>Industry</TableHeaderCell>
                <TableHeaderCell>Contact</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Priority</TableHeaderCell>
                <TableHeaderCell>Last Contact</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow 
                  key={client.id}
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => navigate(`/clients/${client.id}`)}
                >
                  <TableCell>
                    <div className="font-medium">{client.name}</div>
                    <Text className="text-sm">{client.email}</Text>
                  </TableCell>
                  <TableCell>{client.industry}</TableCell>
                  <TableCell>
                    <div>{client.contactName}</div>
                    <Text className="text-sm">{client.contactPhone}</Text>
                  </TableCell>
                  <TableCell>
                    <Badge color={getStatusColor(client.status)}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge color={getPriorityColor(client.priority)}>
                      {client.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.lastContact || 'N/A'}</TableCell>
                  <TableCell>
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                  </TableCell>
                </TableRow>
              ))}
              {filteredClients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <Text>No clients found matching your filters</Text>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default ClientsList;
