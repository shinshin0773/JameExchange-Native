import React, { useEffect, useState } from "react";
import { shape, string } from "prop-types";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import firebase from "firebase";

import CircleButton from "../components/CircleButton";
import { dateToString } from "../utils";

export default function PostDetailScreen(props) {
  const { route } = props;
  const { id } = route.params;
  console.log(id);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      unsubscribe = ref.onSnapshot((doc) => {
        console.log(doc.id, doc.data());
        const data = doc.data();
        setPost({
          id: doc.id,
          postNickName: doc.postNickName,
          postTitle: data.Title,
          postNickName: data.nickName,
          postIntro: data.Intro,
          updatedAt: data.updatedAt.toDate(), //.toDate()でデータ型に変更
        });
      });
    }
    return unsubscribe;
  }, []);
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

      <ScrollView style={styles.postBodyWrap}>
        {/* ユーザーのプロフィール情報 */}
        <View style={styles.postBody}>
          <View style={styles.postBodyImage}></View>
          <View style={styles.postItemListWrap}>
            <View style={styles.postItemList}>
              <View style={styles.postItemTitle}>
                <Text style={styles.postItemTitleText}>Name</Text>
              </View>
              <View style={styles.postItemParper}>
                <Text style={styles.postItemParperText}>みさき</Text>
              </View>
            </View>
            <View style={styles.postItemList}>
              <View style={styles.postItemTitle}>
                <Text style={styles.postItemTitleText}>Twitterアカウント</Text>
              </View>
              <View style={styles.postItemParper}>
                <Text style={styles.postItemParperText}>Akasa_j</Text>
              </View>
            </View>
            <View style={styles.postItemList}>
              <View style={styles.postItemTitle}>
                <Text style={styles.postItemTitleText}>自己紹介</Text>
              </View>
              <View style={styles.postItemParper}>
                <Text style={styles.postItemParperText}>
                  なにわ男子が大好きです！なにわ男子が大好きです！なにわ男子が大好きです！なにわ男子が大好きです！
                </Text>
              </View>
            </View>
            <View style={styles.postItemList}>
              <View style={styles.postItemTitle}>
                <Text style={styles.postItemTitleText}>
                  入っているファンクラブ
                </Text>
              </View>
              <View style={styles.postItemParper}>
                <Text style={styles.postItemParperText}>
                  ジャニーズジュニア情報局
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
  postBody: {
    width: 300,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",
    borderRadius: 20,
    marginRight: "auto",
    marginLeft: "auto",
    marginVertical: 40,
  },
  postBodyImage: {
    backgroundColor: "gray",
    width: 250,
    height: 250,
  },
  postItemListWrap: {
    marginTop: 20,
    width: 250,
  },
  postItemList: {
    marginBottom: 15,
  },
  postItemTitle: {
    backgroundColor: "black",
    alignItems: "center",
    borderRadius: 5,
    width: 160,
  },
  postItemTitleText: {
    color: "white",
    fontWeight: "bold",
    paddingVertical: 5,
  },
  postItemParper: {
    justifyContent: "center",
    marginTop: 5,
    width: 250,
  },
  postItemParperText: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
