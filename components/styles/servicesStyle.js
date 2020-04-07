import { StyleSheet } from "react-native";

const gris = "#dddddd";

export const servicesStyles = StyleSheet.create({
  servicesImage: {
    flex: 1,
    height: null,
    resizeMode: "cover",
    width: null,
  },
  servicesImage2: {
    borderColor: gris,
    borderRadius: 5,
    borderWidth: 1,
    flex: 1,
    height: null,
    resizeMode: "cover",
    width: null,
  },
  servicesTxt: {
    fontSize: 22,
    fontWeight: "700",
    paddingHorizontal: 20,
    textAlign: "center",
  },
  servicesTxt2: {
    fontWeight: "100",
    marginTop: 10,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  servicesTxt3: {
    textAlign: "center",
  },
  servicesView: {
    flex: 1,
    paddingTop: 20,
  },
  servicesView2: {
    borderColor: gris,
    borderWidth: 0.5,
    height: 130,
    marginTop: 20,
  },
  servicesView3: {
    height: 130,
    marginLeft: 20,
    width: 130,
  },
  servicesView4: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
  },
  servicesView5: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  servicesView6: {
    height: 200,
    marginTop: 20,
    width: "100%",
  },
});
