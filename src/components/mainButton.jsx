import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
//レスポンシブデザインに対応するライブラリ↓
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function MainButton(props) {
  const { onPress, label, style } = props;
  return (
    <TouchableOpacity style={[styles.postButton, style]} onPress={onPress}>
      <Text style={styles.postButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  postButton: {
    width: 120,
    height: 50,
    backgroundColor: "#E93B81",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 60,
    marginHorizontal: wp("25%"),
  },
  postButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
