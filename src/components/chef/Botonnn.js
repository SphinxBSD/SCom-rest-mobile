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
    marginVertical: 10,
    paddingVertical: 2,
    backgroundColor: '#C3BAB8',
    color:'#C3BAB8',
    alignContent:'center',
  },
  text: {
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 15,
    color: "#150F0E",
  },
});
