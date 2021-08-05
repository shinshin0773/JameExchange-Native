import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import firebase from "firebase";

import Button from "../components/Button";

export default function ProfileCreateScreen(props) {
  const [name, setName] = useState("");
  const [twitterId, setTwitterId] = useState("");
  const [intro, setIntro] = useState("");
  const { navigation } = props;

  function handlePress() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const ref = db.collection(`users/${currentUser.uid}/profiles`);
    ref
      .add({
        Name: name,
        TwitterId: twitterId,
        Intro: intro,
        updatedAt: new Date(),
      })
      .then((docRef) => {
        console.log("Edit!", docRef.id);
      })
      .catch((error) => {
        console.log("Error!", error);
      });
    navigation.reset({
      index: 0,
      routes: [{ name: "TopScreen" }],
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>プロフィール作成</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => {
            setName(text); //onChangeTextはイベントが起こった時に発火する関数Email文字を受け取る
          }}
          placeholder="ニックネーム" //何も入力していない時の文字
        />

        <TextInput
          style={styles.input}
          value={twitterId}
          onChangeText={(text) => {
            setTwitterId(text); //onChangeTextはイベントが起こった時に発火する関数Email文字を受け取る
          }}
          placeholder="TwitterID" //何も入力していない時の文字
        />

        <TextInput
          style={styles.input}
          value={intro}
          onChangeText={(text) => {
            setIntro(text); //onChangeTextはイベントが起こった時に発火する関数Email文字を受け取る
          }}
          placeholder="自己紹介" //何も入力していない時の文字
        />

        <Button label="登録する" onPress={handlePress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  inner: {
    paddingHorizontal: 27,
    paddingVertical: 27,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    height: 48,
    backgroundColor: "white",
    borderColor: "#dddddd",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: "#467FD3",
  },
  footer: {
    flexDirection: "row",
  },
});
