import React from 'react';
import './Sidebar.css';

export default function Sidebar({ onSelect }) {
  return (
    <div className="sidebar bg-dark text-white p-3">
      <h4 className="mb-4">EnviroMonitor</h4>
      <ul className="nav flex-column">
  <li className="nav-item mb-2">
    <button className="nav-link text-white" onClick={() => onSelect('overview')}>
      📌 Tổng quan
    </button>
  </li>
  <li className="nav-item mb-2">
    <button className="nav-link text-white" onClick={() => onSelect('help')}>
      📖 HDSD
    </button>
  </li>
  <li className="nav-item">
    <button className="nav-link text-white" onClick={() => onSelect('about')}>
      👨‍💻 Giới thiệu
    </button>
  </li>
  </ul>
    </div>
  );
}
