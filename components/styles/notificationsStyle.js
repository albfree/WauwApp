import { StyleSheet } from "react-native";

const blanco = "#FFF";
const lila = "#d6d6e8";
const lila2 = "#838899";
const negro = "#454D65";

export const notificationsStyles = StyleSheet.create({
  notificationsColumn: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: 10,
  },
  notificationsFeed: {
    alignItems: "center",
    backgroundColor: blanco,
    borderColor: lila,
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    height: 115,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  notificationsTxt: {
    alignSelf: "center",
    color: negro,
    fontSize: 15,
    fontWeight: "500",
  },
  notificationsTxt2: {
    alignSelf: "center",
    color: lila2,
    fontSize: 14,
  },
  notificationsView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
