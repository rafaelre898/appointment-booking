import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Appointments from '../pages/Appointments';
import DoctorProfileForm from '../components/forms/DoctorProfileForm';
import Layout from '../components/layout/Layout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/appointments" element={<Layout><Appointments /></Layout>} />
      <Route path="/create-doctor" element={<Layout><DoctorProfileForm /></Layout>} />
    </Routes>
  );
};

export default AppRoutes; 