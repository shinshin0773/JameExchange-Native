import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function PostItem(props) {
  const { onPress } = props;
  return (
    <View style={styles.postItem}>
      <TouchableOpacity
        style={styles.postImage}
        onPress={onPress}
      ></TouchableOpacity>

      {/* 投稿の情報 */}
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
            <Text style={styles.postItemTitleText}>Title</Text>
          </View>
          <View style={styles.postItemParper}>
            <Text style={styles.postItemParperText}>なにわ横アリ募集</Text>
          </View>
        </View>
        <View style={styles.postItemList}>
          <View style={styles.postItemTitle}>
            <Text style={styles.postItemTitleText}>内容</Text>
          </View>
          <View style={styles.postItemParper}>
            <Text style={styles.postItemParperText}>
              なにわ男子Alina tour、札幌アリーナでの
              9/11、9/12のチケット、どの時間帯でも良いので、お譲りいただける方は
              よろしくお願いいたします。
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postImage: {
    backgroundColor: "gray",
    width: 300,
    height: 300,
  },
  postItem: {
    marginTop: 40,
    marginHorizontal: 30,
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
});
