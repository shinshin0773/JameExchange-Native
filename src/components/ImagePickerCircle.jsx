import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { Feather } from "@expo/vector-icons";

export default function ImagePickerCircle(props) {
  const [image, setImage] = useState(null);
  const { name, style } = props;

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
        <TouchableOpacity
          title=""
          onPress={pickImage}
          style={[styles.ImageCircleButton, style]}
        >
          <Feather name={name} size={45} color="white" />
        </TouchableOpacity>
      </View>
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 80, height: 80 }}
          style={styles.ImagePosition}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrap: {
    flexDirection: "row",
  },
  imageButton: {
    position: "absolute",
    bottom: 555,
    right: 105,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "red",
    justifyContent: "center",
    marginRight: 15,
    zIndex: 100,
  },
  ImageCircleButton: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  ImagePosition: {
    width: 140,
    height: 140,
    borderRadius: 70,
    position: "absolute",
    bottom: 575,
    right: 116,
  },
});
