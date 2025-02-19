import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";

const BinScan = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // Zoom level for scanning

  // Function to scan the QR Code from the video stream
  const scanQRCode = () => {
    const webcam = webcamRef.current;
    const canvas = canvasRef.current;

    if (webcam && webcam.video.readyState === 4) {
      const context = canvas.getContext("2d");
      if (webcam.video.videoWidth && webcam.video.videoHeight) {
        canvas.width = webcam.video.videoWidth;
        canvas.height = webcam.video.videoHeight;
        context.drawImage(webcam.video, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

        if (qrCode) {
          setScannedData(qrCode.data); // Set the scanned data
        } else {
          setScannedData(null); // Reset if QR code not found
        }
      }
    }
  };

  // Start scanning and run the scanQRCode function every frame
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        scanQRCode();
      }, 100); // Scanning every 100ms for better performance
      return () => clearInterval(interval); // Clean up interval on unmount
    } else {
      // Optionally, stop webcam when scanning stops
      webcamRef.current?.video?.srcObject?.getTracks().forEach(track => track.stop());
    }
  }, [isScanning]);

  // Handle zoom level change
  const handleZoomChange = (e) => {
    setZoomLevel(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
      {/* Logo in the top-left corner */}
      <div className="absolute top-4 left-4">
        <img src="/logo.png" alt="Logo" className="w-16 h-16" />
      </div>

      {/* QR Image as Placeholder before scanning starts */}
      {!isScanning ? (
        <div className="flex items-center justify-center w-80 h-80 bg-white rounded-lg shadow-md">
          <img src="/qr.jpeg" alt="Scan QR Code" className="w-40 h-40" />
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => setIsScanning(true)}
          >
            Start Scanning
          </button>
        </div>
      ) : (
        <div className="relative flex flex-col items-center bg-white p-6 rounded-2xl shadow-md">
          <Webcam
            ref={webcamRef}
            className="w-full rounded-lg"
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "environment", // Rear camera
            }}
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: "center", // Keep the zoom centered
            }}
          />
          <canvas ref={canvasRef} className="hidden" />
          {scannedData ? (
            <p className="mt-4 text-green-600 font-semibold">
              Scanned QR Code: {scannedData}
            </p>
          ) : (
            <p className="mt-4 text-red-600 font-semibold">
              No QR Code detected
            </p>
          )}
          <div className="mt-4">
            {/* Zoom controls */}
            <button
              onClick={() => setZoomLevel(Math.max(zoomLevel - 0.1, 1))}
              className="px-3 py-1 bg-gray-400 text-white rounded-lg"
            >
              Zoom Out
            </button>
            <input
              type="range"
              min="1"
              max="3"
              step="0.1"
              value={zoomLevel}
              onChange={handleZoomChange}
              className="mx-2"
            />
            <button
              onClick={() => setZoomLevel(Math.min(zoomLevel + 0.1, 3))}
              className="px-3 py-1 bg-gray-400 text-white rounded-lg"
            >
              Zoom In
            </button>
            <p className="mt-2 text-gray-600">Zoom Level: {zoomLevel.toFixed(1)}</p>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={() => setIsScanning(false)}
          >
            Stop Scanning
          </button>
        </div>
      )}
    </div>
  );
};

export default BinScan;
