import {  StyleSheet, Button, View } from 'react-native';

export default function Botonnn({...props}) {
  return (
    <View >
  
    <Button
     color="#736969"
      title={props.title}
      style={styles.text}
      onPress={props.onPress}
    />
  </View>


  );
}

const styles = StyleSheet.create({
  button: {
    width: "50%",
    marginVertical: 5,
    paddingVertical: 1,
    backgroundColor: '#C3BAB8',
    color:'#C3BAB8',
    alignContent:'center',
  },
  text: {
    fontWeight: "bold",
    fontSize: 11,
    lineHeight: 13,
    color: "#150F0E",
  },
});
