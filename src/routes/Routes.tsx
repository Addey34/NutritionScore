import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Calculator } from '../pages/Calculator';
import { Contact } from '../pages/Contact';
import { Home } from '../pages/Home';
import { Pricing } from '../pages/Pricing';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<h1>404 - Page not found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
