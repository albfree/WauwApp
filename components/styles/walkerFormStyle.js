import { StyleSheet } from "react-native";

const gris = "grey";
const gris2 = "rgba(191, 191, 191, 0.4)";
const gris3 = "rgba(191, 191, 191, 0.8)";
const lila = "#d6d6e8";

export const walkerFormStyles = StyleSheet.create({
  walkerFormImput: {
    color: gris,
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  walkerFormImput2: {
    color: gris,
    fontSize: 16,
    marginBottom: 10,
    padding: 10,
    textAlign: "center",
  },
  walkerFormList: {
    backgroundColor: gris2,
  },
  walkerFormList2: {
    paddingTop: 5,
  },
  walkerFormList3: {
    backgroundColor: gris3,
    margin: 3,
  },
  walkerFormTxt: {
    fontSize: 20,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlign: "center",
  },
  walkerFormTxt2: {
    fontSize: 17,
    paddingVertical: 3,
    textAlign: "center",
  },
  walkerFormTxt3: {
    fontSize: 15,
    textAlign: "center",
  },
  walkerFormTxt4: {
    fontSize: 13,
    textAlign: "center",
  },
  walkerFormView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginHorizontal: 2,
  },
  walkerFormView2: {
    borderColor: lila,
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    paddingVertical: 5,
    textAlign: "center",
    width: 140,
  },
});
