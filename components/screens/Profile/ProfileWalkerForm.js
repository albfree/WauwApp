import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  View,
  Alert
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
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
  const { navigation, toastRef } = props;
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
  const [selected, setMySelected] = useState();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    var w;
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .on("child_added", snap => {
        w = snap.val();
        setNewWalker(w);
      });
    setUpdate(true);
  }, []);

  useEffect(() => {
    db.ref("availabilities-wauwers/" + walker.id + "/availabilities").on(
      "value",
      snap => {
        const avIds = [];
        const avHours = [];
        console.log("Los muertos de Firebase");
        snap.forEach(child => {
          console.log("Snap:");
          avIds.push(child.val().id);
          avHours.push(
            child.val().day +
              ": " +
              child.val().startTime +
              " - " +
              child.val().endDate
          );
        });
        //setAv(avIds, avHours);
        setIds(avIds);
        setHours(avHours);
      }
    );
    //setSelected("", "", "");
    setUpdate(false);
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
  }, [reloadData]);

  const addAv = (id, hour) => {
    //To save availability selected and then, get user's availabilities
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
        Alert.alert("Disponibilidad añadida", "");
        setSelected("", hour, id);
        // toastRef.current.show("Disponibilidad añadida");
        // db.ref("availabilities-wauwers/" + walker.id + "/availabilities")
        //   .on("value", snap => {
        //     let avIds = [];
        //     let avHours = [];
        //     snap.forEach(child => {
        //       let id = child.val().id;
        //       avIds.push(id);
        //       let hour =
        //         child.val().day +
        //         ": " +
        //         child.val().startTime +
        //         " - " +
        //         child.val().endDate;
        //       avHours.push(hour);
        //     });
        //     setAv(avIds, avHours);
        //   })
        //   .then(() => {
        //   })
        //   .catch(() => {
        //     toastRef.current.show("Error. Inténtelo de nuevo");
        //   });
      })
      .catch(() => {
        Alert.alert("Error. Inténtelo de nuevo", "");
      });
  };

  const setAv = (idL, hourL) => {
    // setIds(idL);
    // setHours(hourL);
  };

  const deleteAv = (id, hour) => {
    db.ref("availabilities-wauwers/" + walker.id + "/availabilities")
      .child(id)
      .remove()
      .then(() => {
        Alert.alert("Disponibilidad eliminada", "");
        setUpdate(true);
        setSelected("", hour, id);
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

  const setSelected = (selected, hour, id) => {
    var start = "";
    var myids = ids;
    var myhours = hours;
    if (!myids.includes(id) && !hours.includes(hour)) {
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
            <Text style={styles.data}>{walker.price}</Text>
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
            <Text style={styles.data}>{walker.petNumberWalker}</Text>
          </View>
          <Text style={styles.text}> Ubicación </Text>

          <View style={styles.buttonContainer}>
            <Button title="Voy a ser Pasedor" onPress={null} color="#0de" />
          </View>
        </View>
      </ScrollView>
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
