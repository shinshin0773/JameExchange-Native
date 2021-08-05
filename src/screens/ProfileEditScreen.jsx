import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import firebase from "firebase";

import MainButton from "../components/mainButton";
import CircleButton from "../components/CircleButton";
import SelectPicker from "../components/SelectPicker";
import ImagePickerExample from "../components/ImagePicker";
import ImagePickerCircle from "../components/ImagePickerCircle";

export default function ProfileEditScreen(props) {
  const { navigation } = props;
  const [Name, setName] = useState("");
  const [Twitter, setTwitter] = useState("");
  const [Intro, setIntro] = useState("");
  const image = require("../../assets/kinki.jpg");

  //データをfirestoreに保存する
  function handlePress() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const ref = db.collection(`users/${currentUser.uid}/profiles`);
    ref
      .add({
        Name: Name,
        TwitterId: Twitter,
        Intro: Intro,
        updatedAt: new Date(),
      })
      .then((docRef) => {
        console.log("Edit!", docRef.id);
      })
      .catch((error) => {
        console.log("Error!", error);
      });
    navigation.navigate("MyProfileScreen");
  }

  return (
    <ScrollView>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.iconWrap}
      >
        <View style={styles.icon}></View>
      </ImageBackground>

      <View style={styles.editWrap}>
        <View style={styles.editListWrap}>
          <Text style={styles.editListText}>Name</Text>
          <TextInput
            style={styles.editInput}
            onChangeText={(text) => {
              setName(text); //onChangeTextはイベントが起こった時に発火する関数Email文字を受け取る
            }}
            autoCapitalize="none" //最初の文字が大文字じゃなくなる
            placeholder="ニックネーム" //何も入力していない時の文字
          />
        </View>
        <View style={styles.editListWrap}>
          <Text style={styles.editListText}>TwitterアカウントID</Text>
          <TextInput
            style={styles.editInput}
            onChangeText={(text) => {
              setTwitter(text); //onChangeTextはイベントが起こった時に発火する関数Email文字を受け取る
            }}
            autoCapitalize="none" //最初の文字が大文字じゃなくなる
            placeholder="NaniwaChan728" //何も入力していない時の文字
          />
        </View>
        <View style={styles.editListWrap}>
          <Text style={styles.editListText}>自己紹介</Text>
          <TextInput
            style={styles.editInput}
            onChangeText={(text) => {
              setIntro(text); //onChangeTextはイベントが起こった時に発火する関数Email文字を受け取る
            }}
            autoCapitalize="none" //最初の文字が大文字じゃなくなる
            placeholder="なにわ男子が大好きです" //何も入力していない時の文字
          />
        </View>
        <View style={styles.editSelect}>
          <Text style={styles.editSelectText}>
            ファンクラブ会員になっているグループ
          </Text>
          <SelectPicker />
        </View>
        <View style={styles.editImageWrap}>
          <Text style={styles.editImageText}>
            プロフィール画像を選んでください
          </Text>
          <ImagePickerExample />
        </View>
      </View>

      <View>
        <MainButton
          label="プロフィールを保存"
          style={{ width: 200 }}
          onPress={handlePress}
        />
      </View>

      {/* <CircleButton
        name="plus"
        style={{ top: 130, right: 125, backgroundColor: "red" }}
      /> */}
      <ImagePickerCircle name="plus" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    height: 230,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  icon: {
    width: 150,
    height: 150,
    borderRadius: 150,
    backgroundColor: "gray",
    borderWidth: 6,
    borderColor: "white",
  },
  editWrap: {
    marginTop: 20,
  },
  editListWrap: {
    width: "90%",
    height: 60,
    justifyContent: "center",
    marginTop: 10,
    marginRight: "auto",
    marginLeft: "auto",
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",
  },
  editListText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "pink",
  },
  editInput: {
    paddingVertical: 10,
    fontSize: 18,
  },
  editSelect: {
    width: "90%",
    height: 70,
    justifyContent: "center",
    marginTop: 15,
    marginRight: "auto",
    marginLeft: "auto",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",
  },
  editSelectText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "pink",
    marginBottom: 3,
  },
  editImageWrap: {
    width: "90%",
    height: 90,
    justifyContent: "center",
    marginTop: 15,
    marginRight: "auto",
    marginLeft: "auto",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",
  },
  editImageText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "pink",
    marginBottom: 3,
  },
});
