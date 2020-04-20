import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";

export default function Loading(props) {
  const { isVisible, text } = props;
  const c1 = "rgba(0, 0, 0, 0.5";
  const c2 = "443099";
  const trans = "transparent";
  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor={c1}
      overlayBackgroundColor={trans}
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color="{c2} " />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}
const c3 = "#fff";
const c4 = "#00a680";
const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: c3,
    borderColor: c4,
    borderWidth: 2,
    borderRadius: 10,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: c4,
    textTransform: "uppercase",
    marginTop: 10,
  },
});
