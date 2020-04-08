import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Alert,
  TextInput,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Loading from "./../../Loading";
import { db } from "../../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../../account/QueriesProfile";
import { YellowBox } from "react-native";
import _ from "lodash";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import Toast from "react-native-easy-toast";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

function ProfileWalkerForm(props) {
  const { navigation } = props;
  const toastRef = useRef();
  const [reloadData, setReloadData] = useState(false);
  const [ids, setIds] = useState([]);
  const [hours, setHours] = useState([]);
  const [update, setUpdate] = useState(false);
  const [isVisibleLoading, setIsVisibleLoading] = useState(true);
  const [globales, setGlobales] = useState([]);
  const rangos = [
    ["Lunes", 0],
    ["Martes", 16],
    ["Miércoles", 32],
    ["Jueves", 48],
    ["Viernes", 64],
    ["Sábado", 80],
    ["Domingo", 96],
  ];

  let userInfo;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", (snap) => {
      userInfo = snap.val();
    });

  useEffect(() => {
    const resulIds = [];
    const resulHours = [];
    db.ref("availabilities-wauwers/" + userInfo.id + "/availabilities").on(
      "value",
      (snap) => {
        snap.forEach((child) => {
          let hour =
            child.val().day +
            ": " +
            child.val().startTime +
            " - " +
            child.val().endDate;
          let id = child.val().id;
          resulIds.push(id);
          resulHours.push(hour);
        });
        setIds(resulIds);
        setHours(resulHours);
      }
    );
    if (ids.length == 1) {
      db.ref("availabilities-wauwers/" + userInfo.id + "/wauwer").set(userInfo);
    }
    setUpdate(false);
    setIsVisibleLoading(false);
  }, [update]);

  useEffect(() => {
    // To retrieve global availabilities
    db.ref("availability").on("value", (snap) => {
      const global = [];
      snap.forEach((child) => {
        const hueco = [];
        let hour =
          child.val().day +
          ": " +
          child.val().startTime +
          " - " +
          child.val().endDate;
        let id = child.val().id;
        hueco.push(hour);
        hueco.push(id);
        global.push(hueco);
      });
      setGlobales(global);
    });
    setReloadData(false);
    setUpdate(true);
  }, [reloadData]);

  const addAv = (id) => {
    //To save availability selected and then, update screen's info
    setIsVisibleLoading(true);
    db.ref("wauwers/" + userInfo.id).update({
      isWalker: true,
    });

    let availability;
    db.ref("availability")
      .child(id)
      .on("value", (snap) => {
        availability = snap.val();
      });

    db.ref(
      "availabilities-wauwers/" +
        userInfo.id +
        "/availabilities/" +
        availability.id
    )
      .set(availability)
      .then(() => {
        setUpdate(true);
        toastRef.current.show("Disponibilidad añadida");
      })
      .catch(() => {
        toastRef.current.show("Error. Inténtelo de nuevo");
      });
  };

  const deleteAv = (id) => {
    //To delete availability selected and then, update screen's info
    setIsVisibleLoading(true);
    db.ref("availabilities-wauwers/" + userInfo.id + "/availabilities")
      .child(id)
      .remove()
      .then(() => {
        db.ref("availabilities-wauwers/" + userInfo.id).once(
          "value",
          (snap) => {
            if (snap.numChildren() == 1) {
              db.ref("availabilities-wauwers/" + userInfo.id).remove();
              db.ref()
                .child("wauwers/" + userInfo.id)
                .update({
                  isWalker: false,
                });
            }
          }
        );
        setUpdate(true);
        toastRef.current.show("Disponibilidad eliminada");
      })
      .catch(() => {
        toastRef.current.show("Error. Inténtelo de nuevo");
      });
  };

  const confirmAdd = (id) => {
    Alert.alert(
      "No dispone de esta disponibilidad",
      "¿Desea incluirla?",
      [
        {
          text: "Sí",
          onPress: () => addAv(id),
          style: "cancel",
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Esta disponibilidad está añadida",
      "¿Desea eliminarla?",
      [
        {
          text: "Sí",
          onPress: () => deleteAv(id),
          style: "cancel",
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const isAdded = (id) => {
    if (!ids.includes(id)) {
      if (userInfo.price >= 5) {
        confirmAdd(id);
      } else {
        Alert.alert(
          "No puede añadir disponibilidades",
          "Su salario debe ser mayor o igual a 5"
        );
      }
    } else {
      Alert.alert("Ya ha seleccionado esta disponibilidad", "");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View>
            <Text style={styles.text}> Salario </Text>
            <TextInput
              style={styles.data}
              keyboardType={"numeric"}
              onChange={(val) => {
                let precio;
                if (val.nativeEvent.text !== "") {
                  precio = parseInt(val.nativeEvent.text);
                } else {
                  precio = 0;
                }
                console.log(userInfo);
                const salary = Math.round(precio * 1.3 * 10) / 10;

                db.ref("wauwers/" + userInfo.id)
                  .update({
                    price: precio,
                    walkSalary: salary,
                  })
                  .then(() => {
                    setUpdate(true);
                  });
              }}
            >
              {userInfo.price}
            </TextInput>
          </View>
          <View>
            <Collapse>
              <CollapseHeader
                style={{ backgroundColor: "rgba(191, 191, 191, 0.4)" }}
              >
                <Text style={styles.textHeader}>↓ Mi disponibilidad ↓</Text>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.avContainer}>
                  {hours.map((hour, index) => (
                    <View key={index} style={styles.availability}>
                      <TouchableOpacity
                        onPress={() => confirmDelete(ids[hours.indexOf(hour)])}
                      >
                        <Text>{hour}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </CollapseBody>
            </Collapse>
          </View>
          <Text style={(styles.text, { marginTop: 15 })}>
            {" "}
            Disponibilidades semanales{" "}
          </Text>
          <View>
            {rangos.map((rango) => (
              <Collapse key={rango[0]}>
                <CollapseHeader style={styles.collapseHeader}>
                  <Text style={styles.textHeader}>{rango[0]}</Text>
                </CollapseHeader>
                <CollapseBody>
                  <View style={styles.avContainer}>
                    {globales.slice(rango[1], rango[1] + 16).map((av) => (
                      <TouchableOpacity
                        key={av[1]}
                        onPress={() => isAdded(av[1])}
                      >
                        <View style={styles.availability}>
                          <Text>{av[0]}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </CollapseBody>
              </Collapse>
            ))}
          </View>
          {/* <View>
            <Text style={styles.text}>
              {" "}
              ¿Cuál es el número máximo de perros que te gustaría pasear?{" "}
            </Text>
            <TextInput
              style={styles.data}
              keyboardType={"numeric"}
              onChange={(val) => {
                let amountDogs;
                if (val.nativeEvent.text !== "") {
                  amountDogs = parseInt(val.nativeEvent.text);
                } else {
                  amountDogs = 0;
                }

                db.ref("wauwers/" + userInfo.id).update({
                  petNumberWalk: amountDogs,
                });
              }}
            >
              {userInfo.petNumberWalk}
            </TextInput>
          </View> */}
        </View>
      </ScrollView>
      <Loading isVisible={isVisibleLoading} text={"Un momento..."} />
      <Toast ref={toastRef} position="center" opacity={0.8} />
    </SafeAreaView>
  );
}

export default withNavigation(ProfileWalkerForm);

const styles = StyleSheet.create({
  availability: {
    borderColor: "rgba(11,156,49,0.5)",
    borderRadius: 5,
    borderWidth: 1,
    margin: 5,
    padding: 5,
  },
  avContainer: {
    borderColor: "red",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 9,
  },
  btn: {
    backgroundColor: "#00a680",
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  buttonContainer: {
    marginTop: 20,
  },
  collapseHeader: {
    backgroundColor: "rgba(191, 191, 191, 0.8)",
    margin: 3,
  },
  data: {
    color: "grey",
    paddingHorizontal: 8,
  },
  input: {
    marginBottom: 10,
  },
  text: {
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  textHeader: {
    padding: 3,
    textAlign: "center",
  },
  view: {
    paddingBottom: 10,
    alignItems: "center",
    paddingTop: 10,
  },
});
