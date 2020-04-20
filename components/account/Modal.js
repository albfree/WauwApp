import React from "react";
import { StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

export default function Modal(props) {
  const { isVisible, setIsVisible, children } = props;

  const closeModal = () => setIsVisible(false);
  const c1 = "rgba(0,0,0,.5)";
  const c2 = "transparent";
  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor={c1}
      overlayBackgroundColor={c2}
      overlayStyle={styles.overlay}
      onBackdropPress={closeModal}
    >
      {children}
    </Overlay>
  );
}
const c3 = "#fff";
const styles = StyleSheet.create({
  overlay: {
    backgroundColor: c3,
    height: "auto",
    width: "90%",
  },
});
