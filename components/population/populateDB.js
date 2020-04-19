import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { db } from "./config";

export default function PopulateDB({ navigation }) {
  const [user, setUser] = useState([]);
  var query;

  const getUsers = () => {
    query = db.ref("users");
    query.on("value", function (snap) {
      setUser(snap.val());
    });
  };

  const populateUsers = () => {
    query = db.ref().child("owners");

    query.set({
      usuario1: {
        id: query.push().key,
        email: "nombre" + 1 + "@nombre.com",
        name: "Nombre " + 1,
        surname: "Apellido " + 1,
        petName: "Nombre perro " + 1,
        petBirthDate:
          new Date().getDay() +
          "/" +
          new Date().getUTCMonth() +
          "/" +
          new Date().getFullYear(),
        dogDescriptoin:
          "Esta es una descripción de perro para que Andrea se quede tranquila",
      },
      usuario2: {
        id: query.push().key,
        email: "nombre" + 2 + "@nombre.com",
        name: "Nombre " + 2,
        surname: "Apellido " + 2,
        petName: "Nombre perro " + 2,
        petBirthDate:
          new Date().getDay() +
          "/" +
          new Date().getUTCMonth() +
          "/" +
          new Date().getFullYear(),
        dogDescriptoin:
          "Esta es una descripción de perro para que Andrea se quede tranquila",
      },
      usuario3: {
        id: query.push().key,
        email: "nombre" + 3 + "@nombre.com",
        name: "Nombre " + 3,
        surname: "Apellido " + 3,
        petName: "Nombre perro " + 3,
        petBirthDate:
          new Date().getDay() +
          "/" +
          new Date().getUTCMonth() +
          "/" +
          new Date().getFullYear(),
        dogDescriptoin:
          "Esta es una descripción de perro para que Andrea se quede tranquila",
      },
      usuario4: {
        id: query.push().key,
        email: "nombre" + 4 + "@nombre.com",
        name: "Nombre " + 4,
        surname: "Apellido " + 4,
        petName: "Nombre perro " + 4,
        petBirthDate:
          new Date().getDay() +
          "/" +
          new Date().getUTCMonth() +
          "/" +
          new Date().getFullYear(),
        dogDescriptoin:
          "Esta es una descripción de perro para que Andrea se quede tranquila",
      },
      usuario5: {
        id: query.push().key,
        email: "nombre" + 5 + "@nombre.com",
        name: "Nombre " + 5,
        surname: "Apellido " + 5,
        petName: "Nombre perro " + 5,
        petBirthDate:
          new Date().getDay() +
          "/" +
          new Date().getUTCMonth() +
          "/" +
          new Date().getFullYear(),
        dogDescriptoin:
          "Esta es una descripción de perro para que Andrea se quede tranquila",
      },
      usuario6: {
        id: query.push().key,
        email: "nombre" + 6 + "@nombre.com",
        name: "Nombre " + 6,
        surname: "Apellido " + 6,
        petName: "Nombre perro " + 6,
        petBirthDate:
          new Date().getDay() +
          "/" +
          new Date().getUTCMonth() +
          "/" +
          new Date().getFullYear(),
        dogDescriptoin:
          "Esta es una descripción de perro para que Andrea se quede tranquila",
      },
      usuario7: {
        id: query.push().key,
        email: "nombre" + 7 + "@nombre.com",
        name: "Nombre " + 7,
        surname: "Apellido " + 7,
        petName: "Nombre perro " + 7,
        petBirthDate:
          new Date().getDay() +
          "/" +
          new Date().getUTCMonth() +
          "/" +
          new Date().getFullYear(),
        dogDescriptoin:
          "Esta es una descripción de perro para que Andrea se quede tranquila",
      },
      usuario8: {
        id: query.push().key,
        email: "nombre" + 8 + "@nombre.com",
        name: "Nombre " + 8,
        surname: "Apellido " + 8,
        petName: "Nombre perro " + 8,
        petBirthDate:
          new Date().getDay() +
          "/" +
          new Date().getUTCMonth() +
          "/" +
          new Date().getFullYear(),
        dogDescriptoin:
          "Esta es una descripción de perro para que Andrea se quede tranquila",
      },
      usuario9: {
        id: query.push().key,
        email: "nombre" + 9 + "@nombre.com",
        name: "Nombre " + 9,
        surname: "Apellido " + 9,
        petName: "Nombre perro " + 9,
        petBirthDate:
          new Date().getDay() +
          "/" +
          new Date().getUTCMonth() +
          "/" +
          new Date().getFullYear(),
        dogDescriptoin:
          "Esta es una descripción de perro para que Andrea se quede tranquila",
      },
      usuario10: {
        id: query.push().key,
        email: "nombre" + 10 + "@nombre.com",
        name: "Nombre " + 10,
        surname: "Apellido " + 10,
        petName: "Nombre perro " + 10,
        petBirthDate:
          new Date().getDay() +
          "/" +
          new Date().getUTCMonth() +
          "/" +
          new Date().getFullYear(),
        dogDescriptoin:
          "Esta es una descripción de perro para que Andrea se quede tranquila",
      },
    });

    alert("Populado de forma correcta");
  };

  const populateWalkers = () => {
    //alert("No implementado aun");
    query = db.ref().child("walkers");

    query.set({
      walker1: {
        id: query.push().key,
        email: "nombreWalker" + 1 + "@nombre.com",
        name: "Nombre " + 1,
        surname: "Apellido " + 1,
      },
      walker2: {
        id: query.push().key,
        email: "nombreWalker" + 2 + "@nombre.com",
        name: "Nombre " + 2,
        surname: "Apellido " + 2,
      },
      walker3: {
        id: query.push().key,
        email: "nombreWalker" + 3 + "@nombre.com",
        name: "Nombre " + 3,
        surname: "Apellido " + 3,
      },
      walker4: {
        id: query.push().key,
        email: "nombreWalker" + 4 + "@nombre.com",
        name: "Nombre " + 4,
        surname: "Apellido " + 4,
      },
      walker5: {
        id: query.push().key,
        email: "nombreWalker" + 5 + "@nombre.com",
        name: "Nombre " + 5,
        surname: "Apellido " + 5,
      },
      walker6: {
        id: query.push().key,
        email: "nombreWalker" + 6 + "@nombre.com",
        name: "Nombre " + 6,
        surname: "Apellido " + 6,
      },
      walker7: {
        id: query.push().key,
        email: "nombreWalker" + 7 + "@nombre.com",
        name: "Nombre " + 7,
        surname: "Apellido " + 7,
      },
      walker10: {
        id: query.push().key,
        email: "nombreWalker" + 10 + "@nombre.com",
        name: "Nombre " + 10,
        surname: "Apellido " + 10,
      },
      walker8: {
        id: query.push().key,
        email: "nombreWalker" + 8 + "@nombre.com",
        name: "Nombre " + 8,
        surname: "Apellido " + 8,
      },
      walker9: {
        id: query.push().key,
        email: "nombreWalker" + 9 + "@nombre.com",
        name: "Nombre " + 9,
        surname: "Apellido " + 9,
      },
    });
    alert("Populado paseadores de forma correcta");
  };

  const populateSitters = () => {
    alert("No implementado aun");
  };

  const populateWalks = () => {
    query = db.ref().child("walks");
    query.set({
      walker: ["walker1"],
      owner: ["owner1"],
    });

    //Esta 4 líneas son las más cortas y sencillas para asignar el valor de una query en firebase
    let user = [];
    var queryTest = db
      .ref()
      .child("walkers")
      .child("walker1")
      .on("value", (snap) => {
        user = snap.val();
      });

    alert("Paseos populados de forma correcta");
  };

  return (
    <View style={styles.container}>
      <Text> Populate page </Text>
      <Button
        title="Ir a la página principal"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />
      <Button
        title="Ir a la página about"
        onPress={() => {
          navigation.navigate("About");
        }}
      />
      <Button
        title="Popular usuarios básicos (dueños de mascotas)"
        onPress={populateUsers}
      />
      <Button title="Popular usuarios paseadores" onPress={populateWalkers} />
      <Button title="Popular usuarios cuidadores" onPress={populateSitters} />
      <Button title="Popular paseos" onPress={populateWalks} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 40,
  },
});
