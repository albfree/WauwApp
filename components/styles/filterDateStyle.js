import { StyleSheet } from "react-native";

const verde = "rgba(0,128,0,0.6)";
const morado = "#443099";
const lila = "#d6d6e8";

export const filterDateStyles = StyleSheet.create({
  filterDateBtn: {
    alignSelf: "center",
    backgroundColor: morado,
    borderRadius: 30,
    height: "100%",
    justifyContent: "flex-start",
    paddingRight: 20,
    width: "100%",
  },
  filterDateBtn2: {
    alignSelf: "center",
    backgroundColor: verde,
    borderRadius: 30,
    height: "100%",
    justifyContent: "flex-start",
    paddingRight: 20,
    width: "100%",
  },
  filterDateBtnContainer: {
    alignSelf: "center",
    backgroundColor: morado,
    borderColor: lila,
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    marginVertical: 10,
    width: "100%",
  },
  filterDateBtnContainer2: {
    alignSelf: "center",
    backgroundColor: verde,
    borderColor: lila,
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    marginVertical: 10,
    width: "100%",
  },
  filterDateTittle: {
    alignSelf: "center",
    fontSize: 15,
    textAlign: "center",
  },

  filterDateTxt: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
  },
  filterDateView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterDateView2: {
    alignSelf: "center",
    marginHorizontal: 5,
  },
});
