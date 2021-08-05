import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
//レスポンシブデザインに対応するライブラリ↓
import firebase from "firebase";

import MyProfileComponents from "../components/MyProfileComponents";

export default function MyProfileScreen(props) {
  const [profile, setProfiles] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {}; //再代入可能なようにする
    if (currentUser) {
      const ref = db
        .collection(`users/${currentUser.uid}/profiles`)
        .orderBy("updatedAt", "desc"); //orderBy('updatedAt','desc') //日付の値が大きいものから返ってくる降順
      //投稿のリストを取得して一つ一つのログを出力する
      unsubscribe = ref.onSnapshot(
        (snapshot) => {
          const userProfiles = [];
          snapshot.forEach((doc) => {
            console.log(doc.id, doc.data());
            const data = doc.data();
            userProfiles.push({
              id: doc.id,
              profileName: data.Name,
              profileTwitter: data.TwitterId,
              profileIntro: data.Intro,
              updatedAt: data.updatedAt.toDate(), //.toDate()でデータ型に変更
            });
          });
          setProfiles(userProfiles);
        },
        (error) => {
          console.log(error);
          Alert.alert("データの読み込みに失敗しました");
        }
      );
    }
    return unsubscribe; //ページを離れる直前に処理を停止する
  }, []); //画面が表示された瞬間に監視をする

  return (
    <View>
      <ScrollView style={styles.backgroundColor}>
        <View style={styles.container}>
          <MyProfileComponents profile={profile} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: "white",
  },
});
