import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import firebase from "firebase";
import { db } from "../population/config";
import { Button } from "react-native-elements";
import * as Google from "expo-google-app-auth";
import { Icon } from "react-native-elements";
import { YellowBox } from "react-native";
import _ from "lodash";
import { globalStyles } from "../styles/global";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};
// const IOS_CLIENT_ID =
//   "your-ios-client-id";

export default class LoginScreen extends Component {
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = googleUser => {
    //console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function(result) {
              console.log("user signed in ");
              if (result.additionalUserInfo.isNewUser) {
                let idWauwer = db
                  .ref()
                  .child("wauwers")
                  .push().key;

                query = db.ref().child("wauwers/" + idWauwer);
                query.set({
                  //Person properties
                  id: idWauwer,
                  name: result.additionalUserInfo.profile.given_name,
                  surname: result.additionalUserInfo.profile.family_name,
                  photo: result.additionalUserInfo.profile.picture,
                  email: result.user.email,
                  //wauer properties
                  wauwPoints: 0,
                  //Número de mascotas que va a aceptar como máximo
                  petNumberSitter: 0,
                  petNumberWalk: 0,
                  homeDescription: "",
                  avgScore: 2.5,
                  walkSalary: 0,
                  isWalker: false,
                  isSitter: false,
                  location: null
                });
                console.log("Usuario añadido con éxito");

                //Google query added to get the user in case of database dump
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now()
                  }); /*

                  .then(function(snapshot) {
                    // console.log('Snapshot', snapshot);
                  });
                  */
              } else {
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  });
              }
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      }.bind(this)
    );
  };

  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          "785332619976-cs6m8a4l4m44772b4ib163luju77bvtn.apps.googleusercontent.com",
        androidClientId:
          "785332619976-255qeunsgbofgci9vk5ddtae3i8d9b41.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    return (
      <View style={globalStyles.loginView}>
        <Text style={globalStyles.loginTxt}>WAUW</Text>
        <Image
          source={require("../../assets/images/logo.png")}
          style={globalStyles.loginImage}
        />
        <Image
          source={require("../../assets/images/prints.png")}
          style={globalStyles.loginPrints}
        />
        <Button
          buttonStyle={globalStyles.loginBtn}
          containerStyle={globalStyles.loginBtnContainer}
          title="Entrar con Google"
          onPress={this.signInWithGoogle}
          icon={
            <Icon
              type="material-community"
              name="google"
              size={30}
              color="white"
              marginLeft={25}
            />
          }
          titleStyle={globalStyles.loginBtnTittle}
        />
      </View>
    );
  }
}
