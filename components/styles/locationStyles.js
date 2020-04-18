import { StyleSheet, Platform } from "react-native";

const blanco = "#FFF";
const lila = "#d6d6e8";
const verde = "rgba(0,128,0,0.6)";
const mapa = "#a60d0d";
const mapa2 = "#00a680";

export const locationStyles = StyleSheet.create({
  locationBtn: {
    alignSelf: "center",
    backgroundColor: verde,
    borderRadius: 30,
    height: "100%",
    justifyContent: "flex-start",
    width: "100%",
  },
  locationBtnContainer: {
    alignSelf: "center",
    backgroundColor: verde,
    borderColor: lila,
    borderWidth: 1,
    height: Platform.OS === "ios" ? 70 : 55,
    justifyContent: "center",
    marginTop: 40,
    paddingBottom: Platform.OS === "ios" ? 20 : null,
    width: "70%",
  },

  locationBtnTxt: {
    alignSelf: "center",
    flex: 1,
    fontSize: 18,
    marginRight: 10,
  },
  locationImput: {
    marginBottom: 10,
  },
  locationMapBtnCancel: {
    backgroundColor: mapa,
  },
  locationMapBtnContainerCancel: {
    paddingHorizontal: 5,
    width: "50%",
  },
  locationMapBtnContainerSave: {
    paddingHorizontal: 5,
    width: "50%",
  },
  locationMapBtnSave: {
    backgroundColor: mapa2,
  },
  locationMapStyle: {
    height: 550,
    width: "100%",
  },
  locationView: {
    backgroundColor: blanco,
    borderRadius: 20,
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: "49%",
    paddingHorizontal: 20,
  },

  locationViewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
});
