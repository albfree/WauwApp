import React, { useState, useEffect, useRef } from "react";
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
import { globalStyles } from "../../styles/global";
import { userDataStyles } from "../../styles/userDataStyle";
import Toast from "react-native-easy-toast";

export default function LastConexion(props) {
  const { navigation } = props;
  const [loginsRegistrados, setLoginsRegistrados] = useState([]);
  const toastRef = useRef();

  let wauwer;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .once("child_added", (snap) => {
      wauwer = snap.val().userId;
    });

  useEffect(() => {
    let logins1 = [];
    let aux = [];
    db.ref("logins")
      .orderByChild("user")
      .equalTo(wauwer)
      .once("value", (snap) => {
        snap.forEach((child) => {
          logins1.push(child.val().fecha);
        });
      })
      .then(() => {
        logins1.reverse();
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
      })
      .catch(() => {
        toastRef.current.show("Error al recuperar sus datos");
      });
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
      <Toast ref={toastRef} position="center" opacity={0.7} />
    </SafeAreaView>
  );
}
