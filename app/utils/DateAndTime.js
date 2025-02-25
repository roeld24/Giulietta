import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DateAndTime = () => {
    const [currentTime, setCurrentTime] = useState('');
  
    useEffect(() => {
      const updateTime = () => {
        const now = new Date();
        const day = now.toLocaleDateString(undefined, { weekday: 'long' });
        const date = now.getDate(); // Day of the month
        const month = now.toLocaleDateString(undefined, { month: 'long' }); // Month name
        const time = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
        setCurrentTime(`${day}, ${date} ${month} ${time}`);
      };
  
      updateTime(); // Initialize time
      const intervalId = setInterval(updateTime, 1000); // Update every second
  
      return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);
  
    return (
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateTimeText}>{currentTime}</Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    dateTimeContainer: {
      justifyContent: 'flex-start',
      marginTop:30,
      alignItems: 'center',
    },
    dateTimeText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#C98F60', // White text
    },
  });


export default DateAndTime;
