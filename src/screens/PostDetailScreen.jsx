import React from 'react';
import {
  View , ScrollView,  Text , StyleSheet,
} from 'react-native';

import AppBar from '../components/AppBar';
import CircleButton from '../components/CircleButton';

export default function PostDetailScreen() {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>買い物リスト</Text>
        <Text style={styles.postDate}>2020年12月 10:00</Text>
      </View>
      <ScrollView style={styles.postBody}>
        <Text style={styles.postText}>
          なにわ男子横アリ募集しています。男性の方よろしければいきましょう
        </Text>
      </ScrollView>
      <CircleButton style={{top: 160, bottom: 'auto' }}>★</CircleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
  },
  postHeader: {
    backgroundColor: '#467FD3',
    height: 96,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  postTitle: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  postDate: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight:16,
  },
  postBody: {
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
  postText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
