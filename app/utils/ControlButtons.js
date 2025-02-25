import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ControlButtons = ({
  startScanning,
  stopStopwatch,
  resetStopwatch,
  resumeStopwatch, // New prop for Resume function
  sendStopwatchData,
  showScanButton,
  showStopButton,
  showResumeRestartButtons,
  showResumeButton, // New prop to control Resume button visibility
}) => {
  return (
    <View style={styles.buttonContainer}>
      {showScanButton && (
        <View style={styles.singleButtonContainer}>
          <TouchableOpacity style={styles.button} onPress={startScanning}>
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      )}
      {showStopButton && (
        <View style={styles.singleButtonContainer}>
          <TouchableOpacity style={styles.button} onPress={stopStopwatch}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        </View>
      )}
      {showResumeButton && (
        <View style={styles.singleButtonContainer}>
          <TouchableOpacity style={styles.button} onPress={resumeStopwatch}>
            <Text style={styles.buttonText}>Resume</Text>
          </TouchableOpacity>
        </View>
      )}
      {showResumeRestartButtons && (
        <>
          <View style={styles.singleButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={resetStopwatch}>
              <Text style={styles.buttonText}>Restart</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.singleButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={sendStopwatchData}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  singleButtonContainer: {
    width: '60%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#C98F60',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ControlButtons;