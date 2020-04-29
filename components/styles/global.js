import { StyleSheet } from "react-native";

const blanco = "#FFF";
const verde = "green";
const rojo = "red";
const lila = "#d6d6e8";
const lila2 = "#443099";
const celeste = "#33AAFF";
export const globalStyles = StyleSheet.create({
  adminTxt: {
    color: blanco,
    fontSize: 15,
    textAlign: "center",
  },
  adminTxt2: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 15,
    textAlign: "center",
  },
  adminTxt3: {
    fontSize: 17,
    marginHorizontal: 15,
    textAlign: "justify",
  },
  adminTxt4: {
    color: celeste,
  },
  adminTxt5: {
    color: lila,
    fontSize: 12,
    textAlign: "right",
  },
  adminTxt6: {
    fontSize: 17,
    textAlign: "center",
  },
  adminView: {
    alignItems: "center",
    backgroundColor: rojo,
    borderColor: lila,
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    height: 50,
    justifyContent: "center",
    marginHorizontal: 30,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  adminView2: {
    alignItems: "center",
    backgroundColor: verde,
    borderColor: lila,
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    height: 50,
    marginHorizontal: 30,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  adminView3: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  blankImage: {
    flex: 1,
    height: null,
    resizeMode: "cover",
    width: null,
  },
  blankImage2: {
    borderRadius: 80,
    flex: 1,
    height: null,
    marginVertical: 10,
    resizeMode: "cover",
    width: "90%",
  },
  blankImage3: {
    alignSelf: "center",
    borderRadius: 80,
    flex: 1,
    height: 230,
    marginVertical: 10,
    resizeMode: "cover",
    width: "90%",
  },
  blankImage4: {
    alignSelf: "center",
    borderRadius: 80,
    flex: 1,
    height: 230,
    marginVertical: 40,
    resizeMode: "cover",
    width: "85%",
  },
  blankTxt: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  blankView: {
    flex: 1,
    paddingVertical: "25%",
  },
  blankView2: {
    paddingHorizontal: 20,
  },
  blankView3: {
    height: 200,
    marginTop: 30,
    width: "100%",
  },
  blankView4: {
    flex: 1,
    paddingTop: 10,
  },
  blankView5: {
    flex: 1,
    paddingBottom: "15%",
    paddingTop: "5%",
  },
  drawerIcon: {
    alignSelf: "flex-end",
    marginHorizontal: 5,
  },
  drawerImage: {
    borderRadius: 60,
    height: 120,
    width: 120,
  },
  drawerMenuView: {
    margin: 20,
  },
  drawerTitle: {
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  drawerTxt: {
    fontSize: 20,
    fontWeight: "bold",
  },
  drawerView: {
    alignItems: "center",
    backgroundColor: blanco,
    height: 150,
    justifyContent: "center",
  },
  drawerView2: {
    alignItems: "center",
    backgroundColor: blanco,
    justifyContent: "center",
    paddingBottom: "5%",
  },
  drawerView3: {
    flex: 1,
    marginBottom: "15%",
    paddingBottom: "10%",
  },
  viewFeed: {
    backgroundColor: blanco,
    borderRadius: 20,
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: "30%",
    paddingHorizontal: 20,
  },
  viewFlex1: {
    flex: 1,
  },
  viewFlex2: {
    flex: 2,
  },
});
