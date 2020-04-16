import React,   { useState, useEffect } from "react";
import { View, Text,SafeAreaView, FlatList } from "react-native";
import { db } from "../../population/config";
import { email } from "../../account/QueriesProfile";
//import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import BlankView from "../BlankView";
import Loading from "../../../components/Loading";
import { fechaParseada } from "./../../utils/DateParser";

export default function LastConexion(props) {
  const { navigation } = props;
  const [ loginsRegistrados, setLoginsRegistrados ] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reloadData, setReloadData] = useState([]);
 
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
      .on("child_added" , function (snap){
        logins1.push(snap.val().fecha);
      });
      logins1.reverse();
      let aux = [];
      for (i = 0 ; i < 10 ; i++){
        aux.push(logins1[i]);
      }
      
      setLoginsRegistrados(aux);
      setReloadData(false);
      setIsLoading(false);
  }, []);
  console.log(loginsRegistrados);
  console.log("hola");
  return (
    <SafeAreaView>
      <ScrollView>
        {loginsRegistrados.length > 0 ? (
          <FlatList 
          data = {loginsRegistrados}
          renderItem = {(loginItem) => (
            <View>
              <Text> { fechaParseada(loginItem.item) } </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          />
        ) : (
          <BlankView text={"No tiene logins"} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
