import React from 'react';
import PropTypes from 'prop-types';
import useStore from '../store/useStore';
import Button from './Button';

const AppointmentCard = ({ appointment }) => {
  const updateAppointmentStatus = useStore((state) => state.updateAppointmentStatus);
  const deleteAppointment = useStore((state) => state.deleteAppointment);

  const handleStatusChange = (status) => {
    updateAppointmentStatus(appointment.id, status);
  };

  const handleDelete = () => {
    deleteAppointment(appointment.id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <article 
      className="bg-white rounded-lg shadow-md p-6"
      role="article"
      aria-labelledby={`appointment-${appointment.id}-title`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 
            id={`appointment-${appointment.id}-title`}
            className="text-lg font-semibold text-gray-900"
          >
            {appointment.doctorName}
          </h3>
          <time 
            dateTime={appointment.date}
            className="text-gray-600"
          >
            {appointment.date}
          </time>
        </div>
        <div className="flex items-center space-x-2">
          <span 
            className={`px-3 py-1 rounded-full text-sm ${getStatusColor(appointment.status)}`}
            role="status"
            aria-label={`Appointment status: ${appointment.status}`}
          >
            {appointment.status}
          </span>
          <span 
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            aria-label={`Appointment time: ${appointment.time}`}
          >
            {appointment.time}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-600" aria-label={`Location: ${appointment.location}`}>
          {appointment.location}
        </p>
        <p className="text-gray-600" aria-label={`Specialty: ${appointment.specialty}`}>
          {appointment.specialty}
        </p>
      </div>

      {appointment.notes && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600" aria-label="Appointment notes">
            {appointment.notes}
          </p>
        </div>
      )}

      <div className="mt-4 flex justify-end space-x-2">
        {appointment.status === 'pending' && (
          <>
            <Button
              variant="success"
              size="small"
              onClick={() => handleStatusChange('approved')}
              aria-label="Approve appointment"
            >
              Approve
            </Button>
            <Button
              variant="danger"
              size="small"
              onClick={() => handleStatusChange('rejected')}
              aria-label="Reject appointment"
            >
              Reject
            </Button>
          </>
        )}
        <Button
          variant="secondary"
          size="small"
          onClick={handleDelete}
          aria-label="Delete appointment"
        >
          Delete
        </Button>
      </div>
    </article>
  );
};

AppointmentCard.propTypes = {
  appointment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    doctorName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['pending', 'approved', 'rejected']).isRequired,
    notes: PropTypes.string,
  }).isRequired,
};

export default AppointmentCard; 