import { useState } from "react";
import QRScanner from "./QrScanner"; // Import the QRScanner component

function App() {
  const [scanResult, setScanResult] = useState("");

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

  return (
    <>
      <div>
        <h1>PET Bottle Recycling QR Scanner</h1>
        <QRScanner onScan={handleScanData} /> {/* Add the QRScanner here */}
      </div>

      {scanResult && (
        <div>
          <p>Scanned Data: {scanResult}</p> {/* Display scanned data */}
        </div>
      )}
    </>
  );
}

export default App;
