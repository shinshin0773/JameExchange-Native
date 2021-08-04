import React from "react";
import { StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native"; //Screenじゃないところからもnavigationを使えるようにする

export default function LogOutButton() {
  const navigation = useNavigation(); //Reacthuckはコンポーネントの直下に置かないとエラーになる
  function handlePress() {
    firebase
      .auth()
      .signOut() //ログアウトする
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "LogIn" }],
        });
      })
      .catch(() => {
        Alert.alert("ログアウトに失敗しました"); //ログアウトに失敗した時の処理
      });
  }

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={styles.label}>ログアウト</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    color: "rgba(255,255,255, 0.7)",
  },
});
