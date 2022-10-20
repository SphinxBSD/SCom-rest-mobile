import React from "react";
import settings from "../core/settings.json";
import send from "../assets/send.png";
import plus from '../assets/plus.png'
import minus from '../assets/minus.png'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from "react-native";

const ListFood = () => {
 
  return (
    <View style={styles.container}>
    
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "85vw",
    flexDirection: "row",

    maxWidth: 340,
    borderRadius: 10,
    height: 150,
    margin: 5.2,
  },

  image: {
    width: "50%",
    height: "95%",
    borderRadius: 10,
    margin: 3,
  },
  containerDatos: {
    justifyContent: "center",
    textAlign: "center",
    width: "45%",
    height: "95%",
    margin: 3,
  },
  imageB: {
    width: 30,
    height: 30,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 5,
  },
});
export default ListFood;
