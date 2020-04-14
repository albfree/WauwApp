import React,   { useState, useEffect } from "react";
import { StyleSheet, View, Alert, Text,SafeAreaView,FlatList } from "react-native";
import { db } from "../../population/config";
import { email } from "../../account/QueriesProfile";
//import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import BlankView from "../BlankView";
import Loading from "../../../components/Loading";

export default function LastConexion() {
  const [logins, setLogins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadData, setReloadData] = useState(false);
 
  
  let idUserUid;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", (snap) => {
      idUserUid = snap.val().userId;
    });

//nconsole.log(idUserUid);

  useEffect(() => {
    db.ref("logins")
      .orderByChild("user")
      .equalTo(idUserUid)
      .on("value" , (snap) => {
        const logins1 = [];
        snap.forEach((child) => {
          logins1.push(child.val());
        });
       // console.log(logins1);
        setLogins(logins1);
      });
      setReloadData(false);
      setIsLoading(false);
  }, [reloadData]);

  //console.log(logins);

  return (
    <SafeAreaView>
      <ScrollView>
        {logins.length>0 ? (
          console.log("Dentro de la lista"),
          console.log(logins),
          <FlatList 
          data = {logins}
          renderItem = {(loginItem) => (
            <View>
              <Text>{loginItem.fecha}</Text>
            </View>
          )
          }
          />
        ) : (
          <BlankView text={"No tiene logins"} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
