import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import firebase from "firebase";

import Button from "../components/Button";

export default function SignUpScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState(""); //email=保持しておきたいデータ・setEmail=値を更新する関数・useState("")=初期値
  const [password, setPassword] = useState("");

  function handlePress() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password) //Eメールとパスワードを入れる
      .then((useCredential) => {
        //.then新規登録が成功したら
        const { user } = useCredential; //userの情報を取り出す
        console.log(user.uid);
        navigation.reset({
          index: 0,
          routes: [{ name: "TopScreen" }],
        });
      })
      .catch((error) => {
        console.log(error.code, error.message);
        Alert.alert(error.code);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>新規登録</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text); //onChangeTextはイベントが起こった時に発火する関数Email文字を受け取る
          }}
          autoCapitalize="none" //最初の文字が大文字じゃなくなる
          keyboardType="email-address" //メールアドレス入力に適したキーボードに変える
          placeholder="メールアドレス" //何も入力していない時の文字
          textContentType="emailAddress" //端末からメールアドレス登録しているメールアドレスを取得できる
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text); //onChangeTextはイベントが起こった時に発火する関数Email文字を受け取る
          }}
          placeholder="パスワード" //何も入力していない時の文字
          secureTextEntry //入力した文字を見せないようにする
          textContentType="password" //端末からメールアドレス登録しているメールアドレスを取得できる
        />
        <Button label="SignUp" onPress={handlePress} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>登録したことある?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "LogIn" }],
              });
            }}
          >
            <Text style={styles.footerLink}>ログイン</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  inner: {
    paddingHorizontal: 27,
    paddingVertical: 27,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    height: 48,
    backgroundColor: "white",
    borderColor: "#dddddd",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: "#467FD3",
  },
  footer: {
    flexDirection: "row",
  },
});
