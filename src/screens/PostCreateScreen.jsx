import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Button,
  Image,
} from "react-native";
//レスポンシブデザインに対応するライブラリ↓
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";

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

  const [image, setImage] = useState(null);
  const [imageUploadTime, setImageUploadTime] = useState(null);

  function handlePress() {
    const { currentUser } = firebase.auth(); //現在ログインしているユーザをcurrentuserとして抜き出せる
    const db = firebase.firestore();
    const ref = db.collection(`home/users/posts`); //currentuser.uidでユーザIDをとってこれる
    ref
      .add({
        uid: currentUser.uid,
        nickName: name,
        Title: title,
        Intro: intro,
        group: group,
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

  //pickImag
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


  //////////////////////////////////////////////////////////////////////

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
              {/* <SelectPicker style={{ left: 1, top: 8 }} /> */}
              <View>
                <RNPickerSelect
                  onValueChange={(value) => setgroup(value)}
                  items={[
                    { label: "木村拓哉", value: "木村拓哉" },
                    { label: "TOKIO", value: "TOKIO" },
                    { label: "KinKiKids", value: "KinKiKids" },
                    { label: "V6", value: "V6" },
                    { label: "嵐", value: "嵐" },
                    { label: "KAT-TUN", value: "KAT-TUN" },
                    { label: "NEWS", value: "NEWS" },
                    { label: "関ジャニ∞", value: "関ジャニ∞" },
                    { label: "Hey!Say!JUMP", value: "Hey!Say!JUMP" },
                    { label: "Kis-My-Ft2", value: "Kis-My-Ft2" },
                    { label: "SexyZone", value: "SexyZone" },
                    { label: "A.B.C-Z", value: "A.B.C-Z" },
                    { label: "ジャニーズWEST", value: "ジャニーズWEST" },
                    { label: "King & Prince", value: "King & Prince" },
                    { label: "SixTONES", value: "SixTONES" },
                    { label: "SnowMan", value: "SnowMan" },
                    {
                      label: "ジャニーズジュニア情報局",
                      value: "ジャニーズジュニア情報局",
                    },
                  ]}
                  style={pickerSelectStyles}
                  placeholder={{ label: "選択してください", value: "" }}
                  Icon={() => (
                    <Text
                    // style={[
                    //   {
                    //     position: "absolute",
                    //     right: 1,
                    //     top: 10,
                    //     fontSize: 18,
                    //     color: "#789",
                    //     width: 140,
                    //   },
                    //   style,
                    // ]}
                    >
                      ▼
                    </Text>
                  )}
                />
              </View>
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
              {/* <ImagePickerExample /> */}

              <View style={styles.imageWrap}>
                <View style={styles.imageButton}>
                  <Button title="写真を選択" onPress={pickImage}></Button>
                </View>
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 80, height: 80 }}
                  />
                )}
              </View>
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",
    borderRadius: 4,
    color: "#789",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: "120%",
    height: 40,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#789",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 270,
    marginLeft: 30,
    backgroundColor: "#eee",
  },
});
