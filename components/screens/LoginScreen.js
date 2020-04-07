import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import firebase from "firebase";
import { db } from "../population/config";
import { Button } from "react-native-elements";
import * as Google from "expo-google-app-auth";
import { Icon } from "react-native-elements";
import _ from "lodash";
import { loginStyles } from "../styles/loginStyle";

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
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = (googleUser) => {
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
              if (result.additionalUserInfo.isNewUser) {
                let idWauwer = db.ref().child("wauwers").push().key;

                query = db.ref().child("wauwers/" + idWauwer);
                query.set({
                  id: idWauwer,
                  name: result.additionalUserInfo.profile.given_name,
                  surname: result.additionalUserInfo.profile.family_name,
                  photo: result.additionalUserInfo.profile.picture,
                  email: result.user.email,
                  wauwPoints: 0,
                  petNumber: 0,
                  price: 5,
                  petNumberSitter: 0,
                  petNumberWalk: 0,
                  homeDescription: "",
                  avgScore: 0,
                  walkSalary: 0,
                  isWalker: false,
                  isSitter: false,
                  location: null,
                });
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now(),
                  });
              } else {
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .update({
                    last_logged_in: Date.now(),
                  });
              }
            })
            .catch(function (error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              var email = error.email;
              var credential = error.credential;
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
          "191130769894-9h9fm6gvurfb5l20grk9jirf4svn1n3s.apps.googleusercontent.com",
        androidClientId:
          "191130769894-jebp8hq5kp341r7nagcs33667quenvl9.apps.googleusercontent.com",
        scopes: ["profile", "email"],
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
      <View style={loginStyles.loginView}>
        <Text style={loginStyles.loginTxt}>WAUW</Text>
        <Image
          source={require("../../assets/images/logo.png")}
          style={loginStyles.loginImage}
        />
        <Image
          source={require("../../assets/images/prints.png")}
          style={loginStyles.loginPrints}
        />
        <Button
          buttonStyle={loginStyles.loginBtn}
          containerStyle={loginStyles.loginBtnContainer}
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
          titleStyle={loginStyles.loginBtnTittle}
        />
      </View>
    );
  }
}
