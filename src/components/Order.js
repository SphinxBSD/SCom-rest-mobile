import React ,{ useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native-web'
import ListOrder from './ListOrder'
const Order = ({orders, setOrders, getId}) => {
    
  return (
    <View style={styles.container}>
        <FlatList
            data={orders}
            keyExtractor={(item)=>item.id}
            renderItem={(item)=><ListOrder item={item.item } getId={getId} />}
            style={styles.list}
            ListHeaderComponent={()=> <Text style={{fontWeight:'bold',fontSize:18,marginBotton:10,marginTop:10,textAling:'center'}}>ORDENES</Text>}
        />

    </View>
  )
}

export default Order

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FDFEFE',
        width: "100%",
        maxWidth: 340,
        height:"60%",
        alignSelf: "center",
        alignItems: "center",
        padding:10

      },
      list:{
        width: "100%",
        maxWidth: 340,

      }
})