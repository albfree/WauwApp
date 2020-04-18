import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { db } from "../../population/config";
import { email } from "../../account/QueriesProfile";
import BlankView from "../BlankView";
import { fechaParseada } from "./../../utils/DateParser";
import { profileStyles } from "../../styles/profileStyle";
import { globalStyles } from "../../styles/global";
import { userDataStyles } from "../../styles/userDataStyle";

export default function LastConexion(props) {
  const { navigation } = props;
  const [loginsRegistrados, setLoginsRegistrados] = useState([]);

  useEffect(() => {
    let wauwer;
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .on("child_added", (snap) => {
        wauwer = snap.val();
      });
    let i = 0;
    let logins1 = [];
    db.ref("logins")
      .orderByChild("user")
      .equalTo(wauwer.userId)
      .on("child_added", function (snap) {
        logins1.push(snap.val().fecha);
      });
    logins1.reverse();
    let aux = [];
    let tope;
    if (logins1.length > 10) {
      tope = 10;
    } else {
      tope = logins1.length;
    }
    for (let i = 0; i < tope; i++) {
      aux.push(logins1[i]);
    }

    setLoginsRegistrados(aux);
  }, []);

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <TouchableOpacity
        style={globalStyles.drawerMenuView}
        onPress={navigation.openDrawer}
      >
        <View>
          <View style={globalStyles.drawerTitle}>
            <Text style={globalStyles.drawerTxt}>Últimas Conexiones</Text>
          </View>
          <View style={globalStyles.drawerIcon}>
            <FontAwesome name="bars" size={24} color="#161924" />
          </View>
        </View>
      </TouchableOpacity>
      <ScrollView>
        <View style={globalStyles.blankView5}>
          <Image
            source={require("../../../assets/images/PoliceDog.jpg")}
            style={globalStyles.blankImage3}
          />
          <View style={userDataStyles.userDataView}>
            {loginsRegistrados.length > 0 ? (
              <View>
                {loginsRegistrados.map((logdate, index) => (
                  <View key={index}>
                    <Text style={userDataStyles.userDataTxt}>
                      {fechaParseada(logdate)}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <BlankView text={"No tiene últimas conexiones registradas"} />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
