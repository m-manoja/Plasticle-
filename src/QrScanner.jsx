import { useState, useRef, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const QRScanner = ({ onScan, zoomLevel }) => {
  const [scanResult, setScanResult] = useState("");
  const videoRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());

  useEffect(() => {
    if (videoRef.current) {
      codeReader.current.decodeFromVideoDevice(
        null, // use default camera
        videoRef.current,
        (result, error) => {
          if (result) {
            setScanResult(result.getText());
            onScan(result.getText()); // Send the scanned data to the parent
          }
          if (error) console.error(error);
        }
      );
    }

    return () => {
      // Cleanup the reader when component is unmounted
      codeReader.current.reset();
    };
  }, [onScan]);

  return (
    <div style={{ position: "relative" }}>
      <h2>Scan QR Code</h2>

      {/* Video feed remains the same size */}
      <video ref={videoRef} style={{ width: "100%" }} />
      
      {/* Zoomed scanning area */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          width: "60%",
          height: "60%",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          transform: `scale(${zoomLevel})`, // Zoom the scanning area
          pointerEvents: "none", // Disable interaction with the zoom box
          zIndex: 1,
        }}
      >
        {/* This area is just for visual zoom effect, not affecting the camera feed */}
      </div>

      {scanResult && <p>Scanned Data: {scanResult}</p>}
    </div>
  );
};

export default QRScanner;
