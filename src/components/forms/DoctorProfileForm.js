import React, { useState } from 'react';
import useStore from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';

const DoctorProfileForm = () => {
  const addDoctor = useStore((state) => state.addDoctor);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    specialties: '',
    image: null,
    available: true, // Default to available
  });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const doctorData = {
      id: Date.now(),
      ...formData,
      specialties: formData.specialties.split(',').map(spec => spec.trim()),
      isInitial: false, // Mark as not initial doctor
      availableSlots: [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
      ], // Add default available time slots
    };
    addDoctor(doctorData);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center" id="form-title">Create Doctor Profile</h2>
      <form 
        onSubmit={handleSubmit} 
        className="space-y-4"
        aria-labelledby="form-title"
      >
        <Input
          id="name"
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter doctor's name"
        />

        <Input
          id="location"
          label="Location"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          placeholder="Enter doctor's location"
        />

        <Input
          id="specialties"
          label="Specialties"
          type="text"
          name="specialties"
          value={formData.specialties}
          onChange={handleChange}
          required
          placeholder="Enter specialties (comma separated)"
          helpText="Separate multiple specialties with commas"
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            id="available"
            name="available"
            checked={formData.available}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label 
            htmlFor="available" 
            className="ml-2 block text-sm text-gray-700"
          >
            Available for appointments
          </label>
        </div>

        <div>
          <label 
            htmlFor="image" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Profile Picture (Optional)
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="mt-1 block w-full"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
        >
          Create Profile
        </Button>
      </form>
    </div>
  );
};

export default DoctorProfileForm; 