import { StyleSheet, Platform } from "react-native";
const morado = "#443099";
const lila = "#d6d6e8";

export const homeStyles = StyleSheet.create({
  homeBtn: {
    backgroundColor: morado,
    borderRadius: 300,
    height: 50,
    justifyContent: "flex-start",
    paddingHorizontal: Platform.OS === "ios" ? 25 : 10,
    width: "100%",
  },
  homeBtnContainer: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: morado,
    borderColor: lila,
    borderWidth: 1,
    height: "10%",
    justifyContent: "center",
    marginBottom: 15,
    marginTop: 35,
    width: "65%",
  },
  homeBtnContainer2: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: morado,
    borderColor: lila,
    borderWidth: 1,
    height: "10%",
    marginBottom: 15,
    marginTop: 25,
    justifyContent: "center",
    width: "65%",
  },
  homeBtnTxt: {
    alignSelf: "center",
    fontSize: 17,
    marginLeft: "10%",
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
    marginVertical: 20,
    paddingVertical: 10,
    width: "95%",
  },
});
