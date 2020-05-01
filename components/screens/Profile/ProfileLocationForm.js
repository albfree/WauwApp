import React, { useState, useEffect } from "react";
import { View, Alert, SafeAreaView } from "react-native";
import { db } from "../../population/config";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView from "react-native-maps";
import Modal from "../../account/Modal";
import { globalStyles } from "../../styles/global";
import { locationStyles } from "../../styles/locationStyles";

export default function ProfileLocationForm(props) {
  const { navigation } = props;
  const { userInfo } = navigation.state.params;

  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationWauwer, setLocationWauwer] = useState(null);

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <FormAdd
        setIsVisibleMap={setIsVisibleMap}
        locationWauwer={locationWauwer}
        userInfo={userInfo}
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
  const { setIsVisibleMap, locationWauwer, userInfo, navigation } = props;

  const guardarLocation = () => {
    if (!locationWauwer) {
      Alert.alert(
        "No has añadido ubicación",
        "Por favor, marca una localización usando el botón Añadir ubicación."
      );
    } else {
      let location = {
        location: locationWauwer,
      };

      db.ref("wauwers/" + userInfo.id).update(location);
      Alert.alert(
        "Ubicación guardada",
        "Ahora puede acceder a todos nuestros servicios.",
        [{ text: "OK", onPress: () => navigation.navigate("ProfileDrawer") }],

        { cancelable: false }
      );
    }
  };

  return (
    <View style={locationStyles.locationView}>
      <View style={globalStyles.viewFlex1}>
        <Button
          title="Añadir ubicación"
          onPress={() => setIsVisibleMap(true)}
          containerStyle={locationStyles.locationBtnContainer}
          buttonStyle={locationStyles.locationBtn}
          icon={
            <Icon
              type="material-community"
              name="pencil"
              size={25}
              color="white"
              marginLeft={"10%"}
            />
          }
          titleStyle={locationStyles.locationBtnTxt}
        />

        <Button
          buttonStyle={locationStyles.locationBtn}
          containerStyle={locationStyles.locationBtnContainer}
          title="Guardar ubicación"
          onPress={guardarLocation}
          icon={
            <Icon
              type="material-community"
              name="content-save"
              size={25}
              color="white"
              marginLeft={"10%"}
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
    Alert.alert(
      "Localización marcada",
      "Se ha agregado correctamente la ubicación seleccionada, guárdala para confirmar."
    );
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
            title="Cancelar"
            onPress={() => setIsVisibleMap(false)}
            containerStyle={locationStyles.locationMapBtnContainerCancel}
            buttonStyle={locationStyles.locationMapBtnCancel}
          />
          <Button
            title="Guardar"
            onPress={confirmLocation}
            containerStyle={locationStyles.locationMapBtnContainerSave}
            buttonStyle={locationStyles.locationMapBtnSave}
          />
        </View>
      </View>
    </Modal>
  );
}
