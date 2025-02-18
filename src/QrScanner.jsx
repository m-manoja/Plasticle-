import { useState, useRef, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

const QRScanner = ({ onScan }) => {
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
    <div>
      <h2>Scan QR Code</h2>
      <video ref={videoRef} style={{ width: "100%" }} />
      {scanResult && <p>Scanned Data: {scanResult}</p>}
    </div>
  );
};

export default QRScanner;
