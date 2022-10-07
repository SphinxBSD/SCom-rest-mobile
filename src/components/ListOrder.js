import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from "react-native-web";

const ListOrder = ({ item, getId, setFlag, flag,handleOnClick }) => {
  const getContent = () => {
    if (flag) {
      return (
        <>
          <TouchableOpacity >
            <Image
              style={styles.image}
              source={require("../assets/trash.svg")}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => getId(item.id)}>
            <Image
              style={styles.image}
              source={require("../assets/send.svg")}
            ></Image>
          </TouchableOpacity>
        </>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => getId(item.id)}>
          <Image
            style={styles.image}
            source={require("../assets/show.svg")}
          ></Image>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text> pedido</Text>

      {getContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 340,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f1f2f1",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },

  image: {
    width: 24,
    height: 24,
  },
});
export default ListOrder;
