import { StyleSheet } from "react-native";

const blanco = "#FFF";
const gris = "#838899";
const lila = "#d6d6e8";

export const searchAccommodationStyles = StyleSheet.create({
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
    fontSize: 17,
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
  searchAccommodationView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
