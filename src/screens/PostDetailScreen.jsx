import React, { useEffect, useState } from "react";
import { shape, string } from "prop-types";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import firebase from "firebase";

import CircleButton from "../components/CircleButton";
import { dateToString } from "../utils";
import UserProfile from "../components/UserProfile";
import Loading from "../components/Loading";

export default function PostDetailScreen(props) {
  const { route } = props;
  const { id, uid } = route.params;
  // const { profile } = route.params;
  const [post, setPost] = useState(null);
  const [profile, setProfile] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`home/users/posts`).doc(id); //idはドキュメントに対してのid
      unsubscribe = ref.onSnapshot((doc) => {
        console.log(doc.id, doc.data());
        const data = doc.data();
        setPost({
          id: doc.id,
          uid: data.uid,
          postNickName: data.postNickName,
          postTitle: data.Title,
          postNickName: data.nickName,
          postIntro: data.Intro,
          updatedAt: data.updatedAt.toDate(), //.toDate()でデータ型に変更
        });
      });
    }
    return unsubscribe;
  }, []);

  const postUid = post && post.uid;
  //ユーザーのプロフィール情報取得
  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {}; //再代入可能なようにする
    if (currentUser) {
      const ref = db
        .collection(`home/users/profiles/userIds/${postUid}`)
        .orderBy("updatedAt", "desc"); //orderBy('updatedAt','desc') //日付の値が大きいものから返ってくる降順
      //onSnapshot-自動的に監視する
      unsubscribe = ref.onSnapshot(
        (snapshot) => {
          const userProfiles = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            userProfiles.push({
              id: doc.id,
              Name: data.Name,
              TwitterId: data.TwitterId,
              Intro: data.Intro,
              ImageUrl: data.ImageUrl,
              updatedAt: data.updatedAt.toDate(), //.toDate()でデータ型に変更
            });
          });
          setProfile(userProfiles);
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
  }); //画面が表示された瞬間に監視をする

  return (
    <View style={styles.container}>
      <View style={styles.postHeader}>
        <Text style={styles.postTitle} numberOfLinees={1}>
          {post && post.postTitle}
        </Text>
        <Text style={styles.postDate}>
          {post && dateToString(post.updatedAt)}
        </Text>
      </View>

      <Loading isLoading={isLoading} />

      <UserProfile profile={profile} />

      <CircleButton
        name="star"
        style={{ top: 60, bottom: "auto" }}
      ></CircleButton>
    </View>
  );
}

PostDetailScreen.propTypes = {
  route: shape({
    params: shape({ id: string }),
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  postHeader: {
    backgroundColor: "#467FD3",
    height: 96,
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  postTitle: {
    color: "#ffffff",
    fontSize: 20,
    lineHeight: 32,
    fontWeight: "bold",
  },
  postDate: {
    color: "#ffffff",
    fontSize: 12,
    lineHeight: 16,
  },
});
