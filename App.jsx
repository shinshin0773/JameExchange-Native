import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppBar from './src/components/AppBar';
import TopList from './src/components/TopList';
import CircleButton from './src/components/CircleButton';

export default function App() {
  return (
    <View style={styles.container}>
      <AppBar />
      <TopList />
      <CircleButton>+</CircleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //画面いっぱいに表示
    backgroundColor: '#F0F4F8',
  },
});
