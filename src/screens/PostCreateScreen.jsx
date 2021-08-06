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
import { translateErrors } from "../utils";

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
        const errorMsg = translateErrors(error.code);
        Alert.alert(errorMsg.title, errorMsg.description);
      });
    navigation.navigate("TopScreen");
  }

  return (
    <KeyboardSafeView style={styles.container} behavior="height">
      <ScrollView style={styles.inputWrap}>
        <View style={styles.inputView}>
          <Text style={styles.inputStartTitle}>募集</Text>
          <View style={styles.inputTitleWrap}>
            <View style={styles.inputTitleWidth}>
              <Text style={styles.inputTitle}>ニックネーム</Text>
              <TextInput
                style={styles.inputText}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                }}
                placeholder="未入力"
                autoFocus //ページが開けたら自動的にキーボードが開ける
              />
            </View>
          </View>
          <View style={styles.inputTitleWrap}>
            <View style={styles.inputTitleWidth}>
              <Text style={styles.inputTitle}>タイトル</Text>
              <TextInput
                style={styles.inputText}
                placeholder="未入力"
                value={title}
                onChangeText={(text) => {
                  setTitle(text);
                }}
              />
            </View>
          </View>
          <View style={styles.inputTitleWrap}>
            <View style={styles.inputTitleWidth}>
              <Text style={styles.inputTitle}>グループ名</Text>
              <SelectPicker style={{ left: 1, top: 8 }} />
            </View>
          </View>
          <View style={styles.inputTitleIntroWrap}>
            <View style={styles.inputTitleWidth}>
              <Text style={styles.inputTitle}>説明</Text>
              <TextInput
                style={styles.inputTextIntro}
                placeholder="未入力"
                multiline
                value={intro}
                onChangeText={(text) => {
                  setIntro(text);
                }}
              />
            </View>
          </View>
          <View style={styles.inputImageWrap}>
            <View style={styles.inputTitleWidth}>
              <Text style={styles.inputTitle}>サムネイル画像</Text>
              <ImagePickerExample />
            </View>
          </View>

          <MainButton
            label="募集する"
            onPress={handlePress}
            style={{ marginRight: "auto", marginLeft: "auto" }}
          />
        </View>
      </ScrollView>
    </KeyboardSafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputView: {
    marginVertical: 50,
  },
  inputStartTitle: {
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "rgba(0,0,0,0.65)",
  },
  inputTitleWrap: {
    height: 65,
    textAlign: "center",
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.24)",
  },
  inputTitleIntroWrap: {
    height: 110,
    textAlign: "center",
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.24)",
  },
  inputTitleWidth: {
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  inputImageWrap: {
    height: 110,
    textAlign: "center",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.24)",
  },
  inputTitle: {
    marginRight: 40,
    fontWeight: "bold",
    fontSize: 16,
    width: "33%",
    color: "rgba(0,0,0,0.65)",
  },
  inputText: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.24)",
    width: wp("40%"),
    height: 30,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  inputTextIntro: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.24)",
    width: wp("45%"),
    height: 80,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
