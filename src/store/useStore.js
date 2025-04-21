import { create } from 'zustand';

const useStore = create((set) => ({
  // Appointments state
  appointments: [],
  addAppointment: (appointment) =>
    set((state) => ({
      appointments: [
        ...state.appointments,
        {
          ...appointment,
          id: Date.now(),
          status: 'pending',
        },
      ],
    })),
  updateAppointmentStatus: (id, status) =>
    set((state) => ({
      appointments: state.appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status } : appointment
      ),
    })),
  deleteAppointment: (id) =>
    set((state) => ({
      appointments: state.appointments.filter((appointment) => appointment.id !== id),
    })),

  // Doctors state
  doctors: [],
  addDoctor: (doctor) =>
    set((state) => ({
      doctors: [...state.doctors, doctor],
    })),

  // Filters state
  filters: {
    selectedSpecialty: 'All Specialties',
    showAvailableOnly: false,
  },
  setSpecialtyFilter: (specialty) =>
    set((state) => ({
      filters: { ...state.filters, selectedSpecialty: specialty },
    })),
  setAvailabilityFilter: (showAvailableOnly) =>
    set((state) => ({
      filters: { ...state.filters, showAvailableOnly },
    })),
}));

export default useStore; 