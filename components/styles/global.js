import { StyleSheet } from "react-native";

const gris = "#dddddd";
const blanco = "#FFF";

export const globalStyles = StyleSheet.create({
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
    paddingTop: "5%",
    paddingBottom: "15%",
  },
  btnStyle: {
    backgroundColor: "#443099",
    width: "75%",
    height: "45%",
    borderRadius: 30,
    marginTop: 5,
    marginBottom: 5,
  },
  btnTextStyle: {
    flex: 1,
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
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
    alignSelf: "center",
  },
  drawerTxt: {
    fontSize: 20,
    fontWeight: "bold",
  },
  drawerView: {
    height: 150,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
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
