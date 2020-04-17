import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator,Image, Animated } from "react-native";
import paw from "../../assets/images/paw.png";

//We're going to create a function that will tell us if the user is logged or not.
//in case he's already logged in, we will redirect him to dashboardScreen
//else -> loginScreen
import firebase from "firebase";

class LoginScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = async () => {
    firebase.auth().onAuthStateChanged(
      function(user) {
       // console.log("AUTH STATE CHANGE CALLED");
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
         <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#443099",
  },

  aboutImage: {
    resizeMode: "contain",
    width: 30,
  }

});
