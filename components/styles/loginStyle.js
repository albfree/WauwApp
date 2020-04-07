import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  loginImage: {
    height: "40%",
    width: "60%",
    resizeMode: "stretch",
    alignSelf: "center",
    marginBottom: "10%",
    marginTop: "3%",
  },
  loginBtn: {
    backgroundColor: "#443099",
    borderRadius: 30,
    width: "95%",
    height: "50%",
    justifyContent: "flex-start",
  },
  loginBtnContainer: {
    alignItems: "center",
    alignSelf: "center",
    width: "75%",
    height: "10%",
    backgroundColor: "#443099",
    justifyContent: "center",
  },
  loginPrints: {
    height: "10%",
    width: "82%",
    resizeMode: "stretch",
    backgroundColor: "transparent",
    alignSelf: "center",
    marginBottom: "15%",
    marginTop: "6%",
  },
  loginBtnTittle: {
    marginLeft: "15%",
    fontSize: 17,
  },
  loginView: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 60,
    marginBottom: "5%",
  },
  loginTxt: {
    fontSize: 50,
    color: "#5c54a4",
    marginTop: "20%",
  },
});
