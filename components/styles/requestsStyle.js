import { StyleSheet } from "react-native";

const blanco = "#FFF";
const lila = "#d6d6e8";
const lila2 = "#443099";
const gris = "#838899";
const negro = "#454D65";
const naranja = "rgba(255,128,0,0.6)";
const verde = "rgba(0,128,0,0.6)";
const rojo = "rgba(255,0,0,0.6)";

export const requestsStyles = StyleSheet.create({
  requestsBtn: {
    backgroundColor: rojo,
    borderRadius: 30,
    justifyContent: "flex-start",
    width: "100%",
  },
  requestsBtn2: {
    backgroundColor: lila2,
    borderRadius: 30,
    justifyContent: "flex-start",
    width: "100%",
  },
  requestsBtnContainer: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: rojo,
    borderColor: lila,
    borderWidth: 1,
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 5,
    width: "75%",
  },
  requestsBtnContainer2: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: lila2,
    borderColor: lila,
    borderWidth: 1,
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 5,
    width: "75%",
  },
  requestsBtnTittle: {
    alignSelf: "center",
    flex: 4,
    fontSize: 16,
  },
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
  requestsFeed2: {
    backgroundColor: blanco,
    borderRadius: 20,
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 8,
  },
  requestsImage: {
    alignSelf: "center",
    borderRadius: 50,
    height: 100,
    marginBottom: 18,
    marginTop: 20,
    resizeMode: "stretch",
    width: 100,
  },
  requestsTxt: {
    color: negro,
    fontSize: 15,
    fontWeight: "500",
  },
  requestsTxt10: {
    alignSelf: "center",
    color: rojo,
    marginTop: 8,
    textAlign: "center",
  },
  requestsTxt11: {
    alignSelf: "center",
    fontSize: 17,
    marginBottom: 10,
    marginTop: 30,
    textAlign: "center",
  },
  requestsTxt12: {
    alignSelf: "center",
    color: rojo,
    fontSize: 18,
    marginTop: 15,
    textAlign: "center",
  },
  requestsTxt13: {
    alignSelf: "center",
    color: verde,
    marginBottom: 10,
    marginTop: 5,
    textAlign: "center",
  },
  requestsTxt14: {
    color: verde,
    marginTop: 15,
    textAlign: "center",
  },
  requestsTxt15: {
    alignSelf: "center",
    marginTop: 15,
    textAlign: "center",
  },
  requestsTxt16: {
    alignSelf: "center",
    color: gris,
    fontSize: 14,
    marginLeft: 3,
    marginTop: 4,
  },
  requestsTxt2: {
    color: gris,
    fontSize: 14,
    marginTop: 4,
  },
  requestsTxt3: {
    color: gris,
    fontSize: 14,
    marginTop: 4,
  },
  requestsTxt4: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 15,
    textAlign: "center",
  },
  requestsTxt5: {
    color: lila2,
    marginBottom: 15,
    marginTop: 15,
    textAlign: "center",
  },
  requestsTxt6: {
    alignSelf: "center",
    marginTop: 5,
    textAlign: "center",
  },
  requestsTxt7: {
    alignSelf: "center",
    color: gris,
    marginBottom: 10,
    marginHorizontal: -10,
    textAlign: "center",
  },
  requestsTxt8: {
    alignSelf: "center",
    fontSize: 17,
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
  requestsTxt9: {
    alignSelf: "center",
    color: naranja,
    marginBottom: 10,
    marginTop: 5,
    textAlign: "center",
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
  requestsView4: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 20,
    paddingBottom: 5,
  },
  requestsView5: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginVertical: 10,
  },
  requestsView6: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
});
