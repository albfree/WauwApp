import { StyleSheet } from "react-native";

const blanco = "#FFF";
const lila = "#d6d6e8";
const gris = "#838899";
const negro = "#454D65";

export const searchWalksStyles = StyleSheet.create({
  searchWalkColumn: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  searchWalkColumn2: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  searchWalkFeed: {
    alignItems: "center",
    backgroundColor: blanco,
    borderColor: lila,
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    height: 90,
    marginHorizontal: 30,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  searchWalkTxt: {
    textAlign: "center",
    fontSize: 17,
    paddingVertical: 10,
  },
  searchWalkTxt2: {
    fontSize: 14,
    color: gris,
  },
  searchWalkTxt3: {
    fontSize: 15,
    fontWeight: "500",
    color: negro,
  },
  searchWalksView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
