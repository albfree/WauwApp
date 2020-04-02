import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  View,
  Alert,
  TextInput
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
  CollapseBody
} from "accordion-collapse-react-native";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

function ProfileWalkerForm(props) {
  const { navigation } = props;
  const [reloadData, setReloadData] = useState(false);
  const [walker, setNewWalker] = useState("");

  const [availabilitiesLunes, setAvailabilitiesLunes] = useState([]);
  const [availabilitiesMartes, setAvailabilitiesMartes] = useState([]);
  const [availabilitiesMiercoles, setAvailabilitiesMiercoles] = useState([]);
  const [availabilitiesJueves, setAvailabilitiesJueves] = useState([]);
  const [availabilitiesViernes, setAvailabilitiesViernes] = useState([]);
  const [availabilitiesSabado, setAvailabilitiesSabado] = useState([]);
  const [availabilitiesDomingo, setAvailabilitiesDomingo] = useState([]);
  const [ids, setIds] = useState([]);
  const [hours, setHours] = useState([]);
  const [update, setUpdate] = useState(false);
  const [start, setStart] = useState(false);
  const [isVisibleLoading, setIsVisibleLoading] = useState(true);

  useEffect(() => {
    var userInfo;
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .once("child_added", snap => {
        userInfo = snap.val();
        setNewWalker(userInfo);
      });
    setStart(false);
  }, [start]);

  useEffect(() => {
    // To retrieve user's availabilities
    const resulIds = [];
    const resulHours = [];
    db.ref("availabilities-wauwers/" + walker.id + "/availabilities").on(
      "value",
      snap => {
        snap.forEach(child => {
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
    setUpdate(false);
    setIsVisibleLoading(false);
  }, [update]);

  useEffect(() => {
    // To retrieve global availabilities
    db.ref("availability").on("value", snap => {
      const availabilitiesListLunes = [];
      const availabilitiesListMartes = [];
      const availabilitiesListMiercoles = [];
      const availabilitiesListJueves = [];
      const availabilitiesListViernes = [];
      const availabilitiesListSabado = [];
      const availabilitiesListDomingo = [];
      snap.forEach(child => {
        let hour =
          child.val().day +
          ": " +
          child.val().startTime +
          " - " +
          child.val().endDate;
        let id = child.val().id;

        switch (child.val().day) {
          case "Lunes":
            const huecoLunes = [];
            huecoLunes.push(hour);
            huecoLunes.push(id);
            availabilitiesListLunes.push(huecoLunes);
            break;
          case "Martes":
            const huecoMartes = [];
            huecoMartes.push(hour);
            huecoMartes.push(id);
            availabilitiesListMartes.push(huecoMartes);
            break;
          case "Miercoles":
            const huecoMiercoles = [];
            huecoMiercoles.push(hour);
            huecoMiercoles.push(id);
            availabilitiesListMiercoles.push(huecoMiercoles);
            break;
          case "Jueves":
            const huecoJueves = [];
            huecoJueves.push(hour);
            huecoJueves.push(id);
            availabilitiesListJueves.push(huecoJueves);
            break;
          case "Viernes":
            const huecoViernes = [];
            huecoViernes.push(hour);
            huecoViernes.push(id);
            availabilitiesListViernes.push(huecoViernes);
            break;
          case "Sabado":
            const huecoSabado = [];
            huecoSabado.push(hour);
            huecoSabado.push(id);
            availabilitiesListSabado.push(huecoSabado);
            break;
          case "Domingo":
            const huecoDomingo = [];
            huecoDomingo.push(hour);
            huecoDomingo.push(id);
            availabilitiesListDomingo.push(huecoDomingo);
            break;
          default:
            break;
        }
      });
      setAvailabilitiesLunes(availabilitiesListLunes);
      setAvailabilitiesMartes(availabilitiesListMartes);
      setAvailabilitiesMiercoles(availabilitiesListMiercoles);
      setAvailabilitiesJueves(availabilitiesListJueves);
      setAvailabilitiesViernes(availabilitiesListViernes);
      setAvailabilitiesSabado(availabilitiesListSabado);
      setAvailabilitiesDomingo(availabilitiesListDomingo);
    });
    setReloadData(false);
    setUpdate(true);
  }, [reloadData]);

  const addAv = id => {
    //To save availability selected and then, update screen's info
    setIsVisibleLoading(true);
    db.ref("availabilities-wauwers/" + walker.id + "/wauwer").set(walker);

    let availability;
    db.ref("availability")
      .child(id)
      .on("value", snap => {
        availability = snap.val();
      });

    db.ref(
      "availabilities-wauwers/" +
        walker.id +
        "/availabilities/" +
        availability.id
    )
      .set(availability)
      .then(() => {
        setUpdate(true);
        Alert.alert("Disponibilidad añadida", "");
      })
      .catch(() => {
        Alert.alert("Error. Inténtelo de nuevo", "");
      });
  };

  const deleteAv = id => {
    //To delete availability selected and then, update screen's info
    setIsVisibleLoading(true);
    db.ref("availabilities-wauwers/" + walker.id + "/availabilities")
      .child(id)
      .remove()
      .then(() => {
        db.ref("availabilities-wauwers/" + walker.id).once("value", snap => {
          if (snap.numChildren() == 1) {
            db.ref("availabilities-wauwers/" + walker.id).remove();
          }
        });
        setUpdate(true);
        Alert.alert("Disponibilidad eliminada", "");
      })
      .catch(() => {
        Alert.alert("Error. Inténtelo de nuevo", "");
      });
  };

  const confirmAdd = id => {
    Alert.alert(
      "No dispone de esta disponibilidad",
      "¿Desea incluirla?",
      [
        {
          text: "Sí",
          onPress: () => addAv(id),
          style: "cancel"
        },
        {
          text: "No",
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  const confirmDelete = id => {
    Alert.alert(
      "Esta disponibilidad está añadida",
      "¿Desea eliminarla?",
      [
        {
          text: "Sí",
          onPress: () => deleteAv(id),
          style: "cancel"
        },
        {
          text: "No",
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  const isAdded = (hour, id) => {
    if (!ids.includes(id)) {
      if (walker.price != 0) {
        confirmAdd(id, hour);
      } else {
        Alert.alert(
          "No puede añadir disponibilidades",
          "Su salario no puede ser 0"
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
              onChange={val => {
                let precio;
                if (val.nativeEvent.text !== "") {
                  precio = parseInt(val.nativeEvent.text);
                } else {
                  precio = 0;
                }

                db.ref("wauwers/" + walker.id)
                  .update({
                    price: precio
                  })
                  .then(() => {
                    setStart(true);
                  });
              }}
            >
              {walker.price}
            </TextInput>
          </View>
          <View>
            <Collapse>
              <CollapseHeader
                style={{ backgroundColor: "rgba(191, 191, 191, 0.4)" }}
              >
                <Text style={styles.textHeader}>↓ Mis disponibilidades ↓</Text>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.avContainer}>
                  {hours.map(hour => (
                    <View style={styles.availability}>
                      <TouchableOpacity
                        onPress={() =>
                          confirmDelete(ids[hours.indexOf(hour)], hour)
                        }
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
          <View style={styles.collapse}>
            <Collapse>
              <CollapseHeader style={styles.collapseHeader}>
                <Text style={styles.textHeader}>Lunes</Text>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.avContainer}>
                  {availabilitiesLunes.map(av => (
                    <TouchableOpacity onPress={() => isAdded(av[0], av[1])}>
                      <View style={styles.availability}>
                        <Text>{av[0]}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader style={styles.collapseHeader}>
                <Text style={styles.textHeader}>Martes</Text>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.avContainer}>
                  {availabilitiesMartes.map(av => (
                    <TouchableOpacity onPress={() => isAdded(av[0], av[1])}>
                      <View style={styles.availability}>
                        <Text>{av[0]}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader style={styles.collapseHeader}>
                <Text style={styles.textHeader}>Miércoles</Text>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.avContainer}>
                  {availabilitiesMiercoles.map(av => (
                    <TouchableOpacity onPress={() => isAdded(av[0], av[1])}>
                      <View style={styles.availability}>
                        <Text>{av[0]}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader style={styles.collapseHeader}>
                <Text style={styles.textHeader}>Jueves</Text>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.avContainer}>
                  {availabilitiesJueves.map(av => (
                    <TouchableOpacity onPress={() => isAdded(av[0], av[1])}>
                      <View style={styles.availability}>
                        <Text>{av[0]}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader style={styles.collapseHeader}>
                <Text style={styles.textHeader}>Viernes</Text>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.avContainer}>
                  {availabilitiesViernes.map(av => (
                    <TouchableOpacity onPress={() => isAdded(av[0], av[1])}>
                      <View style={styles.availability}>
                        <Text>{av[0]}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader style={styles.collapseHeader}>
                <Text style={styles.textHeader}>Sábado</Text>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.avContainer}>
                  {availabilitiesSabado.map(av => (
                    <TouchableOpacity onPress={() => isAdded(av[0], av[1])}>
                      <View style={styles.availability}>
                        <Text>{av[0]}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader style={styles.collapseHeader}>
                <Text style={styles.textHeader}>Domingo</Text>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.avContainer}>
                  {availabilitiesDomingo.map(av => (
                    <TouchableOpacity onPress={() => isAdded(av[0], av[1])}>
                      <View style={styles.availability}>
                        <Text>{av[0]}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </CollapseBody>
            </Collapse>
          </View>
          <View>
            <Text style={styles.text}>
              {" "}
              ¿Cuál es el número máximo de perros que te gustaría pasear?{" "}
            </Text>
            <TextInput
              style={styles.data}
              keyboardType={"numeric"}
              onChange={val => {
                let amountDogs;
                if (val.nativeEvent.text !== "") {
                  amountDogs = parseInt(val.nativeEvent.text);
                } else {
                  amountDogs = 0;
                }

                db.ref("wauwers/" + walker.id)
                  .update({
                    petNumberWalk: amountDogs
                  })
                  .then(() => {
                    setStart(true);
                  });
              }}
            >
              {walker.petNumberWalk}
            </TextInput>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Voy a ser Pasedor"
              onPress={() => {
                db.ref("wauwers")
                  .orderByChild("email")
                  .equalTo(email)
                  .on("child_added", snap => {
                    let id = snap.val().id;
                    db.ref()
                      .child("wauwers/" + id)
                      .update({
                        isWalker: true
                      });
                  });
                navigation.navigate("Home");
              }}
              color="#0de"
            />
          </View>
        </View>
      </ScrollView>
      <Loading isVisible={isVisibleLoading} text={"Un momento..."} />
    </SafeAreaView>
  );
}

export default withNavigation(ProfileWalkerForm);

const styles = StyleSheet.create({
  textHeader: {
    textAlign: "center",
    padding: 3
  },
  collapseHeader: {
    margin: 3,
    backgroundColor: "rgba(191, 191, 191, 0.8)"
  },
  avContainer: {
    borderColor: "red",
    marginLeft: 9,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  availability: {
    margin: 5,
    borderWidth: 1,
    borderColor: "rgba(11,156,49,0.5)",
    borderRadius: 5,
    padding: 5
  },
  text: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: "#ddd"
  },
  data: {
    paddingHorizontal: 8,
    color: "grey"
  },
  buttonContainer: {
    marginTop: 20
  },
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    marginBottom: 10
  },
  btnContainer: {
    marginTop: 20,
    width: "95%"
  },
  btn: {
    backgroundColor: "#00a680"
  }
});
