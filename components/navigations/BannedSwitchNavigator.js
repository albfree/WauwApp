import { createSwitchNavigator, createAppContainer } from "react-navigation";
import BannedScreen from "../screens/BannedScreen";

import React, { useState, Component } from "react";


export default class App extends Component {

  render(){
    return <AppNavigator/>

  }
}

const AppSwitchNavigator = createSwitchNavigator({
  Blocked:BannedScreen,
})

const AppNavigator = createAppContainer(AppSwitchNavigator);
