import { StyleSheet } from "react-native";
const morado = "#443099";
const lila = "#d6d6e8";

export const homeStyles = StyleSheet.create({
  homeBtn: {
    backgroundColor: morado,
    borderRadius: 30,
    justifyContent: "flex-start",
    marginBottom: 5,
    marginLeft: "5%",
    marginTop: 5,
    width: "90%",
  },
  homeBtnContainer: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: morado,
    borderColor: lila,
    borderWidth: 1,

    justifyContent: "center",
    marginBottom: 10,
    marginTop: 5,
    width: "90%",
  },
  homeBtnTxt: {
    alignSelf: "center",
    flex: 5,
    fontSize: 17,
  },
  homeImage: {
    alignSelf: "center",
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    resizeMode: "stretch",
    width: "85%",
  },
  homeTxt: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  homeTxt2: {
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
  },
  homeView: {
    alignContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 20,
  },
  homeView2: {
    alignContent: "center",
    alignItems: "center",
    flex: 1,
    height: 180,
    justifyContent: "center",
    marginTop: 20,
    width: "95%",
  },
});
