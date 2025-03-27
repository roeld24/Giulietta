import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DocumentScreen from './screens/DocumentScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginPage from './screens/LoginPage';
import SignupPage from './screens/SignupPage';


const Stack = createStackNavigator();

const App = () => {
  return (
    
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DocumentScreen" component={DocumentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupPage} options={{ headerShown: false }} />

      </Stack.Navigator>

  );
};

export default App;
