import { StyleSheet } from "react-native";

const blanco = "#FFF";
const lila = "#d6d6e8";
const lila2 = "#443099";
const gris = "#838899";
const negro = "#454D65";
const naranja = "rgba(255,128,0,0.6)";
const verde = "rgba(0,128,0,0.6)";
const rojo = "rgba(255,0,0,0.6)";

export const accommodationStyles = StyleSheet.create({
  accommodationBtn: {
    alignSelf: "center",
    backgroundColor: lila2,
    borderRadius: 30,
    height: "100%",
    justifyContent: "flex-start",
    width: "100%",
  },
  accommodationBtn2: {
    alignSelf: "center",
    backgroundColor: verde,
    borderRadius: 30,
    height: "100%",
    justifyContent: "flex-start",
    width: "100%",
  },
  accommodationBtn3: {
    alignSelf: "center",
    backgroundColor: rojo,
    borderRadius: 30,
    height: "100%",
    justifyContent: "flex-start",
    width: "100%",
  },
  accommodationBtnContainer: {
    alignSelf: "flex-start",
    backgroundColor: lila2,
    borderColor: lila,
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 35,
    width: "140%",
  },
  accommodationBtnContainer2: {
    alignSelf: "flex-end",
    backgroundColor: lila2,
    borderColor: lila,
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 35,
    width: "140%",
  },
  accommodationBtnContainer3: {
    alignSelf: "flex-start",
    backgroundColor: verde,
    borderColor: lila,
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 55,
    width: "140%",
  },
  accommodationBtnContainer4: {
    alignSelf: "flex-end",
    backgroundColor: rojo,
    borderColor: lila,
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 55,
    width: "140%",
  },
  accommodationBtnContainer5: {
    alignSelf: "center",
    backgroundColor: lila2,
    borderColor: lila,
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    width: 110,
  },
  accommodationBtnTittle: {
    alignSelf: "center",
    flex: 4,
    fontSize: 15,
    marginLeft: 5,
  },
  accommodationTxt: {
    alignSelf: "center",
    fontSize: 17,
    marginTop: 30,
    textAlign: "center",
  },
  accommodationTxt2: {
    alignSelf: "center",
    fontSize: 22,
    marginHorizontal: -100,
    textAlign: "center",
  },
  accommodationTxt3: {
    alignSelf: "center",
    fontSize: 22,
    marginHorizontal: -100,
    marginTop: 55,
    textAlign: "center",
  },
  accommodationTxt4: {
    alignSelf: "center",
    fontSize: 18,
    textAlign: "center",
  },
});
