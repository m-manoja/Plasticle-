import { useState } from "react";
import QRScanner from "./QRScanner"; // Import the QRScanner component
import { FaCamera } from "react-icons/fa"; // Import camera icon
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'; // Import necessary router components
import './App.css';

import DueLocations from "./components/Due"; // Import the Due Locations page component

function Home() {
  const [scanning, setScanning] = useState(false); // State to toggle scanner
  const [zoomLevel, setZoomLevel] = useState(1); // State to track zoom level
  const [scanResult, setScanResult] = useState(""); // Added missing useState for scan result

  const navigate = useNavigate(); // Hook to navigate to other pages

  const handleScanData = (data) => {
    setScanResult(data); // Store the scanned data
    console.log("Scanned QR Code:", data);

    // Check if the scanned data is a valid URL
    try {
      const url = new URL(data);
      // If it's a valid URL, redirect to it
      window.location.href = url.href;
    } catch (e) {
      console.log("Not a valid URL:", data);
    }
  };

  const handleZoomChange = (e) => {
    setZoomLevel(parseFloat(e.target.value)); // Ensure zoom level is a number
  };

  return (
    <div className="app-container">
      {/* QR Placeholder until scanning starts */}
      {!scanning && !scanResult && (
        <img src="/qr.jpeg" alt="QR Placeholder" className="qr-placeholder" />
      )}

      {/* Camera Button to Start Scanning */}
      {!scanning && !scanResult && (
        <button className="camera-button" onClick={() => setScanning(true)}>
          <FaCamera size={24} />
        </button>
      )}

      {/* Show Scanner when scanning is true */}
      {scanning && (
        <div className="scanner-container">
          <QRScanner onScan={handleScanData} zoomLevel={zoomLevel} />

          {/* Zoom Control */}
          <div className="zoom-control">
            <button onClick={() => setZoomLevel(prev => Math.max(prev - 0.1, 1))}>-</button>
            <input 
              type="range" 
              min="1" 
              max="3" 
              step="0.1" 
              value={zoomLevel} 
              onChange={handleZoomChange} 
            />
            <button onClick={() => setZoomLevel(prev => Math.min(prev + 0.1, 3))}>+</button>
          </div>

          {/* Ok Button */}
          <button className="ok-button" onClick={() => setScanning(false)}>OK</button>
        </div>
      )}

      {/* Display scanned data */}
      {scanResult && (
        <div className="scan-result">
          <p>Scanned Data: {scanResult}</p>
        </div>
      )}

      {/* Navigate to Due Locations Page */}
      <button onClick={() => navigate('/due-locations')} className="navigate-button">
        Due Locations
      </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/due-locations" element={<DueLocations />} />
      </Routes>
    </Router>
  );
}

export default App;
