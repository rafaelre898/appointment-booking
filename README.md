# Doctor Appointment Booking System

A responsive and accessible web application for booking doctor appointments. Built with React, Redux, and Tailwind CSS.

## Features

- Browse and filter doctors by specialty and availability
- Search doctors by name, specialty, or location
- Book appointments with available doctors
- View and manage booked appointments
- Fully responsive design
- Keyboard accessible
- Modern and clean UI

## Tech Stack

- React 18
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- PropTypes for type checking

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd doctor-appointment
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

## Project Structure

```
src/
  ├── components/        # Reusable UI components
  ├── data/             # Mock data
  ├── hooks/            # Custom React hooks
  ├── pages/            # Page components
  ├── redux/            # Redux store and slices
  ├── styles/           # Global styles
  └── App.js            # Main application component
```

## Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance
- Focus management
- Screen reader friendly

## Future Improvements

- Add authentication and user profiles
- Implement real-time availability updates
- Add appointment reminders
- Integrate with a backend API
- Add more filtering options
- Implement appointment cancellation
- Add doctor reviews and ratings
