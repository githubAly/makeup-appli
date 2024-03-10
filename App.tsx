// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import MakeupFeedScreen from './src/screens/ViewMakeup';
import { PaperProvider } from 'react-native-paper';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
    <View>
      <MakeupFeedScreen/>
    </View>
    </PaperProvider>
    </QueryClientProvider>
  );
}

export default App;
