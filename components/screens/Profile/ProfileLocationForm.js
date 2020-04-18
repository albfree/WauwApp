import React, { useState, useEffect } from "react";
import { View, Alert, SafeAreaView } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { email } from "../../account/QueriesProfile";
import { db } from "../../population/config";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView from "react-native-maps";
import Modal from "../../account/Modal";
import { globalStyles } from "../../styles/global";
import { locationStyles } from "../../styles/locationStyles";
import { BannedAssertion } from "../../account/BannedAssertion";

export default function ProfileLocationForm(props) {
  const { navigation } = props;
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationWauwer, setLocationWauwer] = useState(null);
  const [error, setError] = useState(null);
  const [wauwer, setWauwer] = useState();
  
  useEffect(() => {
    var wauwer = BannedAssertion();
    setWauwer(wauwer);
  }, []);

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <FormAdd
        setIsVisibleMap={setIsVisibleMap}
        locationWauwer={locationWauwer}
        wauwer={wauwer}
        navigation={navigation}
      />
      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationWauwer={setLocationWauwer}
      />
    </SafeAreaView>
  );
}

function FormAdd(props) {
  const {
    setIsVisibleMap,
    locationWauwer,
    wauwer,
    navigation,
  } = props;

  const guardarLocation = () => {
    if (!locationWauwer) {
      Alert.alert(
        "Por favor, marca una localización usando el botón Editar Ubicación"
      );
    } else {
      let location = {
        location: locationWauwer,
      };

      db.ref("wauwers/" + wauwer.id).update(location);
      Alert.alert(
        "Editado",
        "Editado correctamente",
        [{ text: "Vale", onPress: () => navigation.navigate("ProfileDrawer") }],

        { cancelable: false }
      );
    }
  };

  return (
    <View style={locationStyles.locationView}>
      <View style={globalStyles.viewFlex1}>

      <Button
            title="Editar Ubicación"
            onPress={() => setIsVisibleMap(true)}
            containerStyle={locationStyles.locationBtnContainer}
            buttonStyle={locationStyles.locationBtn}
          />

        <Button
          buttonStyle={locationStyles.locationBtn}
          containerStyle={locationStyles.locationBtnContainer}
          title="Guardar Ubicación"
          onPress={guardarLocation}
          icon={
            <Icon
              type="material-community"
              name="content-save"
              size={25}
              color="white"
              marginLeft={30}
            />
          }
          titleStyle={locationStyles.locationBtnTxt}
        />
      </View>
    </View>
  );
}

function Map(props) {
  const { isVisibleMap, setIsVisibleMap, setLocationWauwer } = props;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const resultPermissions = await Permissions.askAsync(
        Permissions.LOCATION
      );
      const statusPermissions = resultPermissions.permissions.location.status;

      if (statusPermissions !== "granted") {
        setError("No tienes activado el permiso de localización.");
      } else {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
      }
    })();
  }, []);

  const confirmLocation = () => {
    setLocationWauwer(location);
    Alert.alert("Localización marcada");
    setIsVisibleMap(false);
  };

  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>
        {location && (
          <MapView
            style={locationStyles.locationMapStyle}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={(region) => setLocation(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              draggable
            />
          </MapView>
        )}
        <View style={locationStyles.locationViewMapBtn}>
          <Button
            title="Guardar Ubicacion"
            onPress={confirmLocation}
            containerStyle={locationStyles.locationMapBtnContainerSave}
            buttonStyle={locationStyles.locationMapBtnSave}
          />
          <Button
            title="Cancelar Ubicación"
            onPress={() => setIsVisibleMap(false)}
            containerStyle={locationStyles.locationMapBtnContainerCancel}
            buttonStyle={locationStyles.locationMapBtnCancel}
          />
        </View>
      </View>
    </Modal>
  );
}
