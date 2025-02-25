import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Stopwatch from '../components/StopWatch';
import Toolbar from '../components/Toolbar';
import DateAndTime from '../utils/DateAndTime';
import { useNavigation } from '@react-navigation/native';
import QRScanner from '../components/QRScanner';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isScanning, setIsScanning] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Define the valid QR code
  const validQRCode = "supereroeld%20%C3%A8%20stato%20qua"; // Replace with your actual valid code

  const handleSave = (data) => {
    navigation.navigate('DocumentScreen', { timeData: data });
  };

  const handleScan = (data) => {
    console.log('QR Code scanned:', data);
    
    // Normalize the scanned data and valid QR code for comparison
    const normalizedData = data.trim().toUpperCase();
    const normalizedValidCode = validQRCode.trim().toUpperCase();
  
    // Check if the scanned data matches the valid QR code
    if (normalizedData === normalizedValidCode) {
      setIsScanning(false);
      setIsTimerRunning(true);  // Start timer upon successful scan
    } else {
      alert("Invalid QR Code! Please scan the correct code."); // Alert for invalid code
      setIsScanning(false); // Stop scanning if the code is invalid
      setIsTimerRunning(false); // Ensure timer does not start
    }
  };

  const startScanning = () => {
    setIsScanning(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <DateAndTime />
      {isScanning ? (
        <QRScanner onScan={handleScan} onClose={() => setIsScanning(false)} />
      ) : (
        <View style={styles.content}>
          <Stopwatch onSave={handleSave} isRunning={isTimerRunning} startScanning={startScanning} />
        </View>
      )}
      <Toolbar screen="HomeScreen" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F4E0B5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default HomeScreen;