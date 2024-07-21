import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import AdminScreen from '../screens/AdminScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Admin" component={AdminScreen} />
      {/* ... autres écrans */}
    </Stack.Navigator>
  );
}
