import React from 'react'
import ListOrders from './ListOrders'
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList,
  } from "react-native";
  import ListFood from "./ListFood";

function FoodOrder({foods,drinks, flagFood,id, orders}) {
    
  return (

      <View style={styles.container}>
        <FlatList
          data={flagFood==="food"? foods:drinks}
          keyExtractor={(item) => item.id}
          renderItem={(item) => <ListOrders item={item.item}  flagFood={flagFood}  id={id} orders={orders}/>}
          style={styles.list}
          
         />
      </View>

    
  )
}

export default FoodOrder

const styles = StyleSheet.create({
    container: {
      width: "100%",
      maxWidth: 350,
      height: "100%",
      padding: 2,
  
    },
    list: {
      width: "100%",
    },
  });