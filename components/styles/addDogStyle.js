import { StyleSheet } from "react-native";

const verde = "rgba(0,128,0,0.6)";
const lila = "#d6d6e8";

export const addDogStyles = StyleSheet.create({
  addDogBtn: {
    alignSelf: "center",
    backgroundColor: verde,
    borderRadius: 30,
    height: "100%",
    justifyContent: "flex-start",
    marginVertical: 10,
    width: "100%",
  },
  addDogBtnContainer: {
    alignSelf: "center",
    backgroundColor: verde,
    borderColor: lila,
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,
    width: "60%",
  },
  addDogBtnTxt: {
    alignSelf: "center",
    flex: 1,
    fontSize: 18,
    marginRight: 10,
  },
  addDogTxt: {
    alignSelf: "center",
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
  },
  addDogTxt2: {
    borderRadius: 5,
    borderColor: "#d6d6e8",
    borderWidth: 1,
    textAlign: "center",
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },
});
