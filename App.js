import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Switch, ActivityIndicator, Image, Pressable, FlatList } from 'react-native';
import Navigation from './src/navigation';

export default function App() {
  return (
    <Navigation />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});