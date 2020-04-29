import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Dimensions,
} from "react-native";

import { withNavigation } from "react-navigation";
import { globalStyles } from "../styles/global";
import _ from "lodash";
import { servicesStyles } from "../styles/servicesStyle";
import { email } from "../account/QueriesProfile";
import { db } from "../population/config.js";
import { bannedAssertion } from "../account/bannedAssertion";

function Services(props) {
  bannedAssertion();
  const { navigation } = props;
  const [imageUri, setImageUri] = useState(
    require("../../assets/images/SearchWalk.jpg")
  );
  const [tittle, setTittle] = useState("Buscar Paseador");
  const [description, setDescription] = useState(
    "Encuentra a los usuarios disponibles para pasear a tu perro"
  );
  const [petNumber, setPetNumber] = useState();

  useEffect(() => {}, [imageUri]);

  const changeToWalk = () => {
    setImageUri(require("../../assets/images/SearchWalk.jpg"));
    setTittle("Buscar Paseador");
    setDescription(
      "Encuentra a los usuarios disponibles para pasear a tu perro"
    );
  };

  const changeToAccS = () => {
    setImageUri(require("../../assets/images/SearchAccommodation.jpg"));
    setTittle("Buscar Alojamiento");
    setDescription("Encuentra los alojamientos disponibles para tu perro");
  };

  const changeToAccC = () => {
    setImageUri(require("../../assets/images/CreateAccommodation.jpg"));
    setTittle("Crear Alojamiento");
    setDescription(
      "Crea tus propios alojamientos para los perros de los demás usuarios"
    );
  };
  let newOwner;
  let pets = [];
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .once("child_added", (snap) => {
      newOwner = snap.val();
    });
  db.ref("pet/" + newOwner.id).on("value", (snap) => {
    let myPets = [];
    snap.forEach((child) => {
      myPets.push(child.val());
    });
    pets = myPets;
  });

  const checkHasLocation = () => {
    let ck;

    if (newOwner.hasOwnProperty("location")) {
      ck = true;
    } else {
      ck = false;
    }
    return ck;
  };

  const checkHasPets = () => {
    let cp;
    if (pets.length > 0) {
      cp = true;
    } else {
      cp = false;
    }
    return cp;
  };

  const check = () => {
    if (checkHasLocation()) {
      if (tittle === "Crear Alojamiento") {
        navigation.navigate("CreateAccommodation");
      } else {
        if (checkHasPets()) {
          if (tittle === "Buscar Paseador") {
            navigation.navigate("FormFilterByAvailability");
          } else if (tittle === "Buscar Alojamiento") {
            navigation.navigate("FormFilterByDate");
          }
        } else {
          Alert.alert(
            "No ha añadido mascotas",
            "Para poder disfrutar de nuestros servicios debe introducir la información sobre su mascota en el perfil."
          );
          navigation.navigate("Profile");
        }
      }
    } else {
      if (checkHasPets()) {
        Alert.alert(
          "No tiene añadida su localización",
          "Debe introducir su localización en el perfil para así ofrecerle los Wauwer más cercanos."
        );
      } else {
        Alert.alert(
          "No ha completado su información",
          "Para poder disfrutar de nuestros servicios debe introducir la información sobre su mascota en el perfil, además de su localización para ofrecerle los Wauwer mas cercanos."
        );
      }
      navigation.navigate("Profile");
    }
  };

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView scrollEventThrottle={16}>
        <View style={servicesStyles.servicesView}>
          <Text style={servicesStyles.servicesTxt}>
            ¿A qué servicio desea acceder?
          </Text>

          <View style={servicesStyles.servicesView2}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                style={servicesStyles.servicesView3}
                onPress={changeToWalk}
              >
                <View style={globalStyles.viewFlex2}>
                  <Image
                    source={require("../../assets/images/SearchWalk.jpg")}
                    style={servicesStyles.servicesImage}
                  />
                </View>
                <View style={globalStyles.servicesView4}>
                  <Text style={servicesStyles.servicesTxt3}>
                    Buscar Paseador
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={servicesStyles.servicesView3}
                onPress={changeToAccS}
              >
                <View style={globalStyles.viewFlex2}>
                  <Image
                    source={require("../../assets/images/SearchAccommodation.jpg")}
                    style={servicesStyles.servicesImage}
                  />
                </View>
                <View style={globalStyles.servicesView4}>
                  <Text style={servicesStyles.servicesTxt3}>
                    Buscar Alojamiento
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={servicesStyles.servicesView3}
                onPress={changeToAccC}
              >
                <View style={globalStyles.viewFlex2}>
                  <Image
                    source={require("../../assets/images/CreateAccommodation.jpg")}
                    style={servicesStyles.servicesImage}
                  />
                </View>
                <View style={globalStyles.servicesView4}>
                  <Text style={servicesStyles.servicesTxt3}>
                    Crear Alojamiento
                  </Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View style={servicesStyles.servicesView5}>
            <Text style={servicesStyles.servicesTxt}> {tittle}</Text>
            <Text style={servicesStyles.servicesTxt2}>{description}</Text>
            <TouchableOpacity
              style={servicesStyles.servicesView6}
              onPress={check}
            >
              <Image source={imageUri} style={servicesStyles.servicesImage2} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withNavigation(Services);
