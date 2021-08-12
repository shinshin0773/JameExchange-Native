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
import Loading from "../components/Loading";

export default function MyProfileScreen(props) {
  const [profile, setProfiles] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {}; //再代入可能なようにする
    if (currentUser) {
      const ref = db
        .collection(`home/users/profiles/userIds/${currentUser.uid}`)
        .orderBy("updatedAt", "desc"); //orderBy('updatedAt','desc') //日付の値が大きいものから返ってくる降順
      //onSnapshot-自動的に監視する
      unsubscribe = ref.onSnapshot(
        (snapshot) => {
          const userProfiles = [];
          snapshot.forEach((doc) => {
            // console.log(`${doc.id}これです`);
            // console.log(doc.id, doc.data());
            const data = doc.data();
            userProfiles.push({
              id: doc.id,
              profileName: data.Name,
              profileTwitter: data.TwitterId,
              profileIntro: data.Intro,
              profileImageUrl: data.ImageUrl,
              updatedAt: data.updatedAt.toDate(), //.toDate()でデータ型に変更
            });
          });
          setProfiles(userProfiles);
          setLoading(false);
        },
        (error) => {
          console.log(error);
          Alert.alert("データの読み込みに失敗しました");
          setLoading(false);
        }
      );
    }
    return unsubscribe; //ページを離れる直前に処理を停止する
  }, []); //画面が表示された瞬間に監視をする

  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    if (currentUser) {
      const ref = db
        .collection(`home/users/posts`)
        .orderBy("updatedAt", "desc");
      unsubscribe = ref.onSnapshot(
        (snapshot) => {
          const userPosts = [];
          snapshot.forEach((doc) => {
            // console.log(doc.id, doc.data());
            const data = doc.data(); //dataのなかnameなどが入っている
            //ユーザーと投稿のUIDが一致した時に
            if (currentUser.uid === data.uid) {
              userPosts.push({
                id: doc.id,
                uid: currentUser.uid,
                postNickName: doc.postNickName,
                postTitle: data.Title,
                postNickName: data.nickName,
                postIntro: data.Intro,
                updatedAt: data.updatedAt.toDate(), //.toDate()でデータ型に変更
              });
            }
          });
          setMyPosts(userPosts);
        },
        (error) => {
          console.log(error.code);
          Alert.alert("データの読み込みに失敗しました");
        }
      );
    }
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.backgroundColor}>
        <View>
          <Loading isLoading={isLoading} />
          <MyProfileComponents profile={profile} myPosts={myPosts} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: "white",
  },
  container: {
    flex: 1,
  },
});
