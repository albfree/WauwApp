import { StyleSheet } from "react-native";

const blanco = "#FFF";
const lila = "#d6d6e8";
const lila2 = "#443099";
const gris = "#838899";
const negro = "#454D65";
const naranja = "rgba(255,128,0,0.6)";
const verde = "rgba(0,128,0,0.6)";
const rojo = "rgba(255,0,0,0.6)";

export const myWalksStyles = StyleSheet.create({
  myWalksBtn: {
    backgroundColor: verde,
    borderRadius: 30,
    justifyContent: "flex-start",
    width: "100%",
  },
  myWalksContainer: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: verde,
    borderColor: lila,
    borderWidth: 1,
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 5,
    width: "75%",
  },
});
