import React from "react";
import {
  Text,
  View,
  Image,
  Linking,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { globalStyles } from "../styles/global";

export default function BannedScreen() {
  const celeste = "#33AAFF";
  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <View style={globalStyles.blankView5}>
        <Image
          style={globalStyles.blankImage4}
          source={require("../../assets/images/PoliceDog2.jpg")}
        />
        <Text style={globalStyles.adminTxt2}>
          Cuenta Bloqueada {/* Título */}
        </Text>

        <Text style={globalStyles.adminTxt3}>
          {/* Párrafo */}
          Su cuenta ha sido bloqueada por incumplir nuestras normas básicas de
          de conducta. Si piensa que se trata de un error, o bien, desea obtener
          más información (cuál es el motivo del bloqueo, si se trata de una
          suspensión temporal o un bloqueo total, etc), contacte por correo
          electrónico con
          <Text
            style={globalStyles.adminTxt4}
            onPress={() => {
              Linking.openURL("mailto:wauwispp1920@gmail.com");
            }}
          >
            {" wauwispp1920@gmail.com"}
          </Text>
          .
        </Text>
      </View>
    </SafeAreaView>
  );
}
