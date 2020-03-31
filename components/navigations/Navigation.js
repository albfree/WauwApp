import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import HomeScreenStack from "./HomeStack";
import NotificationsScreenStack from "./NotificationsStack";
import ServicesScreenStacks from "./ServicesStacks";
import ProfileScreenStack from "./ProfileStack";
import ChatsScreenStack from "./ChatsStack";
import { HeaderStyleInterpolators } from "react-navigation-stack";

const NavigationStacks = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="home"
            size={31}
            color={tintColor}
          />
        )
      })
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
        )
      })
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
        )
      })
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
            color={tintColor}
          />
        )
      })
    },
    Profile: {
      screen: ProfileScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="account"
            size={31}
            color={tintColor}
          />
        )
      })
    }
  },
  {
    initialRouteName: "Home",
    order: ["Home", "Chat", "Services", "Notifications", "Profile"],
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      inactiveTintColor: "#6c7075",
      activeTintColor: "#443099",
      keyboardHidesTabBar: false
    }
  }
);

export default createAppContainer(NavigationStacks);
