import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firebaseConfig } from './env';
import firebase from 'firebase';

require('firebase/firestore');

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App(props) {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUploadTime, setImageUploadTime] = useState(null);
  useEffect(() => {
    console.log('fired');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        fetchUrl(user.uid)
      } else {
        firebase.auth().signInAnonymously()
          .catch(() => {
            Alert.alert('Log-in error');
          })
      }
    })
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
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
    setImageUrl(url);
  }

  async function pickImage() {
    const result = await ImagePicker.launchCameraAsync();
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
  }

  async function uploadImage(uri, imageName) {
    const { currentUser } = firebase.auth();
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(`users/${currentUser.uid}/images/${imageName}`);
    return ref.put(blob);
  }

  return (
    <View style={styles.container}>
      <Text>Pick image and upload to firebase storage</Text>
      <Button title="Take a photo" onPress={pickImage} />
      {imageUrl &&
        <View>
          <Image  source={{ uri: imageUrl }} style={{ width: 200, height: 200, margin: 20 }} />
          <Text>Image URL</Text>
          <Text>{imageUrl}</Text>
        </View>
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
