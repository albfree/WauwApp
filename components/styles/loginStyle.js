import { StyleSheet } from "react-native";

const morado = "#443099";
const transparente = "transparent";
const blanco = "#5c54a4";
const celeste = "#33AAFF";

export const loginStyles = StyleSheet.create({
  loginBtn: {
    backgroundColor: morado,
    borderRadius: 30,
    justifyContent: "flex-start",
    width: "95%",
  },
  loginBtnContainer: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: morado,
    height: "10%",
    justifyContent: "center",
    marginTop: 10,
    width: "75%",
  },
  loginBtnTittle: {
    fontSize: 17,
    marginLeft: "15%",
  },
  loginImage: {
    alignSelf: "center",
    height: "40%",
    marginBottom: "10%",
    marginTop: "3%",
    resizeMode: "stretch",
    width: "60%",
  },
  loginPrints: {
    alignSelf: "center",
    backgroundColor: transparente,
    height: "10%",
    marginBottom: "15%",
    marginTop: "6%",
    resizeMode: "stretch",
    width: "82%",
  },
  loginTxt: {
    color: blanco,
    fontSize: 50,
    marginTop: "20%",
  },
  loginTxt2: {
    color: celeste,
  },
  loginTxt3: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 10,
    textAlign: "center",
  },
  loginTxt4: {
    marginBottom: 10,
    textAlign: "justify",
  },
  loginView: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: "5%",
    paddingTop: 40,
    paddingBottom: 60,
  },
  loginView2: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: "5%",
    paddingBottom: 60,
  },
});
