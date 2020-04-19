import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { withNavigation } from "react-navigation";
import { db } from "../../population/config.js";
import BlankView from "../BlankView";
import { requestsStyles } from "../../styles/requestsStyle";
import { globalStyles } from "../../styles/global";
import { Button, Icon } from "react-native-elements";
import { myWalksStyles } from "../../styles/myWalksStyle";

function UserList(props) {
  const { navigation } = props;
  const [loading, setLoading] = useState(true);
  const [reloadData, setReloadData] = useState(false);

  const [usersList, setUserList] = useState([]);

  useEffect(() => {
    db.ref("wauwers")
      .orderByChild("surname")
      .on("value", (snap) => {
        const users = [];
        snap.forEach((child) => {
          if (child.val().email !== "wauwispp1920@gmail.com") {
            users.push(child.val());
          }
        });
        setUserList(users);
      });
    setReloadData(false);
    setLoading(false);
  }, [reloadData]);

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView>
        <Text style={requestsStyles.requestsTxt16}>Listado de usuarios</Text>
        <Text style={requestsStyles.requestsTxt16}>
          Pulse para bloquear o desbloquear
        </Text>

        {usersList.length > 0 ? (
          <FlatList
            data={usersList}
            renderItem={(user) => <User user={user} navigation={navigation} />}
            keyExtractor={(user) => user.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <BlankView text={"Nadie usa Wauw."} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function User(userIn) {
  const { user, navigation } = userIn;
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [error, setError] = useState("");

  const banUser = () => {
    Alert.alert("Atención", "¿Desea bloquear la cuenta seleccionada?", [
      {
        text: "Sí",
        onPress: () => banConfirmed(),
      },
      {
        text: "No",
      },
    ]);
  };

  const unbanUser = () => {
    Alert.alert("Atención", "¿Desea desbloquear la cuenta seleccionada?", [
      {
        text: "Sí",
        onPress: () => unbanConfirmed(),
      },
      {
        text: "No",
      },
    ]);
  };

  const banConfirmed = () => {
    let userData = {
      isBanned: true,
    };

    db.ref("wauwers")
      .child(user.item.id)
      .update(userData)
      .then(() => {
        setReloadData(true);
        setIsVisibleModal(false);
        setIsLoading(true);
      })
      .catch(() => {
        setError("Ha ocurrido un error");
        setIsLoading(false);
      });
    Alert.alert("Éxito", "Cuenta bloqueada.");
  };

  const unbanConfirmed = () => {
    let userData = {
      isBanned: false,
    };

    db.ref("wauwers")
      .child(user.item.id)
      .update(userData)
      .then(() => {
        setReloadData(true);
        setIsVisibleModal(false);
        setIsLoading(true);
      })
      .catch(() => {
        setError("Ha ocurrido un error");
        setIsLoading(false);
      });
    Alert.alert("Éxito", "Cuenta desbloqueada.");
  };

  return (
    <View>
      {user.item.isBanned ? (
        <TouchableOpacity onPress={unbanUser}>
          <View style={globalStyles.adminView}>
            <View style={globalStyles.viewFlex1}>
              <View style={globalStyles.adminView3}>
                <Text style={globalStyles.adminTxt}>
                  {user.item.surname + ", " + user.item.name}
                </Text>
              </View>
            </View>
            {/* Poner info del user a la izq y botón a la derecha*/}
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={banUser}>
          <View style={globalStyles.adminView2}>
            <View style={globalStyles.viewFlex1}>
              <View style={globalStyles.adminView3}>
                <Text style={globalStyles.adminTxt}>
                  {user.item.surname + ", " + user.item.name}
                </Text>
                {/* Poner info del user a la izq y botón a la derecha*/}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default withNavigation(UserList);
