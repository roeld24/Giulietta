import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const QRScanner = ({ onScan, onClose }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarcodeScanned = ({ data }) => {
    setScannedData(data);
    onScan(data); // Notify HomeScreen that a QR code has been scanned
  };

  return (
    <View style={styles.container}>
      <View style={styles.scannerContainer}>
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={handleBarcodeScanned}
        />
      </View>
      {scannedData && (
        <View style={styles.scannedDataContainer}>
          <Text style={styles.scannedDataText}>Scanned Data: {scannedData}</Text>
        </View>
      )}
      <Button title="Close Scanner" onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerContainer: {
    width: 500, // Adjust the width as needed
    height: '60%', // Adjust the height as needed
    overflow: 'hidden', // Ensure the camera view does not overflow
    borderRadius: 10, // Optional: add rounded corners
    borderWidth: 2, // Optional: add a border
    borderColor: '#000', // Optional: border color
    alignItems: 'center', // Center the camera view
    justifyContent: 'center', // Center the camera view
  },
  camera: {
    flex: 1, // Ensure the camera takes up the full space of the container
    width: '100%', // Make sure the camera view takes the full width
  },
  scannedDataContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  scannedDataText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
});

export default QRScanner;