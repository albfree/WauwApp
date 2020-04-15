import { StyleSheet } from "react-native";

const celeste = "#33AAFF";
const verde = "rgba(0,128,0,0.6)";
const lila = "#d6d6e8";
const blanco = "#FFF";

export const aboutStyles = StyleSheet.create({
  aboutBtn: {
    alignSelf: "center",
    backgroundColor: verde,
    borderRadius: 30,
    height: "100%",
    justifyContent: "flex-start",
    marginVertical: 10,
    width: "100%",
  },
  aboutBtnContainer: {
    alignSelf: "center",
    backgroundColor: verde,
    borderColor: lila,
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    marginVertical: 10,
    width: "75%",
  },
  aboutImage: {
    alignSelf: "center",
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    height: 200,
    justifyContent: "center",
    marginVertical: 20,
    resizeMode: "stretch",
    width: "85%",
  },
  aboutLink: {
    color: celeste,
  },
  aboutTxt: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  aboutTxt2: {
    fontSize: 20,
    fontWeight: "300",
    marginHorizontal: 20,
    marginTop: 10,
    textAlign: "justify",
  },
  aboutTxt3: {
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 20,
    marginTop: 10,
    textAlign: "justify",
  },
  aboutTxt4: {
    fontSize: 18,
    textAlign: "center",
  },
});
