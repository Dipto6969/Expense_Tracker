import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from './navigation/StackNavigator';
import { ExpenseProvider } from './context/ExpenseContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <ExpenseProvider>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor="#2196F3" />
          <StackNavigator />
        </NavigationContainer>
      </ExpenseProvider>
    </SafeAreaProvider>
  );
}


