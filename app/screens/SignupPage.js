import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import BASE_URL from '../utils/Config';

const handleSignup = async () => {
  console.log('Requesting POST to /register', { email, password });

  try {
    const response = await fetch('http://192.168.1.142:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonData = await response.json();  // Analizza il JSON direttamente
    console.log('Response from server:', jsonData);

    Alert.alert('Registration Successful', 'You can now log in!');
    navigation.navigate('Login');
  } catch (error) {
    console.error('Signup error:', error);
    Alert.alert('Error', 'An error occurred during registration.');
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Sign Up" onPress={handleSignup} />
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Already have an account? Log in here.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { height: 50, borderColor: '#ccc', borderWidth: 1, marginBottom: 20, padding: 10 },
  link: { color: 'blue', marginTop: 20, textAlign: 'center' },
});

export default SignupPage;
