import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
//レスポンシブデザインに対応するライブラリ↓
import firebase from "firebase";
import { useNavigation } from "@react-navigation/core";

import PostItem from "../components/PostItem";
import { shape, string, instanceOf, arrayOf } from "prop-types";

export default function MyProfileComponents(props) {
  const { profile, myPosts } = props;
  const [posts, setPosts] = useState([]); //ここを変更する
  const navigation = useNavigation();

  function renderItem({ item }) {
    return (
      <View>
        <View style={styles.nameWrap}>
          <TouchableOpacity>
            <Image source={{ uri: item.profileImageUrl }} style={{ width: 60, height: 60, borderRadius: 30, }} />
          </TouchableOpacity>
          <View style={styles.nameInner}>
            <Text style={styles.nameText}>{item.profileName}</Text>
          </View>
          <TouchableOpacity
            style={styles.profileEditBtn}
            onPress={() => {
              navigation.navigate("ProfileEdit", {
                id: item.id,
                name: item.profileName,
                intro: item.profileIntro,
                twitterId: item.profileTwitter,
                imageUrl: item.profileImageUrl,
              });
            }}
          >
            <Text style={styles.profileEditText}>プロフィール編集</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.myDiscription}>
          <View style={styles.myDiscriptionInput}>
            <Text>{item.profileIntro}</Text>
          </View>
        </View>

        <View style={styles.myInfoWrap}>
          <View style={styles.myInfoTitleWrap}>
            <View style={styles.myInfoNameWrap}>
              <Text style={styles.myInfoTitle}>名前</Text>
            </View>
            <Text style={styles.myInfoText}>{item.profileName}</Text>
          </View>
          <View style={styles.myInfoTitleWrap}>
            <View style={styles.myInfoNameWrap}>
              <Text style={styles.myInfoTitle}>TwitterID</Text>
            </View>
            <Text style={styles.myInfoText}>{item.profileTwitter}</Text>
          </View>
          <View style={styles.myInfoTitleWrap}>
            <View style={styles.myInfoNameWrap}>
              <Text style={styles.myInfoTitle}>入っているファンクラブ</Text>
            </View>
            <Text style={styles.myInfoText}>ジャニーズジュニア情報局</Text>
          </View>
        </View>

        <View style={styles.postListWrap}>
          <Text style={styles.postlistTitle}>投稿一覧</Text>
          <View>
            <PostItem myPosts={myPosts} postsIf={true} />
          </View>
        </View>
      </View>
    );
  }

  //投稿の情報を表示させる
  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {}; //再代入可能なようにする
    if (currentUser) {
      const ref = db
        .collection(`home/users/posts`)
        .orderBy("updatedAt", "desc"); //orderBy('updatedAt','desc') //日付の値が大きいものから返ってくる降順
      //投稿のリストを取得して一つ一つのログを出力する
      unsubscribe = ref.onSnapshot(
        (snapshot) => {
          const userPosts = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            userPosts.push({
              id: doc.id,
              uid: currentUser.uid,
              postTitle: data.Title,
              postNickName: data.nickName,
              postIntro: data.Intro,
              updatedAt: data.updatedAt.toDate(), //.toDate()でデータ型に変更
            });
          });
          setPosts(userPosts);
        },
        (error) => {
          // console.log(error);
          Alert.alert("データの読み込みに失敗しました");
        }
      );
    }
    return unsubscribe; //ページを離れる直前に処理を停止する
  }, []); //画面が表示された瞬間に監視をする

  return (
    <View style={styles.container}>
      <FlatList
        data={profile}
        renderItem={renderItem}
        keyExtractor={(item) => {
          return item.id;
        }}
      />
    </View>
  );
}

MyProfileComponents.propTypes = {
  profile: arrayOf(
    shape({
      id: string,
      uid: string,
      postTitle: string,
      postNickName: string,
      postIntro: string,
      updatedAt: instanceOf(Date),
    })
  ).isRequired,

  profile: arrayOf(
    shape({
      nickName: string,
      Title: string,
      Intro: string,
      uid: string,
      updatedAt: instanceOf(Date),
    })
  ).isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    marginRight: "auto",
    marginLeft: "auto",
  },
  nameWrap: {
    backgroundColor: "white",
    flexDirection: "row",
    paddingTop: 10,
  },
  nameIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "gray",
  },
  nameInner: {
    flex: 1, //可能な限りスペースを確保する
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 15,
    paddingLeft: 10,
  },
  myDiscription: {
    backgroundColor: "white",
    paddingVertical: 20,
  },
  myDiscriptionInput: {
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    height: 180,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  myInfoWrap: {
    backgroundColor: "white",
    paddingVertical: 15,
  },
  myInfoTitleWrap: {
    flexDirection: "row",
    marginVertical: 5,
  },
  myInfoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "rgba(0,0,0,0.65)",
    marginRight: 20,
  },
  myInfoNameWrap: {
    width: "41%",
  },
  myInfoText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  postListWrap: {
    backgroundColor: "white",
    paddingTop: 10,
    borderTopWidth: 10,
    borderColor: "rgba(0,0,0,0.15)",
  },
  postlistTitle: {
    color: "rgba(0,0,0,0.65)",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileEditBtn: {
    backgroundColor: "#E93B81",
    width: 120,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 95,
    marginTop: 10,
    borderRadius: 15,
  },
  profileEditText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
