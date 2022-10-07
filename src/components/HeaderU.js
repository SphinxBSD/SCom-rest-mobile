import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native-web'
import { getStatusBarHeight } from "react-native-status-bar-height";
import { theme } from "../core/theme";

export default function HeaderU({ navigation  } ) {

  return (
    <View style={styles.header}>
        <TouchableOpacity onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "StartScreen" }],
          })} style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/back.svg")}
      ></Image>
    </TouchableOpacity>
    <Text style={styles.text}>name</Text>
    <Image
        style={styles.image}
        source={require("../assets/icon.svg")}
      ></Image>
    
    </View>
  )
}


const styles = StyleSheet.create({
	header: {
		height: 40,
		elevation: 8,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: '#24252A',
        width: "100%",
        maxWidth: 340,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "flex-end",
	},
    container: {
        position: "absolute",
        top: 10 + getStatusBarHeight(),
        left: 4,
      },
      image: {
        width: 24,
        height: 24,
        marginRight:15
      },
      text:{
        fontSize: 15,
        color: theme.colors.white,
        lineHeight: 21,
        marginRight:15
      }
})


