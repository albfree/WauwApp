import { StyleSheet } from "react-native";

const transparente = "transparent";
const blanco = "white";

export const animalStyles = StyleSheet.create({
  animalImage: {
    flex: 2,
    justifyContent: "center",
    resizeMode: "cover",
  },
  animalTxt: {
    color: blanco,
    fontSize: 20,
    marginHorizontal: 20,
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold"
  },
  animalTxt2: {
    color: blanco,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  animalView: {
    alignSelf: "center",
    backgroundColor: transparente,
    height: "20%",
    resizeMode: "stretch",
    width: "100%",
  },
  animalView2: {
    alignSelf: "center",
    backgroundColor: transparente,
    height: "20%",
    marginTop: 20,
    marginBottom: 20,
    resizeMode: "stretch",
    width: "100%",
  }
});
