import { StyleSheet } from "react-native";

const blanco = "#FFF";
const lila = "#d6d6e8";
const gris = "#838899";
const negro = "#454D65";
const verde = "rgba(0,128,0,0.6)";

export const searchWalksStyles = StyleSheet.create({
  searchWalksBtn: {
    backgroundColor: verde,
    borderRadius: 30,
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    alignSelf: "center",
    marginVertical: 10,
  },
  searchWalksBtnContainer: {
    borderWidth: 1,
    borderColor: lila,
    alignSelf: "center",
    backgroundColor: verde,
    marginVertical: 10,
    justifyContent: "center",
    width: "75%",
    height: 45,
  },
  searchWalksBtnTxt: {
    flex: 4,
    fontSize: 16,
    alignSelf: "center",
    marginLeft: 5,
  },
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
    fontSize: 17,
    paddingVertical: 10,
    textAlign: "center",
  },
  searchWalkTxt2: {
    color: gris,
    fontSize: 14,
  },
  searchWalkTxt3: {
    color: negro,
    fontSize: 15,
    fontWeight: "500",
  },
  searchWalkTxt4: {
    fontSize: 18,
    paddingVertical: 10,
    textAlign: "center",
  },
  searchWalkTxt5: {
    color: gris,
    fontSize: 15,
  },
  searchWalkTxt6: {
    borderColor: lila,
    borderTopWidth: 1,
    fontSize: 18,
    paddingVertical: 10,
    textAlign: "center",
  },
  searchWalkTxt7: {
    borderColor: lila,
    borderTopWidth: 1,
    fontSize: 18,
    paddingTop: 10,
    textAlign: "center",
  },
  searchWalksView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchWalksView2: {
    paddingHorizontal: "20%",
  },
});
