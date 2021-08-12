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

export default function UserProfile(props) {
  const { profile } = props;
  function renderItem({ item }) {
    return (
      <ScrollView style={styles.postBodyWrap}>
        {/* ユーザーのプロフィール情報 */}
        <View style={styles.postBody}>
          <View style={styles.postBodyImage}>
            <Image source={{ uri: item.ImageUrl }} style={{ width: 250, height: 250 }} />
          </View>

          <View style={styles.postItemListWrap}>
            <View style={styles.postItemList}>
              <View style={styles.postItemTitle}>
                <Text style={styles.postItemTitleText}>Name</Text>
              </View>
              <View style={styles.postItemParper}>
                <Text style={styles.postItemParperText}>{item.Name}</Text>
              </View>
            </View>
            <View style={styles.postItemList}>
              <View style={styles.postItemTitle}>
                <Text style={styles.postItemTitleText}>Twitterアカウント</Text>
              </View>
              <View style={styles.postItemParper}>
                <Text style={styles.postItemParperText}>{item.TwitterId}</Text>
              </View>
            </View>
            <View style={styles.postItemList}>
              <View style={styles.postItemTitle}>
                <Text style={styles.postItemTitleText}>自己紹介</Text>
              </View>
              <View style={styles.postItemParper}>
                <Text style={styles.postItemParperText}>{item.Intro}</Text>
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
    );
  }
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

const styles = StyleSheet.create({
  postBody: {
    width: 300,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",
    borderRadius: 20,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 40,
    marginBottom: 100,
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
