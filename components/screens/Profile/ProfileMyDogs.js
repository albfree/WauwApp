import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { globalStyles } from "../../styles/global";
import { FontAwesome } from "@expo/vector-icons";
import { db } from "../../population/config";
import { ScrollView } from "react-native-gesture-handler";
import BlankView from "../BlankView";
import Loading from "../../Loading";
import Toast from "react-native-easy-toast";
import { profileStyles } from "../../styles/profileStyle";
import ProfileAddDogForm from "./ProfileAddDogForm";
import { requestsStyles } from "../../styles/requestsStyle";

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export default function ProfileMyDogs(props) {
  const { navigation, screenProps } = props;
  const { userInfo } = screenProps;
  const [isVisibleLoading, setIsVisibleLoading] = useState(true);
  const [reloadMascotas, setReloadMascotas] = useState();
  const [mascotas, setMascotas] = useState([]);
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const toastRef = useRef();
  const [buttonTitle, setButtonTitle] = useState("Añadir un Perro");
  const [refreshing, setRefreshing] = useState(false);

  const user = userInfo.id;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    const misMascotas = [];
    const refMascotas = db.ref("pet/" + user);
    refMascotas.once("value", (snap) => {
      snap.forEach((child) => {
        misMascotas.push(child.val());
      });
      setMascotas(misMascotas);
    });
    setIsVisibleLoading(false);
    setReloadMascotas(false);
  }, [reloadMascotas, refreshing]);

  useEffect(() => {
    if (!isVisibleForm) {
      setButtonTitle("Añadir un Perro");
    } else {
      setButtonTitle("Volver a Mis Perros");
    }
  }, [isVisibleForm]);

  const setVisible = () => {
    setIsVisibleForm(!isVisibleForm);
  };

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <TouchableOpacity
        style={globalStyles.drawerMenuView}
        onPress={navigation.openDrawer}
      >
        <View>
          <View style={globalStyles.drawerTitle}>
            <Text style={globalStyles.drawerTxt}>Mis Perros</Text>
          </View>
          <View style={globalStyles.drawerIcon}>
            <FontAwesome name="bars" size={24} color="#161924" />
          </View>
        </View>
      </TouchableOpacity>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Button
          buttonStyle={profileStyles.profileBtn3}
          containerStyle={profileStyles.profileBtnContainer3}
          title={buttonTitle}
          onPress={setVisible}
          icon={
            <Icon
              type="material-community"
              name="dog"
              size={30}
              color="white"
              marginLeft={20}
            />
          }
          titleStyle={profileStyles.profileBtnTittle}
        />
        <Text style={requestsStyles.requestsTxt16}>
          Listado de sus perros registrados
        </Text>
        <View>
          {isVisibleForm ? (
            <ProfileAddDogForm
              owner={user}
              setIsVisibleForm={setIsVisibleForm}
              setReloadMascotas={setReloadMascotas}
              setIsVisibleLoading={setIsVisibleLoading}
              toastRef={toastRef}
            />
          ) : (
            <View>
              {mascotas.length > 0 ? (
                mascotas.map((perro, index) => (
                  <View>
                    <Perro
                      key={index}
                      user={user}
                      perro={perro}
                      setReloadMascotas={setReloadMascotas}
                      setIsVisibleLoading={setIsVisibleLoading}
                      toastRef={toastRef}
                    />
                  </View>
                ))
              ) : (
                <BlankView text={"No tiene mascotas registradas"} />
              )}
            </View>
          )}
        </View>
        <Text style={globalStyles.blankTxt2}>
          * Deslice hacia abajo para refrescar *
        </Text>
        <Loading isVisible={isVisibleLoading} text={"Un momento..."} />
      </ScrollView>
      <Toast ref={toastRef} position="center" opacity={0.8} />
    </SafeAreaView>
  );

  function Perro(props) {
    const {
      user,
      perro,
      setReloadMascotas,
      setIsVisibleLoading,
      toastRef,
    } = props;

    const deleteDog = () => {
      setIsVisibleLoading(true);
      db.ref("pet/" + user + "/" + perro.id)
        .remove()
        .then(() => {
          toastRef.current.show(perro.name + " ha sido eliminado");
        })
        .catch(() => {
          toastRef.current.show("Error al eliminar a " + perro.name);
        });
      setReloadMascotas(true);
    };

    const confirmDelete = () => {
      Alert.alert(
        "¿Eliminar a " + perro.name + "?",
        "",
        [
          {
            text: "Si",
            onPress: deleteDog,
          },
          {
            text: "No",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    };

    return (
      <TouchableOpacity onPress={confirmDelete}>
        <View style={requestsStyles.requestsFeed}>
          <View style={globalStyles.viewFlex1}>
            <Text style={requestsStyles.requestsTxt}>Nombre: {perro.name}</Text>
            <Text style={requestsStyles.requestsTxt2}>Raza: {perro.breed}</Text>
            <Text style={requestsStyles.requestsTxt3}>
              Descripción: {perro.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
