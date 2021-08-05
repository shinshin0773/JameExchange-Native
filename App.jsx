import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import firebase from "firebase";

import TopScreen from "./src/screens/TopScreen";
import PostDetailScreen from "./src/screens/PostDetailScreen";
import PostCreateScreen from "./src/screens/PostCreateScreen";
import MyProfileScreen from "./src/screens/MyProfileScreen";
import LogInScreen from "./src/screens/LogInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ProfileEditScreen from "./src/screens/ProfileEditScreen";
import ProfileCreateScreen from "./src/screens/ProfileCreate";

//firebaseのmy情報をenv.jsから取得する
import { firebaseConfig } from "./env";

require("firebase/firestore"); //firestoreを使用する

//firebaseが初期化されているかをチェック
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LogIn"
        screenOptions={{
          //アップバーのスタイルを変更
          headerStyle: { backgroundColor: "#b69cf0" },
          headerTitleStyle: { color: "#ffffff" },
          headerTitle: "JameExchange",
          headerTintColor: "#ffffff", //バックの文字の色
          headerBackTitle: "Back", //バックの文字
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, //IOSにスライドのアニメーションを統一
          gestureEnabled: true, //Androidでも横スワイプで戻ることができるようにする
          gestureDirection: "horizontal", //水平方向にスライドすると
        }}
      >
        <Stack.Screen
          name="TopScreen"
          component={TopScreen}
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
        <Stack.Screen name="PostCreate" component={PostCreateScreen} />
        <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
        <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
        <Stack.Screen name="ProfileCreate" component={ProfileCreateScreen} />
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid, //ログインとサインアップページの遷移だけAndroidを採用
          }}
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
