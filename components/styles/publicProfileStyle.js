import { StyleSheet } from "react-native";

const lila = "#d6d6e8";
const morado = "#4d399a";
const celeste = "#33AAFF";
const gris = "#838899";
const gris2 = "#f2f2f2";
const blanco = "#FFF";

export const publicProfileStyles = StyleSheet.create({
  publicProfileAvatar: {
    alignSelf: "center",
    marginTop: 15,
  },
  publicProfileTxt: {
    alignSelf: "center",
    fontSize: 16,
    marginVertical: 5,
  },
  publicProfileTxt2: {
    fontSize: 20,
    marginRight: 10,
  },
  publicProfileTxt3: {
    color: morado,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  publicProfileTxt4: {
    color: morado,
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
  },
  publicProfileTxt5: {
    fontSize: 20,
    marginLeft: 10,
  },
  publicProfileTxt6: {
    color: gris,
    marginHorizontal: 10,
    marginVertical: 10,

    textAlign: "center",
  },
  publicProfileTxt7: {
    color: celeste,
    fontSize: 16,
    marginHorizontal: 10,
    marginTop: 5,
    textAlign: "center",
  },
  publicProfileTxt8: {
    color: morado,
    fontSize: 15,
    marginHorizontal: 10,
    textAlign: "center",
  },
  publicProfileTxt9: {
    fontSize: 14,
    marginHorizontal: 10,
    textAlign: "center",
  },
  publicProfileView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 5,
    paddingTop: 10,
    textAlignVertical: "center",
  },
  publicProfileView2: {
    flex: 1,
    paddingBottom: 10,
  },
  publicProfileView3: {
    backgroundColor: gris2,
    borderRadius: 20,
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
  },
  publicProfileView4: {
    backgroundColor: blanco,
    borderColor: lila,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
