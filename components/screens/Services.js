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
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { globalStyles } from "../styles/global";
import _ from "lodash";
import { servicesStyles } from "../styles/servicesStyle";
import { email } from "../account/QueriesProfile";
import { db } from "../population/config.js";

function Services(props) {
  const { navigation } = props;
  const [imageUri, setImageUri] = useState(
    require("../../assets/images/SearchWalk.jpg")
  );
  const [tittle, setTittle] = useState("Buscar Paseador");
  const [description, setDescription] = useState(
    "Encuentra a los usuarios disponibles para pasear a tu perro"
  );

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
      ck = true;
    } else {
      ck = false;
    }
    return ck;
  };

  const check = () => {
    if (checkHasLocation()) {
      if (tittle === "Buscar Paseador") {
        navigation.navigate("FormFilterByAvailability");
      } else if (tittle === "Buscar Alojamiento") {
        navigation.navigate("FormFilterByDate");
      } else {
        navigation.navigate("CreateAccommodation");
      }
    } else {
      Alert.alert(
        "¡NO TIENES LOCALIZACIÓN INTRODUCIDA!",
        "Para poder disfrutar de nuestros servicios debe introducir su localización en el perfil"
      );
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
