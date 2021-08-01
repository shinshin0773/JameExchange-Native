import React from 'react';
import {
  View , Text , StyleSheet,
} from 'react-native';

import AppBar from '../components/AppBar';
import CircleButton from '../components/CircleButton';

export default function PostDetailScreen() {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>なにわ男子横アリ募集</Text>
        <Text style={styles.postDate}>2020年12月 10:00</Text>
      </View>

      {/* ユーザーのプロフィール情報 */}
      <View style={styles.postBody}>
        <View style={styles.postBodyImage}></View>
        <View style={styles.postItemListWrap}>
             <View style={styles.postItemList}>
               <View style={styles.postItemTitle}><Text style={styles.postItemTitleText}>Name</Text></View>
               <View style={styles.postItemParper}><Text style={styles.postItemParperText}>みさき</Text></View>
             </View>
             <View style={styles.postItemList}>
               <View style={styles.postItemTitle}><Text style={styles.postItemTitleText}>Twitterアカウント</Text></View>
               <View style={styles.postItemParper}><Text style={styles.postItemParperText}>Akasa_j</Text></View>
             </View>
             <View style={styles.postItemList}>
               <View style={styles.postItemTitle}><Text style={styles.postItemTitleText}>自己紹介</Text></View>
               <View style={styles.postItemParper}><Text style={styles.postItemParperText}>なにわ男子が大好きです！なにわ男子が大好きです！なにわ男子が大好きです！なにわ男子が大好きです！</Text></View>
             </View>
             <View style={styles.postItemList}>
               <View style={styles.postItemTitle}><Text style={styles.postItemTitleText}>入っているファンクラブ</Text></View>
               <View style={styles.postItemParper}><Text style={styles.postItemParperText}>ジャニーズジュニア情報局</Text></View>
             </View>
           </View>
      </View>
      <CircleButton style={{top: 160, bottom: 'auto' }}>★</CircleButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
  },
  postHeader: {
    backgroundColor: '#467FD3',
    height: 96,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  postTitle: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  postDate: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight:16,
  },
  postBody: {
    width: 350,
    marginVertical: 35,
    marginHorizontal: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 20,
  },
  postBodyImage: {
    backgroundColor: 'gray',
    width: 300,
    height: 300,
  },
  postItemListWrap: {
    marginTop: 20,
  },
  postItemList: {
    marginBottom: 15,
  },
  postItemTitle: {
    backgroundColor: 'black',
    alignItems: 'center',
    borderRadius: 5,
    width: 160,
  },
  postItemTitleText: {
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  postItemParper: {
    justifyContent: 'center',
    marginTop: 5,
    width: 300,
  },
  postItemParperText: {
    fontSize: 17,
    fontWeight: 'bold',
  }
});
