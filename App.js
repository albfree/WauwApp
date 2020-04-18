import * as Font from "expo-font";
import { StyleSheet, Text, View } from "react-native"; 
import {  createAppContainer, createSwitchNavigator } from "react-navigation";
import LoginScreen from "./components/navigations/LoginStack";
import DashboardScreen from "./components/screens/DashboardScreen";
import LoadingScreen from "./components/screens/LoadingScreen";
import BannedScreen from "./components/screens/BannedScreen";
import { AppLoading } from "expo";
import React, { useState, Component } from "react";


export default class App extends Component {

  render(){
    return <AppNavigator/>

  }
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen:LoadingScreen,
  LoginScreen:LoginScreen,
  BannedScreen:BannedScreen,
  DashboardScreen:DashboardScreen
})

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});