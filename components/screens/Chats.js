import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import _ from "lodash";
import firebase from "firebase";
import { email } from "../account/QueriesProfile";
import { db } from "../population/config.js";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar } from "react-native-elements";
import { globalStyles } from "../styles/global";
import BlankView from "./BlankView";
import { chatsStyles } from "../styles/chatsStyle";
import { BannedAssertion } from "../account/BannedAssertion";

export default function Chats(props) {
  const { navigation } = props;
  const [data, setData] = useState([]);

  var currentUser = BannedAssertion();
  let otherUserID;
  let otherUserPhoto;
  let otherUserName;


  useEffect(() => {
    db.ref("wauwers").child(currentUser.id).update({ hasMessages: false });
    db.ref("requests").on("value", (snap) => {
      const allData = [];
      snap.forEach((child) => {
        const requestsData = [];

        if (
          (child.val().worker === currentUser.id ||
            child.val().owner === currentUser.id) &&
          child.val().isCanceled === false &&
          child.val().pending === false &&
          child.val().isPayed === true
        ) {
          if (child.val().worker != currentUser.id) {
            otherUserID = child.val().worker;
          } else {
            otherUserID = child.val().owner;
          }

          db.ref("wauwers")
            .orderByChild("id")
            .equalTo(otherUserID)
            .on("child_added", (snap) => {
              otherUserName = snap.val().name;
            });

          db.ref("wauwers")
            .orderByChild("id")
            .equalTo(otherUserID)
            .on("child_added", (snap) => {
              otherUserPhoto = snap.val().photo;
            });

          requestsData.push(otherUserName);
          requestsData.push(child.val().type);
          requestsData.push(otherUserPhoto);
          requestsData.push(child.val().id);
          requestsData.push(otherUserID);
          allData.push(requestsData);
        }
      });
      setData(allData);
    });
  }, []);

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView>
        {data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={(requestsData) => (
              <RequestChat
                requestsData={requestsData}
                navigation={navigation}
                currentUser={currentUser}
                otherUserID={otherUserID}
              />
            )}
            keyExtractor={(requestsData) => requestsData.id}
          />
        ) : (
          <BlankView text={"No tiene conversaciones abiertas"} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function RequestChat(props) {
  const { requestsData, navigation, currentUser } = props;
  let tipo;
  if (
    requestsData.item[1].substring(0, 1).toUpperCase() +
      requestsData.item[1].substring(1, requestsData.item[1].size) ===
    "Walk"
  ) {
    tipo = "Paseo";
  } else {
    tipo = "Alojamiento";
  }
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Chat", {
          name: currentUser.name,
          _id: currentUser.id,
          avatar: currentUser.photo,
          requestID: requestsData.item[3],
          otherUserID: requestsData.item[4],
        })
      }
    >
      <View style={chatsStyles.chatsFeed}>
        <View style={globalStyles.viewFlex1}>
          <View style={chatsStyles.chatsView}>
            <Avatar
              rounded
              size="large"
              source={{
                uri: requestsData.item[2],
              }}
            />
            <Text style={chatsStyles.chatsTxt}> {requestsData.item[0]} </Text>
            <Text style={chatsStyles.chatsTxt2}>{tipo}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
