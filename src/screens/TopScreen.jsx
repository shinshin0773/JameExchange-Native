import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView, Text, Alert } from "react-native";
import firebase from "firebase";

import CircleButton from "../components/CircleButton";
import PostItem from "../components/PostItem";
import LogOutButton from "../components/LogOutButton";

export default function TopScreen(props) {
  //navigationは自動的にApp.jsxから来ている
  const { navigation } = props;
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
      const ref = db
        .collection(`users/${currentUser.uid}/memos`)
        .orderBy("updatedAt", "desc"); //orderBy('updatedAt','desc') //日付の値が大きいものから返ってくる降順
      //投稿のリストを取得して一つ一つのログを出力する
      unsubscribe = ref.onSnapshot(
        (snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.id, doc.data());
          });
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
    <View style={styles.container}>
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
            <PostItem
              onPress={() => {
                navigation.navigate("PostDetail");
              }}
            />
            <PostItem
              onPress={() => {
                navigation.navigate("PostDetail");
              }}
            />
            <PostItem
              onPress={() => {
                navigation.navigate("PostDetail");
              }}
            />
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
