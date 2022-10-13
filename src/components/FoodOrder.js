import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList,
  } from "react-native-web";
  import ListFood from "./ListFood";

function FoodOrder({foods,drinks, flagFood,setCont,cont, id}) {
    
  return (

      <View style={styles.container}>
        <FlatList
          data={flagFood==="food"? foods:drinks}
          keyExtractor={(item) => item.id}
          renderItem={(item) => <ListFood item={item.item} setCont={setCont} cont={cont} flagFood={flagFood}  id={id}/>}
          style={styles.list}
          horizontal
        />
      </View>

    
  )
}

export default FoodOrder

const styles = StyleSheet.create({
    container: {
      width: "100%",
      maxWidth: 340,
      height: "100%",
      padding: 2,
  
    },
    list: {
      width: "100%",

      
    },
  });