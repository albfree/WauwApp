import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { db } from "../population/config";
import { email } from "./QueriesProfile";
import { fechaParseada } from "./../utils/DateParser";

export default function LastLogged(){
    const [lastLogged, setLastLogged] = useState([]);
    
    useEffect(() => {
        db.ref("users")
          .orderByChild("gmail")
          .equalTo(email)
          .on("value", function(snap){
            snap.forEach(function(child) {
                setLastLogged(child.val().last_logged_in);
              });
          });
    }, []);
    
    return (
        <View>
            <Text>Última conexión: { fechaParseada(lastLogged) }
            </Text>
        </View>
    );

}