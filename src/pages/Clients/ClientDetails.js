import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  AreaChart,
  Select,
  SelectItem,
  Metric,
} from '@tremor/react';
import {
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  PencilIcon,
  TrashIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { clientService } from '../../services/clientService';
import { calendarService } from '../../services/calendarService';

const ClientDetails = () => {
  const { isDarkMode } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [activityPeriod, setActivityPeriod] = useState('week');

  useEffect(() => {
    loadClientData();
  }, [id]);

  const loadClientData = async () => {
    try {
      setLoading(true);
      const clientData = await clientService.getClientById(id);
      setClient(clientData);
      const clientEvents = await calendarService.getEventsByClient(id);
      setEvents(clientEvents);
    } catch (error) {
      console.error('Error loading client data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await clientService.deleteClient(id);
        navigate('/clients');
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    }
  };

  const activityData = [
    { date: '2024-01-01', interactions: 5, revenue: 1200 },
    { date: '2024-01-02', interactions: 8, revenue: 1800 },
    { date: '2024-01-03', interactions: 3, revenue: 800 },
    { date: '2024-01-04', interactions: 6, revenue: 1500 },
    { date: '2024-01-05', interactions: 4, revenue: 1100 },
    { date: '2024-01-06', interactions: 7, revenue: 2000 },
    { date: '2024-01-07', interactions: 5, revenue: 1300 },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Text>Client not found</Text>
      </div>
    );
  }

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
            <div className="flex items-center space-x-4">
              <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                {client.name}
              </h1>
              <Badge color={client.status === 'active' ? 'green' : 'gray'}>
                {client.status}
              </Badge>
            </div>
            <p className={`mt-2 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {client.industry}
            </p>
          </div>
          <div className="flex space-x-4">
            <Button
              icon={PencilIcon}
              variant="secondary"
              onClick={() => navigate(`/clients/edit/${id}`)}
            >
              Edit
            </Button>
            <Button
              icon={TrashIcon}
              variant="secondary"
              color="red"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Info Card */}
        <Card className="lg:col-span-1">
          <Title>Contact Information</Title>
          <div className="mt-6 space-y-6">
            <div className="flex items-center space-x-3">
              <UserCircleIcon className="w-5 h-5 text-gray-400" />
              <div>
                <Text className="text-sm text-gray-500">Contact Person</Text>
                <Text>{client.contactName}</Text>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <EnvelopeIcon className="w-5 h-5 text-gray-400" />
              <div>
                <Text className="text-sm text-gray-500">Email</Text>
                <Text>{client.email}</Text>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <PhoneIcon className="w-5 h-5 text-gray-400" />
              <div>
                <Text className="text-sm text-gray-500">Phone</Text>
                <Text>{client.phone}</Text>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <BuildingOfficeIcon className="w-5 h-5 text-gray-400" />
              <div>
                <Text className="text-sm text-gray-500">Address</Text>
                <Text>{client.address}</Text>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <Text className="text-sm text-gray-500">Client Since</Text>
              <Text>{new Date(client.createdAt).toLocaleDateString()}</Text>
            </div>
          </div>
        </Card>

        {/* Activity Chart */}
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <Title>Activity Overview</Title>
            <Select
              value={activityPeriod}
              onValueChange={setActivityPeriod}
            >
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
            </Select>
          </div>
          <AreaChart
            className="h-72"
            data={activityData}
            index="date"
            categories={["interactions", "revenue"]}
            colors={["blue", "green"]}
            valueFormatter={(number) => number.toString()}
          />
        </Card>
      </div>

      {/* Events and Activities */}
      <div className="grid grid-cols-1 gap-6 mt-6">
        <Card>
          <div className="flex justify-between items-center mb-6">
            <Title>Recent Events</Title>
            <Button
              icon={ArrowPathIcon}
              variant="secondary"
              onClick={loadClientData}
            >
              Refresh
            </Button>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Event</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Type</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Notes</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.title}</TableCell>
                  <TableCell>{new Date(event.startDate).toLocaleString()}</TableCell>
                  <TableCell>{event.type}</TableCell>
                  <TableCell>
                    <Badge color={event.status === 'completed' ? 'green' : 'yellow'}>
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{event.notes}</TableCell>
                </TableRow>
              ))}
              {events.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <Text>No events found for this client</Text>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        <Card>
          <Title>Notes & Additional Information</Title>
          <div className="mt-6">
            <Text className="whitespace-pre-line">{client.notes}</Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ClientDetails;
