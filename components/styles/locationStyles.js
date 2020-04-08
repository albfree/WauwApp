import { StyleSheet } from "react-native";

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
    marginVertical: 10,
    width: "100%",
  },
  locationBtnContainer: {
    alignSelf: "center",
    backgroundColor: verde,
    borderColor: lila,
    borderWidth: 1,
    height: 55,
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 50,
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
    paddingLeft: 5,
  },
  locationMapBtnContainerSave: {
    paddingRight: 5,
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
