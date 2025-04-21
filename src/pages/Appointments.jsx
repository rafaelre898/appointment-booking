import React, { useState } from 'react';
import DoctorList from '../views/doctors/DoctorList';
import { SPECIALTIES } from '../constants';
import Filter from "../views/doctors/Filter"
import AppointmentsList from '../views/appointments/AppointmentsList';

const Appointments = () => {
  const [filters, setFilters] = useState({
    specialty: '',
    availability: false,
  });

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
     <AppointmentsList />
    </div>
  );
};

export default Appointments; 