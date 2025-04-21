import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/ui/Button';
import useStore from '../../store/useStore';

const defaultTimeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];

const AppointmentModal = ({ isOpen, onClose, doctor, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState('20');
  const [selectedTime, setSelectedTime] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [imageError, setImageError] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);

  const dates = ['18', '19', '20', '21', '22'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  // Get appointments from the store
  const appointments = useStore((state) => state.appointments);

  // Update booked slots whenever selected date or appointments change
  useEffect(() => {
    const currentDate = `September ${selectedDate}, 2023`;
    const slotsForDate = appointments
      .filter(appointment => 
        appointment.date === currentDate && 
        appointment.doctorId === doctor.id
      )
      .map(appointment => appointment.time);
    
    setBookedSlots(slotsForDate);
  }, [selectedDate, appointments, doctor.id]);

  if (!isOpen) return null;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTime) return;
    
    onConfirm({
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty || doctor.specialties?.[0] || 'General',
      location: doctor.location,
      date: `September ${selectedDate}, 2023`,
      time: selectedTime,
      patientName,
      patientEmail,
      patientPhone,
      notes
    });
  };

  // Use doctor's availableSlots or default time slots
  const availableSlots = doctor.availableSlots || defaultTimeSlots;

  const isSlotBooked = (time) => {
    return bookedSlots.includes(time);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
            {imageError ? (
              <div 
                className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-semibold"
                aria-label={`${doctor.name} profile picture placeholder`}
              >
                {getInitials(doctor.name)}
              </div>
            ) : (
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-12 h-12 rounded-full object-cover"
                onError={handleImageError}
              />
            )}
            <div>
              <h2 className="text-xl font-semibold">{doctor.name}</h2>
              <p className="text-gray-600">{doctor.specialty || doctor.specialties?.[0] || 'General'}</p>
            </div>
          </div>
          <Button
            variant="link"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">September 2023</h3>
              <Button
                variant="link"
                aria-label="View calendar"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </Button>
            </div>

            <div className="grid grid-cols-5 gap-2 mb-6">
              {dates.map((date, index) => (
                <Button
                  key={date}
                  variant={selectedDate === date ? 'primary' : 'outline'}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedTime(null);
                  }}
                  className="p-4"
                  aria-label={`Select ${days[index]}, September ${date}`}
                >
                  <div className="text-sm font-medium">{days[index]}</div>
                  <div className="text-lg">{date}</div>
                </Button>
              ))}
            </div>

            <h3 className="text-lg font-medium mb-4">Available Time Slots</h3>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {availableSlots.map((time) => {
                const isBooked = isSlotBooked(time);
                return (
                  <Button
                    key={time}
                    variant={selectedTime === time ? 'primary' : 'outline'}
                    onClick={() => !isBooked && setSelectedTime(time)}
                    disabled={isBooked}
                    className={`p-3 ${isBooked ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title={isBooked ? 'This time slot is already booked' : ''}
                  >
                    {time}
                    {isBooked && (
                      <span className="absolute top-1 right-1 text-xs text-red-500">
                        Booked
                      </span>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes for your appointment"
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              size="medium"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="medium"
              disabled={!selectedTime || !patientName || !patientEmail || !patientPhone}
            >
              Confirm Appointment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

AppointmentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  doctor: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    specialty: PropTypes.string,
    specialties: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.string.isRequired,
    image: PropTypes.string,
    availableSlots: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default AppointmentModal; 