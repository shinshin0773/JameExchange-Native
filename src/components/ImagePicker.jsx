import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, StyleSheet,Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [imageUploadTime, setImageUploadTime] = useState(null);

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

  useEffect(() => {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      fetchUrl(currentUser.uid)
    }
  }, [imageUploadTime]);

  async function fetchUrl(uid) {
    const url = await firebase.storage().ref().child(`users/${uid}/images/test-app-image`).getDownloadURL();
    setImage(url);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      uploadImage(result.uri, 'test-app-image')
        .then(() => {
          Alert.alert('Done!');
          setImageUploadTime(String(new Date()));
        })
        .catch((error) => {
          Alert.alert(error);
        })
    }
  };

  async function uploadImage(uri,imageName) {
    const {currentUser} = firebase.auth();
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(`users/${currentUser.uid}/images/${imageName}`);
    return ref.put(blob);
  }

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
