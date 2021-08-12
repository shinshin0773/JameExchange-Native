import React, { useState,useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
  Button,
  Image,
  Platform
} from "react-native";
import { shape, string } from "prop-types";
import firebase from "firebase";

import MainButton from "../components/mainButton";
import SelectPicker from "../components/SelectPicker";
import ImagePickerCircle from "../components/ImagePickerCircle";

import * as ImagePicker from "expo-image-picker";

export default function ProfileEditScreen(props) {
  const { navigation, route } = props;
  const { id, name, intro, twitterId } = route.params; //MyprofileComponetsからidなどを取得している
  const [Name, setName] = useState(name);
  const [Twitter, setTwitter] = useState(twitterId);
  const [Intro, setIntro] = useState(intro);
  const Bacimage = require("../../assets/kinki.jpg");

  const [image, setImage] = useState(null);
  const [imageUploadTime, setImageUploadTime] = useState(null);

  //imagePicker関連の処理
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      fetchUrl(currentUser.uid)
    }
  }, [imageUploadTime]);

  async function fetchUrl(uid) {
    const url = await firebase.storage().ref().child(`users/${uid}/profileImage`).getDownloadURL();
    setImage(url);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      uploadImage(result.uri, 'test-app-image')
        .then(() => {
          Alert.alert('Done!');
          setImageUploadTime(String(new Date()));
        })
        .catch((error) => {
          Alert.alert(error);
        })
    }
  };

  async function uploadImage(uri,imageName) {
    const {currentUser} = firebase.auth();
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(`users/${currentUser.uid}/profileImage`);
    return ref.put(blob);
  }

  //データをfirestoreに保存する
  function handlePress() {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db
        .collection(`home/users/profiles/userIds/${currentUser.uid}`)
        .doc(id);
      ref
        .set(
          {
            //.setを使うことで上書きすることができる
            Name: Name,
            TwitterId: Twitter,
            Intro: Intro,
            ImageUrl: image,
            updatedAt: new Date(),
          },
          { merge: true }
        ) //merge: true はreatedAtを残したい時
        .then(() => {
          navigation.goBack(); //前の画面に戻る
        })
        .catch((error) => {
          Alert.alert(error.code);
        });
    }
  }

  return (
    <ScrollView>
      <ImageBackground
        source={Bacimage}
        resizeMode="cover"
        style={styles.iconWrap}
      >
        {/* <View style={styles.icon}></View> */}
        <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 150, }} />
      </ImageBackground>

      <View style={styles.editWrap}>
        <View style={styles.editListWrap}>
          <Text style={styles.editListText}>Name</Text>
          <TextInput
            style={styles.editInput}
            value={Name}
            onChangeText={(text) => {
              setName(text); //onChangeTextはイベントが起こった時に発火する関数Email文字を受け取る
            }}
            autoCapitalize="none" //最初の文字が大文字じゃなくなる
            // placeholder="ニックネーム" //何も入力していない時の文字
          />
        </View>
        <View style={styles.editListWrap}>
          <Text style={styles.editListText}>TwitterアカウントID</Text>
          <TextInput
            style={styles.editInput}
            value={Twitter}
            onChangeText={(text) => {
              setTwitter(text); //onChangeTextはイベントが起こった時に発火する関数Email文字を受け取る
            }}
            autoCapitalize="none" //最初の文字が大文字じゃなくなる
            // placeholder="NaniwaChan728" //何も入力していない時の文字
          />
        </View>
        <View style={styles.editListWrap}>
          <Text style={styles.editListText}>自己紹介</Text>
          <TextInput
            style={styles.editInput}
            value={Intro}
            onChangeText={(text) => {
              setIntro(text); //onChangeTextはイベントが起こった時に発火する関数Email文字を受け取る
            }}
            autoCapitalize="none" //最初の文字が大文字じゃなくなる
            // placeholder="なにわ男子が大好きです" //何も入力していない時の文字
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

            {/* imagePicker関連のコンポーネント */}
           <View style={styles.imageWrap}>
            <View style={styles.imageButton}>
              <Button title="写真を選択" onPress={pickImage}></Button>
            </View>
            {image && (
              <Image source={{ uri: image }} style={{ width: 80, height: 80 }} />
            )}
           </View>

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
      <ImagePickerCircle name="plus"/>
    </ScrollView>
  );
}

ProfileEditScreen.propTypes = {
  route: shape({
    params: shape({
      id: string,
      name: string,
      intro: string,
      twitterId: string,
    }),
  }).isRequired,
};

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
  imageWrap: {
    flexDirection: "row",
  },
  imageButton: {
    width: 100,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#b6c9f0",
    justifyContent: "center",
    marginRight: 15,
  },
});
