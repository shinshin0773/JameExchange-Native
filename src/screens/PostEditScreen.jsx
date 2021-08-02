import React from 'react';
import {
  View ,  StyleSheet, TextInput, Text
} from 'react-native';

import AppBar from '../components/AppBar';
import CircleButton from '../components/CircleButton';

export default function PostEditScreen() {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.inputWrap}>
        <Text style={styles.inputStartTitle}>募集してみよう！</Text>
        <View style={styles.inputTitleWrap}>
          <Text style={styles.inputTitle}>ニックネーム：</Text>
          <TextInput style={styles.inputText} value="あかさ" />
        </View>
        <View style={styles.inputTitleWrap}>
          <Text style={styles.inputTitle}>タイトル：</Text>
          <TextInput style={styles.inputText} value="横アリ募集" />
        </View>
        <View style={styles.inputTitleWrap}>
          <Text style={styles.inputTitle}>グループ名：</Text>
          <TextInput style={styles.inputText} value="TOKIO" />
        </View>
        <View style={styles.inputTitleWrap}>
          <Text style={styles.inputTitle}>説明：</Text>
          <TextInput style={styles.inputText} value="募集中です" multiline />
        </View>
        <View style={styles.inputTitleWrap}>
          <Text style={styles.inputTitle}>サムネイル画像：</Text>
          <TextInput style={styles.inputText} value="https//" />
        </View>

        <View style={styles.postButton}>
          <Text style={styles.postButtonText}>募　集</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrap: {
    width: 300,
    marginVertical: 80,
    marginHorizontal: 50,
  },
  inputStartTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputTitleWrap: {
    marginTop: 20,
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputText: {
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
  postButton: {
    width: 120,
    height: 50,
    backgroundColor: '#E93B81',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 50,
    marginHorizontal: 90,
  },
  postButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }
})
