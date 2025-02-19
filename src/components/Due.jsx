import React from 'react';

const DueLocations = () => {
  return (
    <div className="due-locations-container">
      <h2>Due Locations</h2>
      <div className="location-boxes">
        {/* Kandy Box */}
        <div className="location-box">
          <h3>Kandy</h3>
          <ul>
            <li>Temple of the Tooth</li>
            <li>Kandy Lake</li>
            <li>Peradeniya Botanical Gardens</li>
            <li>Hanthana Mountain Range</li>
            <li>Gadaladeniya Temple</li>
          </ul>
        </div>

        {/* Jaffna Box */}
        <div className="location-box">
          <h3>Jaffna</h3>
          <ul>
            <li>Nallur Kovil</li>
            <li>Jaffna Fort</li>
            <li>Point Pedro</li>
            <li>Casuarina Beach</li>
            <li>Jaffna Library</li>
          </ul>
        </div>

        {/* Colombo Box */}
        <div className="location-box">
          <h3>Colombo</h3>
          <ul>
            <li>Galle Face Green</li>
            <li>Colombo National Museum</li>
            <li>Buddhist Temple of the Tooth</li>
            <li>Independence Square</li>
            <li>Viharamahadevi Park</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DueLocations;
