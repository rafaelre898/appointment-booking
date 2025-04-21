import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DoctorCard from './DoctorCard';
import { SPECIALTIES, LOCATIONS } from '../../constants';
import AppointmentModal from '../appointments/AppointmentModal';

const DoctorList = ({ filters }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data - in a real app, this would come from an API
  const doctors = [
    {
      id: '1',
      name: 'Dr. John Smith',
      specialty: SPECIALTIES[0],
      location: LOCATIONS[0],
      available: true,
      image: 'https://via.placeholder.com/150',
      availableSlots: ['09:00 AM', '10:00 AM', '11:00 AM']
    },
    {
      id: '2',
      name: 'Dr. Sarah Johnson',
      specialty: SPECIALTIES[1],
      location: LOCATIONS[1],
      available: true,
      image: 'https://via.placeholder.com/150',
      availableSlots: ['02:00 PM', '03:00 PM', '04:00 PM']
    },
    {
      id: '3',
      name: 'Dr. Michael Brown',
      specialty: SPECIALTIES[2],
      location: LOCATIONS[2],
      available: false,
      image: 'https://via.placeholder.com/150',
      availableSlots: []
    }
  ];

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  const handleConfirmAppointment = (appointmentData) => {
    // Handle appointment confirmation
    console.log('Appointment booked:', appointmentData);
    handleCloseModal();
  };

  const filteredDoctors = doctors.filter(doctor => {
    if (filters.specialty && doctor.specialty !== filters.specialty) {
      return false;
    }
    if (filters.availability && !doctor.available) {
      return false;
    }
    return true;
  });

  if (filteredDoctors.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 text-lg">No doctors found matching your criteria.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onBookAppointment={handleBookAppointment}
          />
        ))}
      </div>
      {selectedDoctor && (
        <AppointmentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          doctor={selectedDoctor}
          onConfirm={handleConfirmAppointment}
        />
      )}
    </>
  );
};

DoctorList.propTypes = {
  filters: PropTypes.shape({
    specialty: PropTypes.string,
    availability: PropTypes.bool
  }).isRequired
};

export default DoctorList; 