import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/ui/Button';

const DoctorCard = ({ doctor, onBookAppointment }) => {
  const { name, specialty, location, available, image } = doctor;
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
      <div className="flex items-start space-x-4 mb-4">
        {imageError ? (
          <div 
            className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-semibold"
            aria-label={`${name} profile picture placeholder`}
          >
            {getInitials(name)}
          </div>
        ) : (
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
            onError={handleImageError}
          />
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-gray-600">{specialty}</p>
          <div className="mt-1">
            <span className={`inline-block px-2 py-1 text-sm rounded-full ${
              available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {available ? 'Available' : 'Unavailable'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-gray-600 mb-4">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span>{location}</span>
      </div>

      <Button
        variant="primary"
        fullWidth
        onClick={() => onBookAppointment(doctor)}
        disabled={!available}
        aria-label={`Book appointment with ${name}`}
      >
        Book Appointment
      </Button>
    </div>
  );
};

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onBookAppointment: PropTypes.func.isRequired,
};

export default DoctorCard;