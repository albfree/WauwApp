import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { white } from "color-name";
import { globalStyles } from "../styles/global";
import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

function Home(props) {
  const { navigation } = props;
  const { height, width } = Dimensions.get("window");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView scrollEventThrottle={16}>
        <View style={globalStyles.homeView}>
          <Text style={globalStyles.homeTitle}>
            ¿Conoces nuestros servicios?
          </Text>
          <Text style={globalStyles.homeContentText}>
            Wauw no es únicamente una aplicación, Wauw es la forma más sencilla
            de ayudar a las protectoras de animales de tu ciudad. ¡Con cada
            transacción dentro de la aplicación estarás donando a las
            protectoras y muchos pequeñajos te lo agradecerán!
          </Text>

          <View style={globalStyles.homeView2}>
            <Image
              style={globalStyles.homeImage}
              source={require("../../assets/images/dog.jpg")}
            />
          </View>

          <View style={globalStyles.homeView2}>
            <Text style={globalStyles.homeTitle}>Conoce a las protectoras</Text>
            <Text style={globalStyles.homeContentText}>
              ¿Quieres saber con qué protectoras colaboramos? Te dejamos aquí
              toda la información disponible.
            </Text>

            <View style={globalStyles.homeView2}>
              <Button
                buttonStyle={globalStyles.profileBtn}
                containerStyle={globalStyles.profileBtnContainer}
                title="Protectoras"
                onPress={() => navigation.navigate("AnimalShelters")}
                icon={
                  <Icon
                    type="material-community"
                    name="shield-home"
                    size={30}
                    color="white"
                    marginLeft={20}
                  />
                }
                titleStyle={globalStyles.profileBtnTittle}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withNavigation(Home);
