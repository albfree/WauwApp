import * as Font from "expo-font";
import { StyleSheet, Text, View } from 'react-native'; 
import {  createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './components/screens/LoginScreen';
import DashboardScreen from './components/screens/DashboardScreen';
import LoadingScreen from './components/screens/LoadingScreen';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import { AppLoading } from "expo";
import React, { useState, Component } from "react";

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default class App extends Component {

  render(){
    return <AppNavigator/>

  }
}

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});