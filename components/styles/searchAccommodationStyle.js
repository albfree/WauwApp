import { StyleSheet, Platform } from "react-native";

const blanco = "#FFF";
const gris = "#838899";
const lila = "#d6d6e8";
const morado = "#443099";
const verde = "rgba(0,128,0,0.6)";

export const searchAccommodationStyles = StyleSheet.create({
  searchAccommodationBtn: {
    alignSelf: "center",
    backgroundColor: morado,
    borderRadius: 30,
    height: "100%",
    justifyContent: "flex-start",
    width: "100%",
  },
  searchAccommodationBtn2: {
    alignSelf: "center",
    backgroundColor: verde,
    borderRadius: 30,
    height: "100%",
    justifyContent: "flex-start",
    width: "100%",
  },
  searchAccommodationColumn: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  searchAccommodationColumn2: {
    alignItems: "center",
    justifyContent: "center",
  },
  searchAccommodationColumn3: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  searchAccommodationContainer: {
    alignSelf: "center",
    backgroundColor: morado,
    borderColor: lila,
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    marginRight: 5,
    marginVertical: 10,
    width: "45%",
  },
  searchAccommodationContainer2: {
    alignSelf: "center",
    backgroundColor: morado,
    borderColor: lila,
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    marginLeft: 5,
    marginVertical: 10,
    width: "45%",
  },
  searchAccommodationContainer3: {
    alignSelf: "center",
    backgroundColor: verde,
    borderColor: lila,
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    marginBottom: 5,
    width: "45%",
  },

  searchAccommodationFeed: {
    alignItems: "center",
    backgroundColor: blanco,
    borderColor: lila,
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    height: 115,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  searchAccommodationTxt: {
    fontSize: 18,
    paddingVertical: 10,
    textAlign: "center",
  },
  searchAccommodationTxt2: {
    alignSelf: "center",
    color: gris,
    fontSize: 14,
  },
  searchAccommodationTxt3: {
    alignSelf: "center",
    fontSize: 17,
  },
  searchAccommodationTxt4: {
    alignSelf: "center",
    flex: 4,
    fontSize: 15,
    marginLeft: 5,
  },
  searchAccommodationTxt5: {
    alignSelf: "center",
    borderColor: lila,
    borderTopWidth: 1,
    color: gris,
    fontSize: 14,
    marginHorizontal: 5,
    textAlign: "center",
  },

  searchAccommodationTxt6: {
    fontSize: 18,
    paddingVertical: 5,
    textAlign: "center",
  },

  searchAccommodationView: {
    alignItems: Platform.OS === "ios" ? null : "center",
    flexDirection: Platform.OS === "ios" ? null : "row",
    justifyContent: Platform.OS === "ios" ? null : "space-between",
  },
  searchAccommodationView2: {
    marginBottom: 5,
    paddingBottom: 10,
  },
  searchAccommodationView3: {
    textAlign: "center",
  },
});
