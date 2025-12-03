import React from 'react';
import './ViewToggle.css';

const ViewToggle = ({ viewMode, onViewChange }) => {
  return (
    <div className="view-toggle">
      <button
        className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
        onClick={() => onViewChange('list')}
        title="List View"
      >
        ☰ List
      </button>
      <button
        className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
        onClick={() => onViewChange('card')}
        title="Card View"
      >
        ⊞ Grid
      </button>
    </div>
  );
};

export default ViewToggle;

