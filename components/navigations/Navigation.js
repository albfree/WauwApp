import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import HomeScreenStack from "./HomeStack";
import NotificationsScreenStack from "./NotificationsStack";
import ServicesScreenStacks from "./ServicesStacks";
import ProfileScreenStack from "./ProfileStack";
import ChatsScreenStack from "./ChatsStack";
import { db } from "../population/config";
import { email } from "../account/QueriesProfile";

const morado = "#443099";
const gris = "#6c7075";
const color = "rgba(0,128,0,0.6)";

let notf;
db.ref("wauwers")
  .orderByChild("email")
  .equalTo(email)
  .on("child_added", (snap) => {
    notf = snap.val().hasRequests;
  });

const Reload = () => {
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", (snap) => {
      notf = snap.val().hasRequests;
    });
  navigate("Notifications");
};

const NavigationStacks = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor, not }) => (
          <Icon
            type="material-community"
            name="home"
            size={31}
            color={tintColor}
          />
        ),
      }),
    },
    Chat: {
      screen: ChatsScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Chats",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="chat"
            size={31}
            color={tintColor}
          />
        ),
      }),
    },
    Services: {
      screen: ServicesScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Services",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="dog-service"
            size={31}
            color={tintColor}
          />
        ),
      }),
    },

    Notifications: {
      screen: NotificationsScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Notifications",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="bell"
            size={31}
            color={notf ? color : tintColor}
          />
        ),
      }),
    },

    Profile: {
      screen: ProfileScreenStack,
      navigationOptions: () => ({
        activeTintColor: color,
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="account"
            size={31}
            color={tintColor}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: "Home",
    order: ["Home", "Chat", "Services", "Notifications", "Profile"],
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      inactiveTintColor: gris,
      activeTintColor: morado,
      keyboardHidesTabBar: false,
    },
    lazy: "true",
  }
);

export default createAppContainer(NavigationStacks);
