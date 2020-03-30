import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

//We're going to create a function that will tell us if the user is logged or not.
//in case he's already logged in, we will redirect him to dashboardScreen
//else -> loginScreen
import firebase from "firebase";
import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};
class LoginScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = async () => {
    firebase.auth().onAuthStateChanged(
      function(user) {
        //console.log("AUTH STATE CHANGE CALLED");
        if (user) {
          this.props.navigation.navigate("DashboardScreen");
        } else {
          this.props.navigation.navigate("LoginScreen");
        }
      }.bind(this)
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
