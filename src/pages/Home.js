import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { doctors as initialDoctors, specialties } from '../data/doctors';
import useStore from '../store/useStore';
import Filter from '../views/doctors/Filter';
import AppointmentModal from '../views/appointments/AppointmentModal';
import Notification from '../components/ui/Notification';
import { useModal } from '../hooks/useModal';

const Home = () => {
  const { selectedSpecialty, showAvailableOnly, setSpecialtyFilter, setAvailabilityFilter } = useStore((state) => ({
    selectedSpecialty: state.filters.selectedSpecialty,
    showAvailableOnly: state.filters.showAvailableOnly,
    setSpecialtyFilter: state.setSpecialtyFilter,
    setAvailabilityFilter: state.setAvailabilityFilter,
  }));
  
  const appointments = useStore((state) => state.appointments);
  const addAppointment = useStore((state) => state.addAppointment);
  const addedDoctors = useStore((state) => state.doctors);
  
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const [localDoctors, setLocalDoctors] = useState(initialDoctors.map(doctor => ({ ...doctor })));

  // Combine all doctors
  const allDoctors = [...localDoctors, ...addedDoctors];

  const isTimeSlotBooked = (doctorId, date, time) => {
    return appointments.some(appointment => 
      appointment.doctorId === doctorId && 
      appointment.date === date && 
      appointment.time === time
    );
  };

  const filteredDoctors = allDoctors.filter((doctor) => {
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || 
      (Array.isArray(doctor.specialties) 
        ? doctor.specialties.includes(selectedSpecialty)
        : doctor.specialty === selectedSpecialty);
    const matchesSearch = searchQuery.trim() === '' || 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(doctor.specialties)
        ? doctor.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))
        : doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())) ||
      doctor.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const isAvailable = doctor.availableSlots && doctor.availableSlots.length > 0;
    const matchesAvailability = !showAvailableOnly || isAvailable;
    
    return matchesSpecialty && matchesSearch && matchesAvailability;
  });

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    openModal();
  };

  const handleSpecialtyChange = (specialty) => {
    setSpecialtyFilter(specialty);
  };

  const handleAvailabilityChange = (availableOnly) => {
    setAvailabilityFilter(availableOnly);
  };

  const handleConfirmBooking = (appointmentDetails) => {
    const newAppointment = {
      id: Date.now().toString(),
      doctorId: selectedDoctor.id.toString(),
      doctorName: selectedDoctor.name,
      specialty: Array.isArray(selectedDoctor.specialties) 
        ? selectedDoctor.specialties[0] 
        : selectedDoctor.specialty,
      location: selectedDoctor.location,
      date: appointmentDetails.date,
      time: appointmentDetails.time,
      patientName: appointmentDetails.patientName,
      patientEmail: appointmentDetails.patientEmail,
      patientPhone: appointmentDetails.patientPhone,
      notes: appointmentDetails.notes || '',
      status: 'pending'
    };
    
    addAppointment(newAppointment);
    closeModal();
    setShowNotification(true);
  };

  const handleClearFilters = () => {
    setSpecialtyFilter('All Specialties');
    setAvailabilityFilter(false);
    setSearchQuery('');
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Find a Doctor</h1>
        <Link
          to="/create-doctor"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Add new doctor profile"
        >
          Add New Doctor
        </Link>
      </div>

      <Filter
        specialties={['All Specialties', ...specialties]}
        selectedSpecialty={selectedSpecialty}
        onSpecialtyChange={handleSpecialtyChange}
        showAvailableOnly={showAvailableOnly}
        onAvailabilityChange={handleAvailabilityChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearFilters={handleClearFilters}
      />

      <div 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="List of doctors"
      >
        {filteredDoctors.map((doctor) => (
          <article 
            key={doctor.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden"
            role="listitem"
          >
            {doctor.image && (
              <img
                src={typeof doctor.image === 'string' ? doctor.image : URL.createObjectURL(doctor.image)}
                alt={`${doctor.name}'s profile picture`}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{doctor.name}</h2>
              <p className="text-gray-600">{doctor.location}</p>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-700">Specialties:</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(Array.isArray(doctor.specialties) ? doctor.specialties : [doctor.specialty]).map((specialty, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      role="listitem"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleBookClick(doctor)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label={`Book appointment with ${doctor.name}`}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {isOpen && selectedDoctor && (
        <AppointmentModal
          isOpen={isOpen}
          onClose={closeModal}
          doctor={selectedDoctor}
          onConfirm={handleConfirmBooking}
        />
      )}

      {showNotification && (
        <Notification
          message={`Appointment booked successfully with ${selectedDoctor.name}`}
          type="success"
          onClose={() => setShowNotification(false)}
        />
      )}
    </main>
  );
};

export default Home;