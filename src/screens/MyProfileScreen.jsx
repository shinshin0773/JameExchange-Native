import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
//レスポンシブデザインに対応するライブラリ↓
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import PostItem from "../components/PostItem";

export default function MyProfileScreen() {
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.nameWrap}>
            <TouchableOpacity>
              <View style={styles.nameIcon}></View>
            </TouchableOpacity>
            <View>
              <Text style={styles.nameText}>たんたん</Text>
            </View>
          </View>
          <View style={styles.myDiscription}>
            <TextInput
              value="自己紹介が入力されていません"
              style={styles.myDiscriptionInput}
              multiline
            />
          </View>

          <View style={styles.myInfoWrap}>
            <View style={styles.myInfoTitleWrap}>
              <View style={styles.myInfoNameWrap}>
                <Text style={styles.myInfoTitle}>名前</Text>
              </View>
              <Text style={styles.myInfoText}>あかさ</Text>
            </View>
            <View style={styles.myInfoTitleWrap}>
              <View style={styles.myInfoNameWrap}>
                <Text style={styles.myInfoTitle}>TwitterID</Text>
              </View>
              <Text style={styles.myInfoText}>@Akasa_j</Text>
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
              <PostItem />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.07)",
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
    paddingVertical: 30,
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
});
