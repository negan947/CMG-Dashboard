import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import {
  Card,
  Title,
  Text,
  TextInput,
  Select,
  SelectItem,
  Button,
  Textarea,
} from '@tremor/react';
import { clientService } from '../../services/clientService';

const ClientForm = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    contactName: '',
    email: '',
    phone: '',
    status: 'active',
    priority: 'medium',
    address: '',
    notes: '',
  });

  useEffect(() => {
    if (id) {
      loadClient();
    }
  }, [id]);

  const loadClient = async () => {
    try {
      setLoading(true);
      const data = await clientService.getClientById(id);
      setFormData(data);
    } catch (error) {
      console.error('Error loading client:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await clientService.updateClient(id, formData);
      } else {
        await clientService.createClient(formData);
      }
      navigate('/clients');
    } catch (error) {
      console.error('Error saving client:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
            {id ? 'Edit Client' : 'New Client'}
          </h1>
          <p className={`mt-2 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {id ? 'Update client information' : 'Add a new client to your portfolio'}
          </p>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <Title>Basic Information</Title>
            <div className="mt-6 space-y-4">
              <div>
                <Text>Client Name</Text>
                <TextInput
                  className="mt-1"
                  placeholder="Enter client name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Text>Industry</Text>
                  <Select
                    className="mt-1"
                    value={formData.industry}
                    onValueChange={(value) => handleChange('industry', value)}
                  >
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </Select>
                </div>
                <div>
                  <Text>Status</Text>
                  <Select
                    className="mt-1"
                    value={formData.status}
                    onValueChange={(value) => handleChange('status', value)}
                  >
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <Title>Contact Information</Title>
            <div className="mt-6 space-y-4">
              <div>
                <Text>Contact Name</Text>
                <TextInput
                  className="mt-1"
                  placeholder="Enter contact person's name"
                  value={formData.contactName}
                  onChange={(e) => handleChange('contactName', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Text>Email Address</Text>
                  <TextInput
                    className="mt-1"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
                <div>
                  <Text>Phone Number</Text>
                  <TextInput
                    className="mt-1"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Text>Address</Text>
                <TextInput
                  className="mt-1"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                />
              </div>
            </div>
          </Card>

          <Card>
            <Title>Additional Details</Title>
            <div className="mt-6 space-y-4">
              <div>
                <Text>Priority Level</Text>
                <Select
                  className="mt-1"
                  value={formData.priority}
                  onValueChange={(value) => handleChange('priority', value)}
                >
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </Select>
              </div>

              <div>
                <Text>Notes</Text>
                <Textarea
                  className="mt-1"
                  placeholder="Add any additional notes or comments"
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button
              variant="secondary"
              onClick={() => navigate('/clients')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={loading}
            >
              {id ? 'Update Client' : 'Create Client'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
