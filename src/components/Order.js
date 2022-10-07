import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from "react-native-web";
import ListOrder from "./ListOrder";
const Order = ({ orders, setOrders, getId, setFlag,flag,handleOnClick}) => {
  return (

      <View style={styles.container}>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={(item) => <ListOrder item={item.item} getId={getId} setFlag={setFlag} flag={flag} handleOnClick={handleOnClick}/>}
          style={styles.list}
        />
      </View>

  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FDFEFE",
    width: "100%",
    maxWidth: 340,
    height: 110,
    alignSelf: "center",
    alignItems: "center",
    padding: 2,

  },
  list: {
    width: "100%",
    maxWidth: 340,
  },
});
