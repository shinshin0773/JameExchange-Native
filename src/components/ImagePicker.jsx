import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.imageWrap}>
      <View style={styles.imageButton}>
        <Button title="写真を選択" onPress={pickImage}></Button>
      </View>
      {image && (
        <Image source={{ uri: image }} style={{ width: 80, height: 80 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrap: {
    flexDirection: "row",
  },
  imageButton: {
    width: 100,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#b6c9f0",
    justifyContent: "center",
    marginRight: 15,
  },
});
