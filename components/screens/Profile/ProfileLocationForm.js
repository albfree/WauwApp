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

export default function ProfileLocationForm(props) {
  const { navigation } = props;
  //Dirección postal
  const [wauwerAddress, setWauwerAddress] = useState("");
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationWauwer, setLocationWauwer] = useState(null);
  const [error, setError] = useState(null);
  const [wauwer, setWauwer] = useState();

  useEffect(() => {
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .on("value", function(snap) {
        snap.forEach(function(child) {
          setWauwer(child.val());
        });
      });
  }, []);

  return (
    <SafeAreaView style={globalStyles.safeShowRequestArea}>
      <FormAdd
        setWauwerAddress={setWauwerAddress}
        setIsVisibleMap={setIsVisibleMap}
        locationWauwer={locationWauwer}
        wauwer={wauwer}
        wauwerAddress={wauwerAddress}
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
    setWauwerAddress,
    setIsVisibleMap,
    locationWauwer,
    wauwer,
    wauwerAddress,
    navigation
  } = props;

  const guardarLocation = () => {
    if (!locationWauwer || wauwerAddress == "") {
      Alert.alert(
        "Por favor, escribe una dirección y marca una localización usando el icono del mapa"
      );
    } else {
      let location = {
        location: locationWauwer
      };

      let add = {
        address: wauwerAddress
      };
      db.ref("wauwers/" + wauwer.id).update(location);
      db.ref("wauwers/" + wauwer.id).update(add);
      Alert.alert(
        "Editado",
        "Editado correctamente",
        [{ text: "Vale", onPress: () => navigation.navigate("ProfileDrawer") }],

        { cancelable: false }
      );
    }
  };

  return (
    <View style={globalStyles.showRequestFeed}>
      <View style={globalStyles.viewFlex1}>
        <View style={globalStyles.showRequestRow}>
          <View style={globalStyles.editAccommodationColumn3}>
            <Input
              placeholder="Dirección"
              containerStyle={globalStyles.locationImput}
              rightIcon={{
                type: "material-community",
                name: "google-maps",
                color: locationWauwer ? "#00a680" : "#c2c2c2",
                onPress: () => setIsVisibleMap(true)
              }}
              onChange={e => setWauwerAddress(e.nativeEvent.text)}

            />
            <Button
              buttonStyle={globalStyles.addDogBtn}
              containerStyle={globalStyles.addDogBtnContainer}
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
              titleStyle={globalStyles.addDogBtnTxt}
            />
          </View>
        </View>
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
          longitudeDelta: 0.001
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
            style={globalStyles.locationMapStyle}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={region => setLocation(region)}
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude
              }}
              draggable
            />
          </MapView>
        )}
        <View style={globalStyles.locationViewMapBtn}>
          <Button
            title="Guardar Ubicacion"
            onPress={confirmLocation}
            containerStyle={globalStyles.locationMapBtnContainerSave}
            buttonStyle={globalStyles.locationMapBtnSave}
          />
          <Button
            title="Cancelar Ubicación"
            onPress={() => setIsVisibleMap(false)}
            containerStyle={globalStyles.locationMapBtnContainerCancel}
            buttonStyle={globalStyles.locationMapBtnCancel}
          />
        </View>
      </View>
    </Modal>
  );
}

