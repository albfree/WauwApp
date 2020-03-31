import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image
} from "react-native";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { Icon } from "react-native-elements";
import MyRequestsScreen from "../screens/Profile/ProfileMyRequests";
import MyDogsScreen from "../screens//Profile/ProfileMyDogs";
import MyAccommodationsScreen from "../screens/Profile/ProfileMyAccommodations";

import { globalStyles } from "../styles/global";
import ProfileScreen from "../screens/Profile/Profile";

const CustomDrawerComponent = props => (
  <SafeAreaView>
    <View style={globalStyles.drawerView}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={globalStyles.drawerImage}
      />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

export default createDrawerNavigator(
  {
    Profiles: {
      screen: ProfileScreen,
      navigationOptions: {
        drawerLabel: "Mi Perfil",
        drawerIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="account"
            size={17}
            color="#443099"
          />
        )
      }
    },
    MyRequests: {
      screen: MyRequestsScreen,
      navigationOptions: {
        drawerLabel: "Mis Solicitudes",
        drawerIcon: ({ tintColor }) => (
          <Icon
            type="font-awesome"
            name="hourglass-half"
            size={17}
            color="#443099"
          />
        )
      }
    },
    MyAccommodations: {
      screen: MyAccommodationsScreen,
      navigationOptions: {
        drawerLabel: "Mis Alojamientos",
        drawerIcon: ({ tintColor }) => (
          <Icon type="font-awesome" name="bed" size={17} color="#443099" />
        )
      }
    }

    /* MyDogs: {
      screen: MyDogsScreen,
      navigationOptions: {
        drawerLabel: "Mis Perros",
        drawerIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="dog"
            size={17}
            color="#443099"
          />
        )
      }
    } */
  },
  {
    drawerPosition: "right",
    contentComponent: CustomDrawerComponent
  }
);
