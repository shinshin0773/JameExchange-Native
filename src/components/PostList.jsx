import React from 'react';
import { View , ScrollView, Text, StyleSheet} from 'react-native';

export default function TopList() {
  return (
   <View>
     <View style={styles.TopListItem}>
       <ScrollView>
         {/* グループ名のタブのView */}
         <View style={styles.groupNameWrap}>
           <View style={styles.groupCircle}></View>
           <View style={styles.groupNameTitle}>
             <Text style={styles.groupNameTitleText}>ジャニーズジュニア情報局</Text>
           </View>
         </View>

         {/* 投稿のアイテム */}
         <View style={styles.postItem}>
           <View style={styles.postImage}></View>

           {/* 投稿の情報 */}
           <View style={styles.postItemListWrap}>
             <View style={styles.postItemList}>
               <View style={styles.postItemTitle}><Text style={styles.postItemTitleText}>Name</Text></View>
               <View style={styles.postItemParper}><Text style={styles.postItemParperText}>みさき</Text></View>
             </View>
             <View style={styles.postItemList}>
               <View style={styles.postItemTitle}><Text style={styles.postItemTitleText}>Title</Text></View>
               <View style={styles.postItemParper}><Text style={styles.postItemParperText}>なにわ横アリ募集</Text></View>
             </View>
             <View style={styles.postItemList}>
               <View style={styles.postItemTitle}><Text style={styles.postItemTitleText}>内容</Text></View>
               <View style={styles.postItemParper}><Text style={styles.postItemParperText}>なにわ男子Alina tour、札幌アリーナでの
                 9/11、9/12のチケット、どの時間帯でも良いので、お譲りいただける方は
                 よろしくお願いいたします。</Text></View>
             </View>
           </View>
         </View>

         <View style={styles.postItem}>
           <View style={styles.postImage}></View>

           {/* 投稿の情報 */}
           <View style={styles.postItemListWrap}>
             <View style={styles.postItemList}>
               <View style={styles.postItemTitle}><Text style={styles.postItemTitleText}>Name</Text></View>
               <View style={styles.postItemParper}><Text style={styles.postItemParperText}>みさき</Text></View>
             </View>
             <View style={styles.postItemList}>
               <View style={styles.postItemTitle}><Text style={styles.postItemTitleText}>Title</Text></View>
               <View style={styles.postItemParper}><Text style={styles.postItemParperText}>なにわ横アリ募集</Text></View>
             </View>
             <View style={styles.postItemList}>
               <View style={styles.postItemTitle}><Text style={styles.postItemTitleText}>内容</Text></View>
               <View style={styles.postItemParper}><Text style={styles.postItemParperText}>なにわ男子Alina tour、札幌アリーナでの
                 9/11、9/12のチケット、どの時間帯でも良いので、お譲りいただける方は
                 よろしくお願いいたします。</Text></View>
             </View>
           </View>
         </View>

         <View style={styles.postItem}>
           <View style={styles.postImage}></View>

           {/* 投稿の情報 */}
           <View style={styles.postItemListWrap}>
             <View style={styles.postItemList}>
               <View style={styles.postItemTitle}><Text style={styles.postItemTitleText}>Name</Text></View>
               <View style={styles.postItemParper}><Text style={styles.postItemParperText}>みさき</Text></View>
             </View>
             <View style={styles.postItemList}>
               <View style={styles.postItemTitle}><Text style={styles.postItemTitleText}>Title</Text></View>
               <View style={styles.postItemParper}><Text style={styles.postItemParperText}>なにわ横アリ募集</Text></View>
             </View>
             <View style={styles.postItemList}>
               <View style={styles.postItemTitle}><Text style={styles.postItemTitleText}>内容</Text></View>
               <View style={styles.postItemParper}><Text style={styles.postItemParperText}>なにわ男子Alina tour、札幌アリーナでの
                 9/11、9/12のチケット、どの時間帯でも良いので、お譲りいただける方は
                 よろしくお願いいたします。</Text></View>
             </View>
           </View>
         </View>
       </ScrollView>
     </View>

   </View>
  );
};

const styles = StyleSheet.create({
  TopListItem: {
    backgroundColor: '#F0F4F8',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484',
  },
  groupNameWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  groupCircle: {
    backgroundColor: '#f5abc9',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupNameTitle: {
    position: 'absolute',
    top:  28,
    left: 43,
  },
  groupNameTitleText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  postImage: {
    backgroundColor: 'gray',
    width: 300,
    height: 300,
  },
  postItem: {
    marginTop: 40,
    marginHorizontal: 30,
  },
  postItemListWrap: {
    marginTop: 20,
  },
  postItemList: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  postItemTitle: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 70,
    height: 30,
  },
  postItemTitleText: {
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  postItemParper: {
    justifyContent: 'center',
    marginHorizontal: 15,
    width: 210,
  },
  postItemParperText: {
    fontSize: 17,
    fontWeight: 'bold',
  }
});
