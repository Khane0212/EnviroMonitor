import React from 'react';
import Sidebar from './Sidebar';

export default function DashboardLayout({ currentPage, setCurrentPage, children }) {
  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#121212' }}>
      <Sidebar onSelect={setCurrentPage} />
      <div
        className="flex-grow-1 p-4"
        style={{
          backgroundColor: '#1c1c1c',
          color: 'white',
          minHeight: '100vh',
          width: 'calc(100vw - 220px)',
          overflowX: 'hidden'
        }}
      >
        {children}
      </div>
    </div>
  );
}
