import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  Button
} from "react-native";
import { globalStyles } from "../../styles/global";
import { aboutStyles } from "../../styles/aboutStyle";
import { FontAwesome } from "@expo/vector-icons";

export default function Feedback(props) {
  const { navigation } = props;

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <TouchableOpacity
        style={globalStyles.drawerMenuView}
        onPress={navigation.openDrawer}
      >
        <View>
          <View style={globalStyles.drawerTitle}>
            <Text style={globalStyles.drawerTxt}>Feedback</Text>
          </View>
          <View style={globalStyles.drawerIcon}>
            <FontAwesome name="bars" size={24} color="#161924" />
          </View>
        </View>
      </TouchableOpacity>

      <ScrollView scrollEventThrottle={16}>
        <Image
          style={aboutStyles.aboutImage}
          source={require("../../../assets/images/feedback.jpg")}
        />

        <Text style={aboutStyles.aboutTxt}>Tu opinión nos importa.</Text>

        <Text style={aboutStyles.aboutTxt2}>
          En Wauw perseguimos el bienestar de todos los usuarios. Por ello, disponemos
          de un servicio de Feedback en el que puedes darnos tu opinión. Ayúdanos a mejorar
          enviando un correo a nuestra cuenta de mensajería electrónica. Indica todos los
          detalles (opinión, aspectos a mejorar, cosas que te gustan, cosas que cambiarías...).
          {"\n"}
          {"\n"}
          Cualquier detalle, por muy pequeño que sea, puede ser de gran utilidad para progresar.
          ¡Te lo agradeceremos!
        </Text>

        <Button
        title="Enviar feedback"
        onPress={() => {
          Linking.openURL("mailto:wauwispp1920@gmail.com");
        }}/>

        <Text>
          {"\n"}
          {"\n"}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
