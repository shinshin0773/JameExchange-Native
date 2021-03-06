import React, { useState, useEffect } from "react";
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

export default function PostItem(props) {
  const { onPress, posts, myPosts, postsIf, style, userUid } = props;
  const navigation = useNavigation();

  //効率的にリスト化するための関数
  function renderItem({ item }) {
    function dletePost() {
      // console.log(currentUser.uid, uid);
      const db = firebase.firestore();
      const ref = db.collection(`home/users/posts`).doc(item.id);

      return Alert.alert("投稿を削除します", "よろしいですか？", [
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

    return (
      <View>
        <TouchableOpacity
          style={styles.postImage}
          onPress={() => {
            navigation.navigate("PostDetail", { id: item.id });
          }}
        ></TouchableOpacity>

        {/* 投稿の情報 */}
        <View style={styles.postItemListWrap}>
          <View style={styles.postItemList}>
            <View style={styles.postItemTitle}>
              <Text style={styles.postItemTitleText}>Name</Text>
            </View>
            <View style={styles.postItemParper}>
              {/* numberOfLinesで行を一行に指定できる */}
              <Text style={styles.postItemParperText} numberOfLines={1}>
                {/* ここでデータを表示している */}
                {item.postNickName}
              </Text>
            </View>
          </View>
          <View style={styles.postItemList}>
            <View style={styles.postItemTitle}>
              <Text style={styles.postItemTitleText}>Title</Text>
            </View>
            <View style={styles.postItemParper}>
              <Text style={styles.postItemParperText}>
                {/* ここでデータを表示している */}
                {item.postTitle}
              </Text>
            </View>
          </View>
          <View style={styles.postItemList}>
            <View style={styles.postItemTitle}>
              <Text style={styles.postItemTitleText}>内容</Text>
            </View>
            <View style={styles.postItemParper}>
              <Text style={styles.postItemParperText}>
                {/* ここでデータを表示している */}
                {item.postIntro}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              dletePost();
            }}
            style={[styles.deleteBtn, style]}
          >
            <Text style={styles.deleteText}>{`${postsIf ? "削除" : ""}`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.postItem}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keExtractor={(item) => {
          return item.id;
        }}
      />
      <FlatList
        data={myPosts}
        renderItem={renderItem}
        keExtractor={(item) => {
          return item.id;
        }}
      />
    </View>
  );
}

PostItem.protoTypes = {
  memos: arrayOf(
    shape({
      id: string,
      uid: string,
      postNickName: string,
      postTitle: string,
      postIntro: string,
      updatedAt: instanceOf(Date),
    }).isRequired
  ),
};

const styles = StyleSheet.create({
  postImage: {
    backgroundColor: "gray",
    width: 300,
    height: 300,
  },
  postItem: {
    marginTop: 40,
    marginHorizontal: 30,
    // // width: "120%",
    // paddingBottom: 600,
  },
  postItemListWrap: {
    marginTop: 20,
  },
  postItemList: {
    flexDirection: "row",
    marginBottom: 15,
  },
  postItemTitle: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    width: 70,
    height: 30,
  },
  postItemTitleText: {
    color: "white",
    fontWeight: "bold",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  postItemParper: {
    justifyContent: "center",
    marginHorizontal: 15,
    width: 210,
  },
  postItemParperText: {
    fontSize: 17,
    fontWeight: "bold",
  },
  deleteBtn: {
    width: 60,
    height: 30,
    borderRadius: 8,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  deleteText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
