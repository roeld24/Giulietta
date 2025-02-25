import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import TimeDisplay from './TimeDisplay';
import ControlButtons from '../utils/ControlButtons';

const Stopwatch = ({ onSave, isRunning, startScanning }) => {
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [showScanButton, setShowScanButton] = useState(true);
  const [showStopButton, setShowStopButton] = useState(false);
  const [showResumeRestartButtons, setShowResumeRestartButtons] = useState(false);
  const [showResumeButton, setShowResumeButton] = useState(false); // New state for Resume button
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      startClock();
      setShowScanButton(false);
      setShowStopButton(true);
      setShowResumeButton(false); // Hide Resume button when timer is running
    } else {
      stopClock();
      setShowStopButton(false);
      setShowResumeRestartButtons(false);
      setShowResumeButton(false)
    }
  }, [isRunning]);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrentTime(prevTime => prevTime + 1000);
    }, 1000);
  };

  const startClock = () => {
    if (!intervalRef.current) {
      setStartTime(new Date());
      startInterval();
    }
  };

  const stopClock = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setShowResumeRestartButtons(true); // Show restart/save buttons when stopped
    setShowResumeButton(true); // Show Resume button when stopped
    setShowStopButton(false);
  };

  const resetClock = () => {
    stopClock();
    setCurrentTime(0);
    setStartTime(null);
    setShowScanButton(true);
    setShowResumeRestartButtons(false);
    setShowResumeButton(false); // Hide Resume button after reset
  };

  const resumeClock = () => {
    setShowResumeButton(false); // Hide Resume button when resuming
    setShowStopButton(true); // Show Stop button
    setShowResumeRestartButtons(false); // Hide Restart and Save buttons when resuming
    startClock();
  };
  

  const saveTime = () => {
    const endTime = new Date();
    const totalSeconds = Math.floor(currentTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const timeData = { date: startTime.toLocaleDateString(), start: startTime.toLocaleTimeString(), end: endTime.toLocaleTimeString(), hours: formattedTime };
    if (onSave) onSave(timeData);
    resetClock();
  };

  return (
    <View style={styles.container}>
      <TimeDisplay time={currentTime} />
      <ControlButtons
        startScanning={startScanning}
        stopStopwatch={stopClock}
        resetStopwatch={resetClock}
        resumeStopwatch={resumeClock} // Pass resume function
        sendStopwatchData={saveTime}
        showScanButton={showScanButton}
        showStopButton={showStopButton}
        showResumeRestartButtons={showResumeRestartButtons}
        showResumeButton={showResumeButton} // Pass showResumeButton state
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Stopwatch;