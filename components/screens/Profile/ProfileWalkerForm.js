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
  const [walker, setNewWalker] = useState(navigation.state.params.userInfo);

  const [availabilitiesLunes, setAvailabilitiesLunes] = useState([]);
  const [availabilitiesMartes, setAvailabilitiesMartes] = useState([]);
  const [availabilitiesMiercoles, setAvailabilitiesMiercoles] = useState([]);
  const [availabilitiesJueves, setAvailabilitiesJueves] = useState([]);
  const [availabilitiesViernes, setAvailabilitiesViernes] = useState([]);
  const [availabilitiesSabado, setAvailabilitiesSabado] = useState([]);
  const [availabilitiesDomingo, setAvailabilitiesDomingo] = useState([]);
  const [ids, setIds] = useState([]);
  const [hours, setHours] = useState([]);
  const [selected, setMySelected] = useState();
  const [update, setUpdate] = useState(false);
  const [start, setStart] = useState(false);
  const [numAvailabilities, setNumAvailabilities] = useState(0);
  const [startAvailabilities, setStartAvailabilities] = useState([]);
  const [isVisibleLoading, setIsVisibleLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const resulIds = [];
      const resulHours = [];
      const availabilities = db.ref(
        "availabilities-wauwers/" + walker.id + "/availabilities"
      );

      await availabilities.on("value", snap => {
        setStartAvailabilities[snap.val()];
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
        setSelectedInicial(resulHours);
      });
    })();

    setUpdate(false);
    setIsVisibleLoading(false);
  }, [update]);

  const setSelectedInicial = hours => {
    let selected;
    if (hours.length == 0) {
      selected = "";
      setMySelected(selected);
    } else if (hours.length == 1) {
      selected = hours[0];
      setMySelected(selected);
    } else if (hours.length > 1) {
      selected = hours[0];
      for (var i = 1; i < hours.length; i++) {
        selected = selected + ", " + hours[i];
      }
      setMySelected(selected);
    }
  };

  useEffect(() => {
    //    console.log("3");
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
    //setUpdate(true);
  }, [reloadData]);

  const addAv = (id, hour) => {
    //To save availability selected and then, get user's availabilities
    setIsVisibleLoading(true);
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
        //setMySelected(hours);
        //setSelected(hour, id);
      })
      .catch(() => {
        Alert.alert("Error. Inténtelo de nuevo", "");
      });
  };

  const setInfo = (idL, hourL) => {
    setIds(idL);
    setHours(hourL);
    if (ids.length != 0) {
      for (var i = ids.length - 1; i >= 0; i--) {
        setSelected(hours[i], ids[i]);
      }
      // console.log("Ids:", ids);
      // console.log("Hours:", hours);
    }
  };

  const deleteAv = (id, hour) => {
    setIsVisibleLoading(true);
    db.ref("availabilities-wauwers/" + walker.id + "/availabilities")
      .child(id)
      .remove()
      .then(() => {
        setUpdate(true);
        Alert.alert("Disponibilidad eliminada", "");
        //setMySelected(hours);
        //setSelected(hour, id);
      })
      .catch(() => {
        Alert.alert("Error. Inténtelo de nuevo", "");
      });
  };

  const confirmAdd = (id, hour) => {
    Alert.alert(
      "No dispone de esta disponibilidad",
      "¿Desea incluirla?",
      [
        {
          text: "Sí",
          onPress: () => addAv(id, hour),
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

  const confirmDelete = (id, hour) => {
    Alert.alert(
      "Esta disponibilidad está añadida",
      "¿Desea eliminarla?",
      [
        {
          text: "Sí",
          onPress: () => deleteAv(id, hour),
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
      confirmAdd(id, hour);
    } else {
      confirmDelete(id, hour);
    }
    // if (!myIds.includes(id) && !hours.includes(hour)) {
    //   myIds.push(id);
    //   myHours.push(hour);
    //   changeValues(myHours, myIds);
    // } else if (myIds.includes(id) && myHours.includes(hour)) {
    //   myIds = ids.filter(elem => elem != id);
    //   myHours = hours.filter(elem => elem != hour);
    //   changeValues(myHours, myIds);
    // }
    //   let selected = "";
    //   var start = "";
    //   if (!ids.includes(id) && !hours.includes(hour)) {
    //     selected = "";
    //     if (ids.length > 0) {
    //       start = ", ";
    //     }
    //     ids.push(id);
    //     hours.push(hour);
    //     setMyHours(hours);
    //     hours.forEach(h => {
    //       selected = selected + h + start;
    //     });
    //     if (hours.length > 1) {
    //       selected = selected.slice(0, -2);
    //     }
    //   } else {
    //     ids = ids.filter(elem => elem != id);
    //     hours = hours.filter(elem => elem != hour);
    //     selected = "";
    //     if (ids.length > 0) {
    //       start = ", ";
    //     }
    //     hours.forEach(h => {
    //       selected = selected + h + start;
    //     });
    //     if (hours.length >= 1) {
    //       selected = selected.slice(0, -2);
    //     }
    //   }
    //   setMySelected(selected);
  };

  const setSelected = (hour, id) => {
    let selected;
    var start = "";
    var myids = ids;
    var myhours = hours;
    if (!myids.includes(id) && !myhours.includes(hour)) {
      selected = "";
      if (myids.length > 0) {
        start = ", ";
      }
      myids.push(id);
      myhours.push(hour);
      setHours(myhours);
      myhours.forEach(h => {
        selected = selected + h + start;
      });
      if (myhours.length > 1) {
        selected = selected.slice(0, -2);
      }
    } else {
      myids = myids.filter(elem => elem != id);
      myhours = myhours.filter(elem => elem != hour);
      selected = "";
      if (myids.length > 0) {
        start = ", ";
      }
      myhours.forEach(h => {
        selected = selected + h + start;
      });
      if (myhours.length >= 1) {
        selected = selected.slice(0, -2);
      }
    }
    setMySelected(selected);
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
                if(val.nativeEvent.text !== "") {
                  precio = parseInt(val.nativeEvent.text);
                } else {
                  precio = 0;
                }

                db.ref("wauwers")
                  .orderByChild("email")
                  .equalTo(email)
                  .on("child_added", snap => {
                    let id = snap.val().id;
                    db.ref()
                      .child("wauwers/" + id)
                      .update({
                        price: precio
                      });
                  });
              }}
            >
              {walker.price}
            </TextInput>
          </View>
          <View>
            <Text style={styles.text}>Disponibilidades seleccionadas</Text>
            <Text>{selected}</Text>
          </View>
          <Text style={styles.text}> Disponibilidad </Text>
          <View>
            <Collapse>
              <CollapseHeader>
                <Text>Lunes</Text>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.avContainer}>
                  {availabilitiesLunes.map(av => (
                    <View style={styles.availability}>
                      <TouchableOpacity onPress={() => isAdded(av[0], av[1])}>
                        <Text>{av[0]}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Martes</Text>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.avContainer}>
                  {availabilitiesMartes.map(av => (
                    <View style={styles.availability}>
                      <TouchableOpacity onPress={() => isAdded(av[0], av[1])}>
                        <Text>{av[0]}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Miércoles</Text>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.avContainer}>
                  {availabilitiesMiercoles.map(av => (
                    <View style={styles.availability}>
                      <TouchableOpacity onPress={() => isAdded(av[0], av[1])}>
                        <Text>{av[0]}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Jueves</Text>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.avContainer}>
                  {availabilitiesJueves.map(av => (
                    <View style={styles.availability}>
                      <TouchableOpacity onPress={() => isAdded(av[0], av[1])}>
                        <Text>{av[0]}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Viernes</Text>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.avContainer}>
                  {availabilitiesViernes.map(av => (
                    <View style={styles.availability}>
                      <TouchableOpacity onPress={() => isAdded(av[0], av[1])}>
                        <Text>{av[0]}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Sábado</Text>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.avContainer}>
                  {availabilitiesSabado.map(av => (
                    <View style={styles.availability}>
                      <TouchableOpacity onPress={() => isAdded(av[0], av[1])}>
                        <Text>{av[0]}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Domingo</Text>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.avContainer}>
                  {availabilitiesDomingo.map(av => (
                    <View style={styles.availability}>
                      <TouchableOpacity onPress={() => isAdded(av[0], av[1])}>
                        <Text>{av[0]}</Text>
                      </TouchableOpacity>
                    </View>
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
            <TextInput style={styles.data} 
            keyboardType={"numeric"}
            onChange={val => {
                let amountDogs;
                if(val.nativeEvent.text !== "") {
                  amountDogs = parseInt(val.nativeEvent.text);
                } else {
                  amountDogs = 0;
                }

                db.ref("wauwers")
                  .orderByChild("email")
                  .equalTo(email)
                  .on("child_added", snap => {
                    let id = snap.val().id;
                    db.ref()
                      .child("wauwers/" + id)
                      .update({
                        petNumberWalk: amountDogs
                      });
                  });
              }}>
              {walker.petNumberWalker}
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

// function TextHour(props) {
//   const { hour, id, hours, setHours, ids, setIds, setMySelected } = props;
//   let myIds = [];
//   myIds.push(ids);
//   let myHours = [];
//   myHours.push(hours);

//   useEffect(() => {}, []);

//   const isAdded = (hour, id) => {
//     let selected = "";
//     var start = "";
//     if (!myIds.includes(id) && !myHours.includes(hour)) {
//       selected = "";
//       if (myIds.length > 0) {
//         start = ", ";
//       }
//       myIds.push(id);
//       myHours.push(hour);
//       myHours.forEach(h => {
//         selected = selected + h + start;
//       });
//       if (myHours.length > 1) {
//         selected = selected.slice(0, -2);
//       }
//     } else {
//       myIds = myIds.filter(elem => elem != id);
//       myHours = myHours.filter(elem => elem != hour);
//       selected = "";
//       if (myIds.length > 0) {
//         start = ", ";
//       }
//       myHours.forEach(h => {
//         selected = selected + h + start;
//       });
//       if (myHours.length >= 1) {
//         selected = selected.slice(0, -2);
//       }
//     }
//     setMySelected(selected);
//   };

//   return (
//     <View>
//       <TouchableOpacity onPress={isAdded(hour, id)}>
//         <Text>{hour}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

export default withNavigation(ProfileWalkerForm);

const styles = StyleSheet.create({
  avContainer: {
    borderColor: "red",
    marginLeft: 10,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  availability: {
    margin: 5
    //backgroundColor: "green"
  },
  text: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: "#ddd"
  },
  data: {
    paddingHorizontal: 8,
    paddingVertical: 9,
    color: "grey"
  },
  buttonContainer: {
    marginTop: 40
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
