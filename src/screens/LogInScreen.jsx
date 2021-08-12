import React, { useState, useEffect } from "react";
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
import Loading from "../components/Loading";
import { translateErrors } from "../utils";

export default function LogInScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState(""); //email=保持しておきたいデータ・setEmail=値を更新する関数・useState("")=初期値
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(true);

  //ログインスクリーンが表示された時にユーザーが存在していれば自動的に画面遷移する
  useEffect(() => {
    //ユーザーの情報を監視する
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      //ユーザーがログインしてたら↓の処理を実行する
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: "TopScreen" }],
        });
      } else {
        setLoading(false);
      }
    });
    return unsubscribe; //userの監視状態がキャンセルされる.画面が消える瞬間にreturnが実行される
  }, []); //[]は画面がマウントされた瞬間その一回だけ処理を実行する

  function handlePress() {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((useCredentail) => {
        const { user } = useCredentail; //userの情報を取り出す
      })
      .catch((error) => {
        const errorMsg = translateErrors(error.code);
        Alert.alert(errorMsg.title, errorMsg.description);
      })
      .then(() => {
        setLoading(false); //成功した場合も失敗した場合も適応する処理
      });
  }

  return (
    <View style={styles.container}>
      <Loading isLoading={isLoading} />
      <View style={styles.inner}>
        <Text style={styles.title}>ログイン</Text>
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

        <Button
          label="Submit"
          // ログイン成功したときに前の履歴を消してBackボタンを表示させなくする
          onPress={handlePress}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>まだ登録したことない?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "SignUp" }],
              });
            }}
          >
            <Text style={styles.footerLink}>Sign up here!</Text>
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
