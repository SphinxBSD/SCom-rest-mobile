import React from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { theme } from "../core/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import back from "../assets/back.png";
import icon from "../assets/logo.png";
import { setStatusBarBackgroundColor } from "expo-status-bar";

export default function HeaderU({ navigation }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "StartScreen" }],
          })
        }
      >
        <Image style={styles.image} source={back}></Image>
      </TouchableOpacity>
      <Image style={styles.image} source={icon}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    width: "100%",
    maxWidth:400,
    backgroundColor:"#414757",
    marginTop:17
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 15,
    marginLeft:15
  },
  text: {
    fontSize: 15,
    color: theme.colors.white,
    lineHeight: 21,
    marginRight: 15,
  },
});
