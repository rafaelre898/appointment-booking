import { SPECIALTIES, LOCATIONS } from './index';

export const DOCTORS = [
  {
    id: '1',
    name: 'Dr. John Smith',
    specialty: SPECIALTIES[0],
    location: LOCATIONS[0],
    available: true,
    image: 'https://via.placeholder.com/150',
    availableSlots: ['09:00 AM', '10:00 AM', '11:00 AM'],
    rating: 4.8,
    experience: '15 years',
    description: 'Experienced cardiologist with a focus on preventive care and patient education.',
    languages: ['English', 'Spanish'],
    education: ['MD, Harvard Medical School', 'Cardiology Fellowship, Mayo Clinic'],
    certifications: ['Board Certified in Cardiology', 'Advanced Cardiac Life Support']
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    specialty: SPECIALTIES[1],
    location: LOCATIONS[1],
    available: true,
    image: 'https://via.placeholder.com/150',
    availableSlots: ['02:00 PM', '03:00 PM', '04:00 PM'],
    rating: 4.9,
    experience: '12 years',
    description: 'Dedicated pediatrician committed to providing comprehensive care for children.',
    languages: ['English', 'French'],
    education: ['MD, Johns Hopkins University', 'Pediatrics Residency, Boston Children\'s Hospital'],
    certifications: ['Board Certified in Pediatrics', 'Pediatric Advanced Life Support']
  },
  {
    id: '3',
    name: 'Dr. Michael Brown',
    specialty: SPECIALTIES[2],
    location: LOCATIONS[2],
    available: false,
    image: 'https://via.placeholder.com/150',
    availableSlots: [],
    rating: 4.7,
    experience: '18 years',
    description: 'Expert neurologist specializing in movement disorders and epilepsy.',
    languages: ['English', 'German'],
    education: ['MD, Stanford University', 'Neurology Fellowship, Cleveland Clinic'],
    certifications: ['Board Certified in Neurology', 'Epilepsy Specialist']
  }
]; 