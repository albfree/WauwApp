import { StyleSheet } from "react-native";

const blanco = "#FFF";
const lila = "#d6d6e8";
const morado = "#443099";
const verde = "rgba(0,128,0,0.6)";

export const chatsStyles = StyleSheet.create({
  chatsFeed: {
    alignItems: "center",
    backgroundColor: blanco,
    borderColor: lila,
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    height: 90,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  chatsTxt: {
    color: morado,
    fontSize: 16,
    fontWeight: "bold",
  },
  chatsTxt2: {
    color: verde,
  },
  chatsView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chatsView2: {
    backgroundColor: blanco,
    flex: 1,
  },
});
