import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
} from "react-native-web";

const ListOrder = ({ item ,getId }) => {


  return (
    <View style={styles.container}>
      <Text> pedido</Text>
      <TouchableOpacity >
        <Image
          style={styles.image}
          source={require("../assets/trash.svg")}
        ></Image>
      </TouchableOpacity>
      <TouchableOpacity  onPress={()=>getId(item.id)}   >
        <Image
          style={styles.image}
          source={require("../assets/edit.svg")}
        ></Image>
      </TouchableOpacity> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 340,
    flexDirection: 'row',
    justifyContent: "space-around",
    backgroundColor:'#f1f2f1',
    borderRadius:10,
    marginBottom:10,
    padding:10,
  },

  image: {
    width: 24,
    height: 24,
  },
});
export default ListOrder;
