import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TimeDisplay = ({ time }) => {
  // Convert time in milliseconds to seconds for formatting
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000); // Convert to seconds
    const seconds = `0${totalSeconds % 60}`.slice(-2);
    const minutes = `0${Math.floor((totalSeconds / 60) % 60)}`.slice(-2);
    const hours = `0${Math.floor(totalSeconds / 3600)}`.slice(-2);

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Text style={styles.timeText}>{formatTime(time)}</Text>
  );
};

const styles = StyleSheet.create({
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#C98F60',
  },
});

export default TimeDisplay;
