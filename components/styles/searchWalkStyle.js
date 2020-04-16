import { StyleSheet } from "react-native";

const blanco = "#FFF";
const lila = "#d6d6e8";
const gris = "#838899";
const negro = "#454D65";
const rojo = "rgba(255,128,0,0.6)";
const verde = "rgba(0,128,0,0.6)";

export const searchWalksStyles = StyleSheet.create({
  searchWalkColumn: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  searchWalkColumn2: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  searchWalksBtn: {
    alignSelf: "center",
    backgroundColor: verde,
    borderRadius: 30,
    height: "100%",
    justifyContent: "flex-start",
    marginVertical: 10,
    width: "100%",
  },
  searchWalksBtn2: {
    alignSelf: "center",
    backgroundColor: verde,
    borderRadius: 30,
    height: "100%",
    justifyContent: "flex-start",
    marginVertical: 10,
    width: "100%",
  },
  searchWalksBtn3: {
    alignSelf: "center",
    backgroundColor: rojo,
    borderRadius: 30,
    height: "100%",
    justifyContent: "center",
    marginVertical: 10,
    width: "100%",
  },
  searchWalksBtnContainer: {
    alignSelf: "center",
    backgroundColor: verde,
    borderColor: lila,
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    marginVertical: 10,
    width: "75%",
  },
  searchWalksBtnContainer2: {
    alignSelf: "center",
    backgroundColor: verde,
    borderColor: lila,
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    marginRight: 2.5,
    marginVertical: 10,
    width: "40%",
  },
  searchWalksBtnContainer3: {
    alignSelf: "center",
    backgroundColor: rojo,
    borderColor: lila,
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    marginLeft: 2.5,
    marginVertical: 10,
    width: "40%",
  },
  searchWalksBtnTxt: {
    marginLeft: "10%",
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
  searchWalkTxt8: {
    paddingTop: 10,
    textAlign: "center",
  },
  searchWalkTxt9: {
    paddingTop: 10,
    textAlign: "center",
  },
  searchWalkTxt10: {
    textAlign: "center",
  },
  searchWalkTxt11: {
    marginLeft: "15%",
  },
  searchWalksView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchWalksView2: {
    paddingHorizontal: "20%",
  },
  searchWalksView3: {
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
  },
  searchWalksView4: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
});
