import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";


export default function Button({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === "outlined",
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: "50%",
    marginVertical: 10,
    paddingVertical: 2,
    backgroundColor: '#C3BAB8',
    color:'#C3BAB8',
  },
  text: {
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 15,
  },
});
