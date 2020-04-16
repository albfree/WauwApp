import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import firebase from "firebase";
import UserGuest from "../../account/UserGuest";
import { Button, Icon } from "react-native-elements";
import LastLogged from "../../account/LastLogged";
import { globalStyles } from "../../styles/global";
import { withNavigation } from "react-navigation";
import { profileStyles } from "../../styles/profileStyle";
import { email } from "../../account/QueriesProfile";
import { db } from "../../population/config.js";

function Profile(props) {
  const { navigation } = props;

  var userInfo;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .once("child_added", (snap) => {
      userInfo = snap.val();
    });

  var requestWorker = [];

  // Better way to get some information from DB and send it to UserData
  db.ref("requests")
    .orderByChild("worker")
    .equalTo(userInfo.id)
    .once("value", (snap) => {
      //request = snap.val();
      snap.forEach((child) => {
        requestWorker.push(child);
      });
    });

  var requestOwner = [];

  // Better way to get some information from DB and send it to UserData
  db.ref("requests")
    .orderByChild("owner")
    .equalTo(userInfo.id)
    .once("value", (snap) => {
      //request = snap.val();
      snap.forEach((child) => {
        requestOwner.push(child);
      });
    });

  var pets = [];

  db.ref("pet/" + userInfo.id).on("value", (snap) => {
    snap.forEach((child) => {
      pets.push(child);
    });
  });

  var accommodations = [];

  db.ref("accommodation")
    .orderByChild("worker")
    .equalTo(userInfo.id)
    .once("value", (snap) => {
      snap.forEach((pretty) => {
        accommodations.push(pretty);
      });
    });

  const checkHasLocation = () => {
    let ck;
    let newOwner;
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .on("child_added", (snap) => {
        newOwner = snap.val();
      });

    if (newOwner.hasOwnProperty("location")) {
      navigation.navigate("ProfileWalkerForm");
    } else {
      Alert.alert(
        "¡NO TIENES LOCALIZACIÓN INTRODUCIDA!",
        "Para poder disfrutar de nuestros servicios debe introducir su localización en el perfil"
      );
    }
  };

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <TouchableOpacity
        style={globalStyles.drawerMenuView}
        onPress={navigation.openDrawer}
      >
        <View>
          <View style={globalStyles.drawerTitle}>
            <Text style={globalStyles.drawerTxt}>Mi Perfil</Text>
          </View>
          <View style={globalStyles.drawerIcon}>
            <FontAwesome name="bars" size={24} color="#161924" />
          </View>
        </View>
      </TouchableOpacity>
      <ScrollView scrollEventThrottle={16}>
        <View style={profileStyles.profileView}>
          <UserGuest />
        </View>
        <View style={profileStyles.profileView2}>
          <Button
            buttonStyle={profileStyles.profileBtn3}
            containerStyle={profileStyles.profileBtnContainer3}
            title="Cambiar mi Localización"
            onPress={() => navigation.navigate("ProfileLocationForm")}
            icon={
              <Icon
                type="material-community"
                name="map-marker"
                size={30}
                color="white"
                marginLeft={20}
              />
            }
            titleStyle={profileStyles.profileBtnTittle}
          />
          <Button
            buttonStyle={profileStyles.profileBtn3}
            containerStyle={profileStyles.profileBtnContainer3}
            title="Añadir un Perro"
            onPress={() => navigation.navigate("ProfileAddDogForm")}
            icon={
              <Icon
                type="material-community"
                name="dog"
                size={30}
                color="white"
                marginLeft={20}
              />
            }
            titleStyle={profileStyles.profileBtnTittle}
          />

          <Button
            buttonStyle={profileStyles.profileBtn3}
            containerStyle={profileStyles.profileBtnContainer3}
            title="Quiero ser Paseador"
            onPress={() => checkHasLocation()}
            icon={
              <Icon
                type="material-community"
                name="dog-service"
                size={30}
                color="white"
                marginLeft={20}
              />
            }
            titleStyle={profileStyles.profileBtnTittle}
          />

          <Button
            buttonStyle={profileStyles.profileBtn3}
            containerStyle={profileStyles.profileBtnContainer3}
            title="Ver información recopilada"
            onPress={() =>
              navigation.navigate("UserData", {
                userInfo: userInfo,
                requestWorker: requestWorker,
                pets: pets,
                requestOwner: requestOwner,
              })
            }
            icon={
              <Icon
                type="material-community"
                name="information-variant"
                size={30}
                color="white"
                marginLeft={20}
              />
            }
            titleStyle={profileStyles.profileBtnTittle}
          />

          <Image
            source={require("../../../assets/images/prints.png")}
            style={profileStyles.profilePrints}
          />
          <Button
            buttonStyle={profileStyles.profileBtn4}
            containerStyle={profileStyles.profileBtnContainer4}
            title="Panel de Administración"
            onPress={() => navigation.navigate("AdminPanel")}
            icon={
              <Icon
                type="material-community"
                name="cogs"
                size={30}
                color="white"
                marginLeft={20}
              />
            }
            titleStyle={profileStyles.profileBtnTittle}
          />
          <Button
            buttonStyle={profileStyles.profileBtn4}
            containerStyle={profileStyles.profileBtnContainer4}
            title="Cerrar sesión"
            onPress={() => firebase.auth().signOut()}
            icon={
              <Icon
                type="material-community"
                name="logout"
                size={30}
                color="white"
                marginLeft={20}
              />
            }
            titleStyle={profileStyles.profileBtnTittle}
          />
          <LastLogged />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withNavigation(Profile);
