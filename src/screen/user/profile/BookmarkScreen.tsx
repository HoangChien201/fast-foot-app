import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const BookmarkScreen = () => {
  function BookmarksEmptyComponent() {
    return (
      <View style={styles.bookmarkEmptyContainer}>
        <View style={styles.flexRow}>
          <Image source={require('../../../assets/images/icon/bookmark-o.png')} style={{ marginEnd: 10 }} />
          <Text style={styles.textEmpty}>Không có gì tại đây...</Text>
        </View>
        <Text style={styles.textEmpty}>Thêm món ăn ưa thích</Text>

        <TouchableOpacity style={styles.addProductContaienr}>
          <Image source={require('../../../assets/images/icon/add.png')} />
          <Text style={[styles.textEmpty,{color:'#000'}]}>Thêm món ăn</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BookmarksEmptyComponent/>
    </View>
  )
}

export default BookmarkScreen

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  flexRow:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bookmarkEmptyContainer:{
    alignItems:'center',
    justifyContent:"center",
    flex:1
  },
  textEmpty:{
    fontSize:16,
    marginVertical:10
  },
  addProductContaienr:{
    alignItems:'center',
    marginTop:10
  }
})