import React, { useState } from 'react';
import DashboardLayout from './components/DashboardLayout';
import Overview from './pages/Overview';
import Help from './pages/Help';
import About from './pages/About';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [currentPage, setCurrentPage] = useState('overview');

  const renderPage = () => {
    switch (currentPage) {
      case 'help': return <Help />;
      case 'about': return <About />;
      default: return <Overview />;
    }
  };

  return (
    <DashboardLayout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderPage()}
    </DashboardLayout>
  );
}

export default App;
