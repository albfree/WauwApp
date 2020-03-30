import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  btnStyle: {
    backgroundColor: "#443099",
    width: "75%",
    height: "45%",
    borderRadius: 30,
    marginTop: 5,
    marginBottom: 5
  },
  btnTextStyle: {
    flex: 1
  },
  /* Home */
  homeView: {
    padding: 20,
    flex: 1,
    alignContent: "center",
    alignItems: "center"
  },
  homeView2: {
    flex: 1,
    width: "95%",
    height: 180,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  homeTitle: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center"
  },
  homeContentText: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "300",
    textAlign: "center"
  },
  homeImage: {
    flex: 1,
    width: "85%",
    resizeMode: "stretch",
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: "center",
    justifyContent: "center"
  },
  safeHomeArea: {
    flex: 1,
    paddingBottom: 5,
    marginBottom: 20
  },
  /* Profile */
  safeProfileArea: {
    flex: 1,
    paddingBottom: 10
  },
  profileView: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  profileView2: {
    flex: 1,
    paddingBottom: 60,
    marginBottom: 30
  },
  profileBtn: {
    backgroundColor: "#443099",
    borderRadius: 30,
    marginTop: 5,
    marginBottom: 5,
    width: "90%",
    justifyContent: "flex-start",
    marginLeft: 20
  },
  profileBtnContainer: {
    borderWidth: 1,
    borderColor: "#d6d6e8",
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    backgroundColor: "#443099",
    marginTop: 5,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    justifyContent: "center"
  },
  profilePrints: {
    height: "20%",
    width: "82%",
    resizeMode: "stretch",
    backgroundColor: "transparent",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20
  },
  profileBtnTittle: {
    flex: 5,
    fontSize: 17,
    alignSelf: "center"
  },
  profileSignOut: {
    backgroundColor: "#ff7549",
    borderRadius: 30,
    marginTop: 5,
    marginBottom: 5,
    width: "90%",
    justifyContent: "flex-start",
    marginLeft: 20
  },
  profileSignOutContainer: {
    borderWidth: 1,
    borderColor: "#d6d6e8",
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    backgroundColor: "#ff7549",
    marginTop: 5,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    justifyContent: "center"
  },
  /* Profile Forms */
  profileFormView: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  profileFormInput: {
    marginBottom: 10
  },
  profileFormBtnContainer: {
    marginTop: 20,
    width: "95%"
  },
  profileFormBtn: {
    backgroundColor: "#5c54a4",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#d6d6e8"
  },
  /* Profile AccountOptions */
  accountItem: {
    borderWidth: 1,
    borderColor: "#d6d6e8",
    borderRadius: 25,
    marginTop: 5,
    marginBottom: 5
  },
  accountItems: {
    paddingTop: 10
  },
  /* Profile UserGuest */
  profileUserGuestView: {
    minHeight: "100%",
    paddingBottom: 10
  },
  /* Profile InfoUser */
  userInfoDescriptionGlobal: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "white",
    borderColor: "#d6d6e8"
  },
  userInfoDescription: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 25,
    color: "black",
    marginBottom: 10,
    textAlign: "center"
  },
  userInfoTitleDescription: {
    textAlign: "center",
    paddingBottom: 5,
    fontSize: 19,
    borderRadius: 25,
    color: "#4d399a",
    paddingTop: 10
  },
  userInfoWauwPoints: {
    borderWidth: 1,
    borderColor: "#d6d6e8",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: "#5c54a4",
    borderRadius: 25,
    color: "white",
    marginBottom: 15,
    marginTop: 15,
    marginLeft: "25%",
    marginRight: "25%",
    textAlignVertical: "center",
    textAlign: "center"
  },
  userInfoEmail: {
    color: "white",
    marginTop: 8,
    fontWeight: "bold",
    paddingRight: "10%",
    marginRight: "2%",
    fontSize: 16
  },
  userInfoDisplayName: {
    fontWeight: "bold",
    color: "white",
    marginRight: "2%",
    fontSize: 16
  },
  userInfoAvatar: {
    borderWidth: 1,
    borderColor: "#d6d6e8",
    marginLeft: "10%",
    marginRight: "5%"
  },
  infoUserView: {
    borderWidth: 1,
    borderColor: "#d6d6e8",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 25,
    backgroundColor: "#5c54a4",
    textAlignVertical: "center"
  },
  /* Profile Drawer */
  drawerView: {
    height: 150,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  drawerImage: {
    height: 120,
    width: 120,
    borderRadius: 60
  },
  drawerMenuView: {
    margin: 20
  },
  drawerTitle: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
    alignSelf: "center"
  },
  drawerIcon: {
    alignSelf: "flex-end",
    marginHorizontal: 5,
    alignSelf: "flex-end"
  },
  drawerTxt: {
    fontSize: 20,
    fontWeight: "bold"
  },
  /* Login Screen */
  loginImage: {
    height: "40%",
    width: "60%",
    resizeMode: "stretch",
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 10
  },
  loginBtn: {
    backgroundColor: "#443099",
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    height: "50%",
    justifyContent: "flex-start"
  },
  loginBtnContainer: {
    alignItems: "center",
    alignSelf: "center",
    width: "75%",
    height: "10%",
    backgroundColor: "#443099",
    marginTop: 50,
    marginRight: 20,
    marginLeft: 20,
    justifyContent: "center"
  },
  loginPrints: {
    height: "10%",
    width: "82%",
    resizeMode: "stretch",
    backgroundColor: "transparent",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 30
  },
  loginBtnTittle: {
    marginLeft: 40,
    fontSize: 17
  },
  loginView: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 60,
    marginBottom: 60
  },
  loginTxt: {
    fontSize: 50,
    color: "#5c54a4",
    marginTop: 40
  },
  /* My Requests */
  myRequestsFeed: {
    marginHorizontal: 16
  },
  safeMyRequestsArea: {
    flex: 1,
    paddingBottom: 5,
    marginBottom: 20
  },
  myRequestsFeedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8
  },
  myRequestsView1: {
    flex: 1
  },
  myRequestsColumn1: {
    alignItems: "flex-start",
    marginHorizontal: 5
  },
  myRequestsColumn2: {
    alignItems: "flex-end",
    marginHorizontal: 5
  },
  myRequestsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  myRequestsNum: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65"
  },
  myRequestsStatus: {
    fontSize: 13,
    marginTop: 4
  },
  myRequestsPrice: {
    fontSize: 14,
    color: "#838899",
    marginTop: 4,
    marginLeft: 3
  },
  myRequestsType: {
    fontSize: 14,
    color: "#838899",
    marginTop: 4
  }
});
