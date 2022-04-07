import React from "react";
import { StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native"; //Screenじゃないところからもnavigationを使えるようにする

export default function ProfileNavigator() {
  const navigation = useNavigation(); //Reacthuckはコンポーネントの直下に置かないとエラーになる
  function handlePress() {
    navigation.navigate("MyProfileScreen");
  }

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={styles.label}>プロフィール</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    // paddingLeft: 30,
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "rgba(255,255,255, 0.7)",
  },
});
