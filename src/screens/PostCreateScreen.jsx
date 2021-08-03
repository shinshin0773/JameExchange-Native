import React from "react";
import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
//レスポンシブデザインに対応するライブラリ↓
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import AppBar from "../components/AppBar";
// import CircleButton from '../components/CircleButton';
import ImagePickerExample from "../components/ImagePicker";
import MainButton from "../components/mainButton";
import SelectPicker from "../components/SelectPicker";
import KeyboardSafeView from "../components/KeyboradSafeView";

export default function PostCreateScreen() {
  return (
    <KeyboardSafeView style={styles.container} behavior="height">
      <AppBar />
      <ScrollView style={styles.inputWrap}>
        <View style={styles.inputView}>
          <Text style={styles.inputStartTitle}>募集</Text>
          <View style={styles.inputTitleWrap}>
            <Text style={styles.inputTitle}>ニックネーム</Text>
            <TextInput style={styles.inputText} value="あかさ" />
          </View>
          <View style={styles.inputTitleWrap}>
            <Text style={styles.inputTitle}>タイトル</Text>
            <TextInput style={styles.inputText} value="横アリ募集" />
          </View>
          <View style={styles.inputTitleWrap}>
            <Text style={styles.inputTitle}>グループ名</Text>
            <SelectPicker />
          </View>
          <View style={styles.inputTitleWrap}>
            <Text style={styles.inputTitle}>説明</Text>
            <TextInput style={styles.inputText} multiline />
          </View>
          <View style={styles.inputTitleWrap}>
            <Text style={styles.inputTitle}>サムネイル画像</Text>
            <ImagePickerExample />
          </View>

          <MainButton />
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
