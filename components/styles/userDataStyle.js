import { StyleSheet } from "react-native";
const lila = "#d6d6e8";
const morado = "#443099";
const verde = "rgba(0,128,0,0.6)";
export const userDataStyles = StyleSheet.create({
  userDataBtn: {
    alignSelf: "center",
    backgroundColor: verde,
    borderRadius: 30,
    height: "100%",
    justifyContent: "flex-start",
    marginVertical: 10,
    width: "100%",
  },
  userDataContainer: {
    alignSelf: "center",
    backgroundColor: verde,
    borderColor: lila,
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    marginVertical: 10,
    width: "75%",
  },
  userDataTxt: {
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 10,
  },
  userDataTxt2: {
    alignSelf: "center",
  },
  userDataTxt3: {
    alignSelf: "center",
    borderColor: lila,
    borderTopWidth: 1,
    marginTop: 5,
  },
  userDataTxt4: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: "10%",
  },
  userDataView: {
    alignItems: "center",
    borderColor: morado,
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
});
