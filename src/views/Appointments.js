import React from 'react';
import AppointmentCard from '../components/AppointmentCard';
import { Link } from 'react-router-dom';
import useStore from '../store/useStore';

const Appointments = () => {
  const appointments = useStore((state) => state.appointments);

  if (appointments.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">My Appointments</h1>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600">You don't have any appointments scheduled.</p>
          <Link
            to="/"
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Book an Appointment
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
};

export default Appointments;