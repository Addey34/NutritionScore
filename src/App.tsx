import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AppRoutes from './routes/Routes';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: '60px' }}> {/* Pour éviter que le contenu soit caché sous la navbar */}
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
