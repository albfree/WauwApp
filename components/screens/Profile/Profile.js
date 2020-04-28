import React, { useState, useEffect } from "react";
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
import { decode, encode } from "base-64";

import { profileStyles } from "../../styles/profileStyle";
import { email } from "../../account/QueriesProfile";
import { db } from "../../population/config.js";
import { bannedAssertion } from "../../account/bannedAssertion";
import { popUp } from "../../account/popUp";
function Profile(props) {
  if (!global.btoa) {
    global.btoa = encode;
  }

  if (!global.atob) {
    global.atob = decode;
  }
  const { navigation } = props;
  const currentUser = bannedAssertion();
  const [userInfo, setUserInfo] = useState(currentUser);
  const [loading, setLoading] = useState(true);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    popUp();
    const user = bannedAssertion();
    setUserInfo(user);
    setReloadData(false);
    setLoading(false);
  }, [reloadData]);
  

  const checkHasLocation = (userInfo) => {
    if (userInfo.hasOwnProperty("location")) {
      navigation.navigate("ProfileWalkerForm");
    } else {
      Alert.alert(
        "No tienes ubicación añadida",
        "Para poder disfrutar de nuestros servicios debe introducir su ubicación en el perfil."
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
            onPress={() => checkHasLocation(userInfo)}
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
            onPress={() => navigation.navigate("UserData")}
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

          <View>
            {userInfo.email === "wauwispp1920@gmail.com" ? (
              <View>
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
              </View>
            ) : (
              <View></View>
            )}
          </View>
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
