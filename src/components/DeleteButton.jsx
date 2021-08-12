import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { shape, string, instanceOf, arrayOf } from "prop-types";
import firebase from "firebase";

export default function DeleteButton(props) {
  const { item, uid } = props;
  const { currentUser } = firebase.auth();
  function dletePost(id, uid) {
    // (currentUser.uid, uid);
    const db = firebase.firestore();
    const ref = db.collection(`home/users/posts`).doc(id);
    Alert.alert("投稿を削除します", "よろしいですか？", [
      {
        text: "キャンセル",
        onPress: () => {},
      },
      {
        text: "削除する",
        style: "destructive", //文字が赤くなる
        onPress: () => {
          //投稿を削除する
          ref.delete().catch(() => {
            Alert.alert("削除に失敗しました");
          });
        },
      },
    ]);
  }

  //投稿が0件の時の画面の構造次のreturnは実行されない
  if (currentUser.uid === uid) {
    return (
      <TouchableOpacity
        onPress={() => {
          dletePost(item.id, uid);
        }}
        style={styles.container}
      >
        <Text>削除</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "none",
  },
});
