import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import { db } from "../../population/config";
import { email } from "../../account/QueriesProfile";
import { ScrollView } from "react-native-gesture-handler";
import BlankView from "../BlankView";
import { fechaParseada } from "./../../utils/DateParser";

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
    <SafeAreaView>
      <ScrollView>

        {loginsRegistrados.length > 0 ? (
          <View>
            {loginsRegistrados.map((logdate, index) => (
              <View key={index}>
                <Text>{fechaParseada(logdate)}</Text>
              </View>
            ))}
          </View>
        ) : (
            <BlankView text={"No tiene logins"} />
          )}

      </ScrollView>
    </SafeAreaView>
  );
}
