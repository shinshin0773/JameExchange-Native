import React from "react";
import { View, StyleSheet, TextInput, Text, ScrollView } from "react-native";
import { string } from "prop-types";

export default function Button(props) {
  const { label } = props;
  return (
    <View style={styles.buttonConteiner}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </View>
  );
}

Button.propTypes = {
  label: string.isRequired,
};

const styles = StyleSheet.create({
  buttonConteiner: {
    backgroundColor: "#467FD3",
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 24,
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 32,
    paddingVertical: 8,
    paddingHorizontal: 32,
    color: "white",
  },
});
