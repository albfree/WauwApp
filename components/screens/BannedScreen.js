import React from "react";
import { Text, View, Image, Linking} from "react-native";

export default function BannedScreen() {
  const celeste = "#33AAFF";
  return (
    <View>
      <Image
        style={{width: 150, height: 150}}
        source={require("../../assets/images/blocked.png")}
      />
      <Text>Cuenta bloqueada {/* Título */}</Text>

      
      <Text>{/* Párrafo */}
      Su cuenta ha sido bloqueada por incumplir nuestras 
      normas básicas de de conducta. Si piensa que se trata de
      un error, o bien, desea obtener más información (cuál es 
      el motivo del bloqueo, si se trata de una suspensión
      temporal o un bloqueo total, etc), contacte por correo 
      electrónico con 
        <Text
          style={{color: celeste}}
          onPress={() => {
            Linking.openURL("mailto:wauwispp1920@gmail.com");
          }}>
        {" wauwispp1920@gmail.com"}
        </Text>
      .
      </Text> 
    </View>
  );
}

