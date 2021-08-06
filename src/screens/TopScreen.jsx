import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Text, Alert } from "react-native";
import firebase from "firebase";

import CircleButton from "../components/CircleButton";
import PostItem from "../components/PostItem";
import LogOutButton from "../components/LogOutButton";
import MainButton from "../components/mainButton";
import Button from "../components/Button";
import Loading from "../components/Loading";

export default function TopScreen(props) {
  //navigationは自動的にApp.jsxから来ている
  const { navigation } = props;
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />, //ヘッダーの右にログアウトボタンを設定する
    });
  }, []);

  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {}; //再代入可能なようにする
    if (currentUser) {
      setLoading(true); //ローディングする
      const ref = db
        .collection(`users/${currentUser.uid}/memos`)
        .orderBy("updatedAt", "desc"); //orderBy('updatedAt','desc') //日付の値が大きいものから返ってくる降順
      //投稿のリストを取得して一つ一つのログを出力する
      unsubscribe = ref.onSnapshot(
        (snapshot) => {
          const userPosts = [];
          snapshot.forEach((doc) => {
            console.log(doc.id, doc.data());
            const data = doc.data();
            userPosts.push({
              id: doc.id,
              postTitle: data.Title,
              postNickName: data.nickName,
              postIntro: data.Intro,
              updatedAt: data.updatedAt.toDate(), //.toDate()でデータ型に変更
            });
          });
          setPosts(userPosts);
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
          Alert.alert("データの読み込みに失敗しました");
        }
      );
    }
    return unsubscribe; //ページを離れる直前に処理を停止する
  }, []); //画面が表示された瞬間に監視をする

  //投稿が0件の時の画面の構造次のreturnは実行されない
  if (posts.length === 0) {
    return (
      <View style={emptyStyles.container}>
        <Loading isLoading={isLoading} />
        <View style={emptyStyles.inner}>
          <Text style={emptyStyles.title}>最初の投稿をしてみよう！</Text>
          <Button
            style={emptyStyles.button}
            label="作成する"
            onPress={() => {
              navigation.navigate("PostCreate");
            }}
          ></Button>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MainButton
        label="プロフィール画面へ"
        onPress={() => {
          navigation.navigate("MyProfileScreen");
        }}
      />
      <ScrollView>
        <View style={styles.TopListItem}>
          <View style={styles.TopListWrap}>
            {/* グループ名のタブのView */}
            <View style={styles.groupNameWrap}>
              <View style={styles.groupCircle}></View>
              <View style={styles.groupNameTitle}>
                <Text style={styles.groupNameTitleText}>
                  ジャニーズジュニア情報局
                </Text>
              </View>
            </View>

            {/* PostItem投稿のテンプレート */}
            <PostItem posts={posts} />
          </View>
        </View>
      </ScrollView>
      <CircleButton
        name="plus"
        onPress={() => {
          navigation.navigate("PostCreate");
        }}
      ></CircleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //画面いっぱいに表示
    backgroundColor: "#F0F4F8",
  },
  TopListItem: {
    backgroundColor: "#F0F4F8",
    flexDirection: "row",
    width: "95%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",
    marginRight: "auto",
    marginLeft: "auto",
    paddingBottom: 100,
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: "#848484",
  },
  groupNameWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  groupCircle: {
    backgroundColor: "#f5abc9",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  groupNameTitle: {
    position: "absolute",
    top: 28,
    left: 43,
  },
  groupNameTitleText: {
    fontSize: 28,
    fontWeight: "bold",
  },
});

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
  },
  button: {
    alignSelf: "center",
  },
});
