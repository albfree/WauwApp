import { StyleSheet } from "react-native";

const morado = "#4d399a";
const blanco = "white";
const lila2 = "#5c54a4";
export const payStyles = StyleSheet.create({
  payBtn: {
    alignContent: "center",
    alignItems: "center",
    backgroundColor: morado,
    borderRadius: 15,
    justifyContent: "center",
    marginHorizontal: 30,
    marginTop: 20,
    paddingVertical: 5,
  },

  payBtn2: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: morado,
    borderRadius: 15,
    width: "40%",
  },
  payBtnTxt: {
    color: blanco,
    fontSize: 22,
    textAlign: "center",
  },
  payTxt: {
    color: lila2,
    marginBottom: 15,
    marginHorizontal: 10,
    marginTop: 5,
    textAlign: "center",
  },
  payTxt2: {
    fontSize: 22,
    marginHorizontal: 10,
    textAlign: "center",
  },
  payTxt3: {
    fontSize: 18,
    marginHorizontal: 10,
    textAlign: "center",
  },
  payView: {
    bottom: 0,
    left: 0,
    height: "100%",
    position: "absolute",
    right: 0,
    top: 0,
    width: "100%",
  },
});
