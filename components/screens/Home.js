import React, {useEffect, useState} from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { globalStyles } from "../styles/global";
import { homeStyles } from "../styles/homeStyle";
import _ from "lodash";
import { bannedAssertion } from "../account/bannedAssertion";
import { db } from "../population/config";
import firebase from "firebase";
import { email } from "../account/QueriesProfile";
import { popUp } from "../account/popUp";

function Home(props) {
  const { navigation } = props;

  const [loading, setLoading] = useState(true);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    bannedAssertion();
    popUp();
    setReloadData(false);
    setLoading(false);
  }, [reloadData]);

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView scrollEventThrottle={16}>
        <View style={homeStyles.homeView}>
          <Text style={homeStyles.homeTxt}>Bienvenido a Wauw</Text>
          <Text style={homeStyles.homeTxt2}>
            Wauw no es únicamente una aplicación, Wauw es la forma más sencilla
            de ayudar a las protectoras de animales de tu ciudad. ¡Con cada
            transacción dentro de la aplicación estarás donando a las
            protectoras y muchos pequeñajos te lo agradecerán!
          </Text>

          <View style={homeStyles.homeView2}>
            <Image
              style={homeStyles.homeImage}
              source={require("../../assets/images/dog.jpg")}
            />
          </View>

          <View style={homeStyles.homeView2}>
            <Text style={homeStyles.homeTxt}>Conoce a las protectoras</Text>
            <Text style={homeStyles.homeTxt2}>
              ¿Quieres saber con qué protectoras colaboramos? Te dejamos aquí
              toda la información disponible.
            </Text>

            <Button
              buttonStyle={homeStyles.homeBtn}
              containerStyle={homeStyles.homeBtnContainer}
              title="Protectoras"
              onPress={() => navigation.navigate("AnimalShelters")}
              icon={
                <Icon
                  type="material-community"
                  name="shield-home"
                  size={30}
                  color="white"
                  marginLeft={"10%"}
                />
              }
              titleStyle={homeStyles.homeBtnTxt}
            />

            <Button
              buttonStyle={homeStyles.homeBtn}
              containerStyle={homeStyles.homeBtnContainer2}
              title="Noticias"
              onPress={() => navigation.navigate("News")}
              icon={
                <Icon
                  type="material-community"
                  name="bulletin-board"
                  size={30}
                  color="white"
                  marginLeft={"10%"}
                />
              }
              titleStyle={homeStyles.homeBtnTxt}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withNavigation(Home);
