import { StyleSheet } from "react-native";

const blanco = "#FFF";
const lila = "#d6d6e8";
const gris = "#838899";
const negro = "#454D65";
const rojo = "rgba(255,128,0,0.6)";
const verde = "rgba(0,128,0,0.6)";

export const requestsStyles = StyleSheet.create({
  requestsFeed: {
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
  requestsTxt: {
    color: negro,
    fontSize: 15,
    fontWeight: "500",
  },
  requestsTxt2: {
    color: gris,
    fontSize: 14,
    marginTop: 4,
    marginLeft: 3,
  },
  requestsTxt3: {
    color: gris,
    fontSize: 14,
    marginTop: 4,
  },

  requestsView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  requestsView2: {
    alignItems: "flex-start",
    marginHorizontal: 5,
  },
  requestsView3: {
    alignItems: "flex-end",
    marginHorizontal: 5,
  },
});
