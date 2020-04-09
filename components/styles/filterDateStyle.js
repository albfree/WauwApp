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
    width: "100%",
  },
  filterDateBtn2: {
    alignSelf: "center",
    backgroundColor: verde,
    borderRadius: 30,
    height: "100%",
    justifyContent: "flex-start",
    width: "100%",
  },
  filterDateBtnContainer: {
    alignSelf: "center",
    backgroundColor: morado,
    borderColor: lila,
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    marginRight: 5,
    marginVertical: 10,
    width: "45%",
  },
  filterDateBtnContainer2: {
    alignSelf: "center",
    backgroundColor: verde,
    borderColor: lila,
    borderWidth: 1,
    height: 45,
    justifyContent: "center",
    marginLeft: 5,
    marginVertical: 10,
    width: "45%",
  },
  filterDateTittle: {
    alignSelf: "center",
    flex: 4,
    fontSize: 15,
    marginLeft: 5,
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
    alignItems: "center",
    flex: 1.8,
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
});
