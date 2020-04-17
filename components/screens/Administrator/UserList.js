import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import { withNavigation } from "react-navigation";
import { db } from "../../population/config.js";
import BlankView from "../BlankView";

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
          if(child.val().email !== "wauwispp1920@gmail.com"){
            users.push(child.val());
          }
        });
    setUserList(users);
  });
  setReloadData(false);
  setLoading(false);
  }, [reloadData]); 

  return (
    <ScrollView>
      {usersList.length > 0 ? (
          <FlatList
            data={usersList}
            renderItem={(user) => (
              <User user={user} navigation={navigation} />
            )}
            keyExtractor={(user) => user.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <BlankView text={"Nadie usa Wauw."} />
        )}
    </ScrollView>  
  );
}

function User(userIn) {
  const { user, navigation } = userIn;
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [error, setError] = useState("");
  
  const banUser = () => {
    Alert.alert(
      "Atención",
      "¿Desea bloquear la cuenta seleccionada?",
      [
        {
          text: "Sí",
          onPress: () => banConfirmed()
        },
        {
          text: "No"
        }
      ]
    );
  };

  const unbanUser = () => {
    Alert.alert(
      "Atención",
      "¿Desea desbloquear la cuenta seleccionada?",
      [
        {
          text: "Sí",
          onPress: () => unbanConfirmed()
        },
        {
          text: "No"
        }
      ]
    );
  };

  const banConfirmed = () => {
    let userData = {
      isBanned: true
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
  }

  const unbanConfirmed = () => {
    let userData = {
      isBanned: false
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
  }

  return (
    <View>
      <Text>{user.item.surname + ", " + user.item.name }</Text>
      {user.item.isBanned === false ? (
        <View>
          {/* Poner info del user a la izq y botón a la derecha*/}
          <Button 
            title="Bloquear usuario" 
            onPress={banUser} />
        </View>
      ) : (
        <View>
          <Text>Usuario bloqueado</Text>
          {/* Poner info del user a la izq y botón a la derecha*/}
          <Button 
              title="Desbloquear usuario" 
              onPress={unbanUser} />
          </View>
      )}
    </View>
  );
}

export default withNavigation(UserList);
