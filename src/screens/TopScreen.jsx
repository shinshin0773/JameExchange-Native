import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppBar from '../components/AppBar';
import PostList from '../components/PostList';
import CircleButton from '../components/CircleButton';

export default function TopScreen() {
	return (
		<View style={styles.container}>
      <AppBar />
      <PostList />
      <CircleButton>+</CircleButton>
    </View>
	)
}

const styles = StyleSheet.create({
	container: {
    flex: 1, //画面いっぱいに表示
    backgroundColor: '#F0F4F8',
  },
})
