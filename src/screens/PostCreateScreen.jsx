import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
//レスポンシブデザインに対応するライブラリ↓
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import firebase from "firebase";

// import CircleButton from '../components/CircleButton';
import ImagePickerExample from "../components/ImagePicker";
import MainButton from "../components/mainButton";
import SelectPicker from "../components/SelectPicker";
import KeyboardSafeView from "../components/KeyboradSafeView";

export default function PostCreateScreen(props) {
  const { navigation } = props;
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [group, setgroup] = useState("");
  const [intro, setIntro] = useState("");
  const [image, setImage] = useState("");

  function handlePress() {
    const { currentUser } = firebase.auth(); //現在ログインしているユーザをcurrentuserとして抜き出せる
    const db = firebase.firestore();
    const ref = db.collection(`users/${currentUser.uid}/memos`); //currentuser.uidでユーザIDをとってこれる
    ref
      .add({
        nickName: name,
        Title: title,
        Intro: intro,
        updatedAt: new Date(),
      })
      .then((docRef) => {
        console.log("Created!", docRef.id);
      })
      .catch((error) => {
        console.log("Error!", error);
      });
    navigation.navigate("TopScreen");
  }

  return (
    <KeyboardSafeView style={styles.container} behavior="height">
      <ScrollView style={styles.inputWrap}>
        <View style={styles.inputView}>
          <Text style={styles.inputStartTitle}>募集</Text>
          <View style={styles.inputTitleWrap}>
            <Text style={styles.inputTitle}>ニックネーム</Text>
            <TextInput
              style={styles.inputText}
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
              autoFocus //ページが開けたら自動的にキーボードが開ける
            />
          </View>
          <View style={styles.inputTitleWrap}>
            <Text style={styles.inputTitle}>タイトル</Text>
            <TextInput
              style={styles.inputText}
              value={title}
              onChangeText={(text) => {
                setTitle(text);
              }}
            />
          </View>
          <View style={styles.inputTitleWrap}>
            <Text style={styles.inputTitle}>グループ名</Text>
            <SelectPicker />
          </View>
          <View style={styles.inputTitleWrap}>
            <Text style={styles.inputTitle}>説明</Text>
            <TextInput
              style={styles.inputText}
              multiline
              value={intro}
              onChangeText={(text) => {
                setIntro(text);
              }}
            />
          </View>
          <View style={styles.inputTitleWrap}>
            <Text style={styles.inputTitle}>サムネイル画像</Text>
            <ImagePickerExample />
          </View>

          <MainButton label="募集する" onPress={handlePress} />
        </View>
      </ScrollView>
    </KeyboardSafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  inputWrap: {
    width: "100%", // デバイスの横幅の80%
  },
  inputView: {
    width: "80%",
    justifyContent: "center",
    marginVertical: 30,
    marginLeft: "auto",
    marginRight: "auto",
  },
  inputStartTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputTitleWrap: {
    marginTop: 15,
    height: hp("10%"),
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputText: {
    paddingVertical: 7,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",
  },
});
