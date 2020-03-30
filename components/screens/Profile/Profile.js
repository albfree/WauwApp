import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import firebase from "firebase";
import UserGuest from "../../account/UserGuest";
import { Button, Icon } from "react-native-elements";
import { YellowBox } from "react-native";
import _ from "lodash";
import { globalStyles } from "../../styles/global";
import { withNavigation } from "react-navigation";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

function Profile(props) {
  const { navigation } = props;

  return (
    <SafeAreaView style={globalStyles.safeProfileArea}>
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
        <View>
          <View style={globalStyles.profileView}>
            <UserGuest />
          </View>
          <View style={globalStyles.profileView2}>
            <Button
              buttonStyle={globalStyles.profileBtn}
              containerStyle={globalStyles.profileBtnContainer}
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
              titleStyle={globalStyles.profileBtnTittle}
            />
            <Button
              buttonStyle={globalStyles.profileBtn}
              containerStyle={globalStyles.profileBtnContainer}
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
              titleStyle={globalStyles.profileBtnTittle}
            />

            <Button
              buttonStyle={globalStyles.profileBtn}
              containerStyle={globalStyles.profileBtnContainer}
              title="Quiero ser Paseador"
              onPress={() => navigation.navigate("ProfileWalkerForm")}
              icon={
                <Icon
                  type="material-community"
                  name="dog-service"
                  size={30}
                  color="white"
                  marginLeft={20}
                />
              }
              titleStyle={globalStyles.profileBtnTittle}
            />
            <Image
              source={require("../../../assets/images/prints.png")}
              style={globalStyles.profilePrints}
            />

            <Button
              buttonStyle={globalStyles.profileSignOut}
              containerStyle={globalStyles.profileSignOutContainer}
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
              titleStyle={globalStyles.profileBtnTittle}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withNavigation(Profile);
