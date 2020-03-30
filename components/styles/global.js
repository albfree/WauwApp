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
  viewFlex1: {
    flex: 1
  },
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
    fontWeight: "100",
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
  },
  /* Show Request */
  safeShowRequestArea: {
    flex: 1,
    paddingBottom: 5,
    marginBottom: 20,
    justifyContent: "center"
  },
  showRequestFeed: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20
  },
  showRequestRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 10
  },
  showRequestRow2: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10
  },
  showRequestColumn1: {
    flex: 1,
    alignItems: "flex-start",
    marginHorizontal: 5
  },
  showRequestColumn2: {
    flex: 1.3,
    alignItems: "center",
    marginHorizontal: 5,
    justifyContent: "space-between"
  },
  showRequestColumn22: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
    justifyContent: "center"
  },
  showRequestColumn3: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5
  },
  showRequestImage: {
    width: 80,
    height: 80,
    resizeMode: "stretch",
    borderRadius: 50,
    marginTop: 5,
    marginBottom: 18
  },
  showRequestImage2: {
    width: 100,
    height: 100,
    resizeMode: "stretch",
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 18,
    alignSelf: "center"
  },
  showRequestName: {
    marginTop: 15,
    marginBottom: 10
  },
  showRequestType: {
    marginTop: 5,
    marginBottom: 10,
    color: "#443099"
  },
  showRequestType2: {
    marginTop: 15,
    marginBottom: 15,
    color: "#443099"
  },
  showRequestDate1: {
    marginTop: 5,
    alignSelf: "flex-start"
  },
  showRequestDate2: {
    marginBottom: 10,
    alignSelf: "flex-start",
    color: "#838899"
  },
  showRequestDate3: {
    marginLeft: 10,
    marginTop: 2,
    alignSelf: "flex-start"
  },
  showRequestDate4: {
    marginBottom: 10,
    marginLeft: 10,
    alignSelf: "flex-start",
    color: "#838899"
  },
  showRequestPrice: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
    marginLeft: 25,
    fontSize: 17
  },
  showRequestStatus: {
    marginBottom: 4,
    alignSelf: "center",
    marginLeft: 20,
    color: "rgba(255,128,0,0.6)"
  },
  showRequestStatus2: {
    marginBottom: 4,
    alignSelf: "center",
    marginLeft: 20,
    color: "rgba(255,0,0,0.6)"
  },
  showRequestStatus3: {
    marginBottom: 4,
    alignSelf: "center",
    marginLeft: 20,
    color: "rgba(0,128,0,0.6)"
  },
  showRequestStatus4: {
    marginBottom: 10,
    alignSelf: "center",
    marginLeft: 30,
    color: "rgba(0,128,0,0.6)",
    marginTop: 5
  },
  showRequestStatus5: {
    marginBottom: 10,
    alignSelf: "center",
    marginLeft: 30,
    color: "rgba(255,0,0,0.6)",
    marginTop: 5
  },

  showRequestPay: {
    color: "rgba(255,0,0,0.6)"
  },
  showRequestPay2: {
    color: "rgba(0,128,0,0.6)"
  },
  showRequestPay3: {
    color: "rgba(0,128,0,0.6)",
    marginTop: 15
  },
  showRequestPay4: {
    color: "rgba(255,0,0,0.6)",
    marginTop: 15
  },

  showRequestBtnTittle: {
    flex: 4,
    fontSize: 16,
    alignSelf: "center"
  },
  showRequestBtn: {
    backgroundColor: "#443099",
    borderRadius: 30,
    width: "90%",
    justifyContent: "flex-start",
    marginLeft: 20
  },
  showRequestBtnContainer: {
    borderWidth: 1,
    borderColor: "#d6d6e8",
    alignItems: "center",
    alignSelf: "center",
    width: "85%",
    backgroundColor: "#443099",
    marginTop: 5,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    justifyContent: "center"
  },
  /* Edit Accommodation */
  editAccommodationDate1: {
    marginTop: 5,
    alignSelf: "flex-start",
    fontSize: 17
  },
  editAccommodationDate2: {
    marginBottom: 10,
    alignSelf: "flex-start",
    color: "#838899",
    marginLeft: 22
  },
  editAccommodationPrice1: {
    marginTop: 32,
    alignSelf: "center",
    fontSize: 17,
    marginBottom: 5
  },
  editAccommodationPrice2: {
    alignSelf: "center",
    color: "rgba(0,128,0,0.6)",
    fontSize: 16
  },
  editAccommodationColumn1: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5
  },
  editAccommodationColumn2: {
    flex: 1.8,
    alignItems: "center",
    marginHorizontal: 5,
    justifyContent: "space-between"
  },
  editAccommodationColumn3: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5
  },
  editAccommodationEditDate: {
    alignSelf: "center",
    fontSize: 19
  },
  editAccommodationEditPrize: {
    alignSelf: "center",
    fontSize: 19,
    marginTop: 65
  },
  editAccommodationEditPrize2: {
    alignSelf: "center",
    fontSize: 17
  },
  editAccommodationEditDateBtn: {
    backgroundColor: "#443099",
    borderRadius: 30,
    justifyContent: "flex-start",
    width: "80%",
    height: "80%",
    alignSelf: "center"
  },
  editAccommodationEditDateBtnContainer: {
    borderWidth: 1,
    borderColor: "#d6d6e8",
    alignSelf: "center",
    backgroundColor: "#443099",
    marginTop: 35,
    marginLeft: 20,
    marginBottom: 10,
    justifyContent: "center",
    width: 150,
    height: 45,
    marginRight: -60
  },
  editAccommodationEditDateTittle: {
    flex: 4,
    fontSize: 15,
    alignSelf: "center",
    marginLeft: 5
  },
  editAccommodationEditDateBtnContainer2: {
    borderWidth: 1,
    borderColor: "#d6d6e8",
    alignSelf: "center",
    backgroundColor: "#443099",
    marginTop: 35,
    marginLeft: -60,
    marginBottom: 10,
    justifyContent: "center",
    width: 150,
    height: 45,
    marginRight: 20
  },
  editAccommodationEditDateBtnContainer3: {
    borderWidth: 1,
    borderColor: "#d6d6e8",
    alignSelf: "center",
    backgroundColor: "rgba(0,128,0,0.6)",
    marginTop: 60,
    marginLeft: 20,
    marginBottom: 10,
    justifyContent: "center",
    width: 150,
    height: 45,
    marginRight: -60
  },
  editAccommodationEditDateBtn3: {
    backgroundColor: "rgba(0,128,0,0.6)",
    borderRadius: 30,
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    alignSelf: "center",
    marginVertical: 10
  },
  editAccommodationEditDateBtnContainer4: {
    borderWidth: 1,
    borderColor: "#d6d6e8",
    alignSelf: "center",
    backgroundColor: "rgba(255,0,0,0.6)",
    marginTop: 60,
    marginLeft: -60,
    marginBottom: 10,
    justifyContent: "center",
    width: 150,
    height: 45,
    marginRight: 20
  },
  editAccommodationEditDateBtn4: {
    backgroundColor: "rgba(255,0,0,0.6)",
    borderRadius: 30,
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    alignSelf: "center",
    marginVertical: 10
  },
  editAccommodationEditDateTittle2: {
    flex: 4,
    fontSize: 15,
    alignSelf: "center"
  },
  /* Add Dog */
  addDogTittle: {
    fontSize: 18,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10
  },
  addDogCnt1: {
    borderRadius: 5,
    borderColor: "#d6d6e8",
    borderWidth: 1,
    textAlign: "center",
    marginHorizontal: 20,
    paddingHorizontal: 20
  },
  addDogBtnContainer: {
    borderWidth: 1,
    borderColor: "#d6d6e8",
    alignSelf: "center",
    backgroundColor: "rgba(0,128,0,0.6)",
    marginTop: 30,
    marginBottom: 10,
    justifyContent: "center",
    width: "60%",
    height: 45
  },
  addDogBtn: {
    backgroundColor: "rgba(0,128,0,0.6)",
    borderRadius: 30,
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    alignSelf: "center",
    marginVertical: 10
  },
  addDogBtnTxt: {
    flex: 1,
    fontSize: 18,
    alignSelf: "center",
    marginRight: 10
  },
  /* Location */
  locationMapBtnContainerSave: {
    paddingRight: 5
  },
  locationMapBtnSave: {
    backgroundColor: "#00a680"
  },
  locationMapBtnContainerCancel: {
    paddingLeft: 5
  },
  locationMapBtnCancel: {
    backgroundColor: "#a60d0d"
  },
  locationViewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },
  locationMapStyle: {
    width: "100%",
    height: 550
  },
  locationInput: {
    marginBottom: 10
  },
  /* Create Accommodation*/
  createAccommodationBtnContainer: {
    borderWidth: 1,
    borderColor: "#d6d6e8",
    alignSelf: "center",
    backgroundColor: "rgba(0,128,0,0.6)",
    marginTop: 25,
    marginBottom: 10,
    justifyContent: "center",
    width: "100%",
    height: 45
  },
  createAccommodationBtn: {
    backgroundColor: "rgba(0,128,0,0.6)",
    borderRadius: 30,
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    alignSelf: "center",
    marginVertical: 10
  },
  createAccommodationBtnTxt: {
    flex: 1,
    fontSize: 18,
    alignSelf: "center",
    marginRight: 10
  },
  /* Notifications */
  notificationsFeed: {
    marginHorizontal: 16
  },
  safeNotificationsArea: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 5,
    marginBottom: 20
  },
  notificationsColumn1: {
    alignItems: "center",
    marginLeft: 20,
    flex: 1,
    justifyContent: "center"
  },
  notificationsColumn2: {
    flex: 2,
    alignItems: "flex-end",
    marginHorizontal: 5
  },
  notificationsNum: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
    alignSelf: "center"
  },
  /* Search Accomodations */
  searchAccommodationsColumn1: {
    alignItems: "center",
    marginRight: 20,
    flex: 2,
    justifyContent: "center"
  },
  searchAccommodationsColumn2: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5
  },
  notificationsDescription: {
    fontSize: 13,
    marginTop: 4,
    textAlign: "center"
  },
  /* Accommodation Request */
  accommodationDate: {
    alignSelf: "center",
    fontSize: 18,
    marginHorizontal: -60
  },
  accommodationDate2: {
    alignSelf: "center",
    fontSize: 16,
    marginTop: 60
  },
  accommodationDate3: {
    alignSelf: "center",
    color: "#838899",
    marginHorizontal: -60
  },
  accommodationPets: {
    alignSelf: "center",
    fontSize: 18,
    marginHorizontal: -70,
    marginTop: 10,
    marginBottom: 5
  },
  accommodationBtn: {
    backgroundColor: "rgba(0,128,0,0.6)",
    borderRadius: 30,
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    alignSelf: "center",
    marginVertical: 10
  },
  accommodationBtnCnt: {
    borderWidth: 1,
    borderColor: "#d6d6e8",
    alignSelf: "center",
    backgroundColor: "rgba(0,128,0,0.6)",
    marginTop: 30,
    marginBottom: 10,
    justifyContent: "center",
    width: 150,
    height: 45
  },
  accommodationSitter: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 5
  },
  accommodationSitter2: {
    color: "grey",
    textAlign: "center",
    fontSize: 16
  },
  accommodationSitter3: {
    color: "grey",
    textAlign: "center",
    fontSize: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 5,
    marginBottom: 10
  }
});
