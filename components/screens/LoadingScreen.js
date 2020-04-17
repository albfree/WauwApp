import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { db } from "../population/config.js";

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
        if (user) {
          let banned;
          db.ref("wauwers")
          .orderByChild("email")
          .equalTo(user.email)
          .once("child_added", (snap) => {
            banned = snap.val().isBanned;
            if(!banned){
              this.props.navigation.navigate("DashboardScreen");
            }else{
              this.props.navigation.navigate("BannedScreen");
            }
          });
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
