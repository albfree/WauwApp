import { StyleSheet } from "react-native";

const lila = "#d6d6e8";
const lila2 = "#5c54a4";
const blanco = "white";
const morado = "#443099";
const naranja = "#ff7549";
const transparente = "transparent";
const rojo = "rgba(255,0,0,0.6)";

export const profileStyles = StyleSheet.create({
  profileAvatar: {
    borderColor: lila,
    borderWidth: 1,
    marginLeft: "10%",
  },
  profileBtn: {
    backgroundColor: lila2,
    borderColor: lila,
    borderRadius: 18,
    borderWidth: 1,
  },
  profileBtn2: {
    backgroundColor: lila2,
    borderColor: lila,
    borderRadius: 18,
    borderWidth: 1,
  },
  profileBtn3: {
    backgroundColor: morado,
    borderRadius: 30,
    justifyContent: "flex-start",
    marginVertical: 5,
    width: "90%",
  },
  profileBtn4: {
    backgroundColor: naranja,
    borderRadius: 30,
    justifyContent: "flex-start",
    marginVertical: 5,
    width: "90%",
  },
  profileBtn5: {
    backgroundColor: rojo,
    borderRadius: 30,
    justifyContent: "flex-start",
    width: "100%",
  },
  profileBtnContainer: {
    marginTop: 20,
    width: "95%",
  },
  profileBtnContainer2: {
    alignSelf: "center",
    marginLeft: "15%",
    width: "95%",
  },
  profileBtnContainer3: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: morado,
    borderColor: lila,
    borderWidth: 1,
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 5,
    width: "80%",
  },
  profileBtnContainer4: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: naranja,
    borderColor: lila,
    borderWidth: 1,
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 5,
    width: "80%",
  },
  profileBtnContainer5: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: rojo,
    borderColor: lila,
    borderWidth: 1,
    justifyContent: "center",
    marginTop: 20,
    width: "80%",
  },
  profileBtnTittle: {
    alignSelf: "center",
    flex: 5,
    fontSize: 17,
  },
  profilePrints: {
    alignSelf: "center",
    backgroundColor: transparente,
    height: "15%",
    marginVertical: 20,
    resizeMode: "stretch",
    width: "82%",
  },
  profileTxt: {
    alignSelf: "center",
    color: blanco,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  profileTxt2: {
    alignSelf: "center",
    color: blanco,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
  profileTxt3: {
    borderRadius: 25,
    color: lila2,
    fontSize: 19,
    paddingBottom: 5,
    paddingTop: 10,
    textAlign: "center",
  },
  profileTxt4: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginHorizontal: 15,
    textAlign: "center",
  },
  profileTxt5: {
    marginBottom: 10,
  },
  profileTxt6: {
    color: blanco,
  },
  profileTxt7: {
    color: lila2,
    textAlign: "center",
  },
  profileView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileView2: {
    flex: 1,
    paddingBottom: "20%",
  },
  profileView3: {
    alignItems: "center",
    backgroundColor: lila2,
    borderColor: lila,
    borderRadius: 25,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    textAlignVertical: "center",
  },
  profileView4: {
    paddingHorizontal: 20,
  },
  profileView5: {
    alignSelf: "center",
    backgroundColor: lila2,
    borderColor: lila,
    borderRadius: 25,
    borderWidth: 1,
    color: blanco,
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 15,
    paddingVertical: 10,
    textAlign: "center",
    textAlignVertical: "center",
    width: 200,
  },
  profileView6: {
    backgroundColor: blanco,
    borderColor: lila,
    borderRadius: 25,
    borderWidth: 1,
    flex: 1,
    marginBottom: 10,
  },
  profileView7: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
  },
  profileView8: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  profileView9: {
    flex: 1,
    marginLeft: "-70%",
  },
});
