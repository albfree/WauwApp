import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text, Button, View } from "react-native";
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
  const { navigation } = props;
  const [reloadData, setReloadData] = useState(false);
  const [newWalker, setNewWalker] = useState([]);

  const [availabilitiesLunes, setAvailabilitiesLunes] = useState([]);
  const [myHour, setMyHour] = useState("");
  const [myId, setMyId] = useState("");
  const [ids, setIds] = useState([]);
  const [hours, setHours] = useState([]);

  useEffect(() => {
    // To retrieve the current logged user
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .on("value", function(snap) {
        snap.forEach(function(child) {
          setNewWalker(child.val());
        });
      });
    setReloadData(false);
  }, [reloadData]);
  useEffect(() => {
    // To retrieve availabilities
    db.ref("availability").on("value", snap => {
      const availabilitiesListLunes = [];
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
            break;
          case "Miercoles":
            break;
          case "Jueves":
            break;
          case "Viernes":
            break;
          case "Sabado":
            break;
          case "Domingo":
            break;
          default:
            break;
        }
      });
      setAvailabilitiesLunes(availabilitiesListLunes);
      console.log(availabilitiesLunes);
    });
    setReloadData(false);
  }, [reloadData]);

  const changeValues = (h, id) => {
    setHours(h);
    setIds(id);
  };

  // let ids = [];
  // let hours = [];
  let selected = "Na";
  const isAdded = (hour, id) => {
    setMyId(id);
    setMyHour(hour);
    var myIds = ids;
    var myHours = hours;
    if (!myIds.includes(id) && !hours.includes(hour)) {
      myIds.push(id);
      myHours.push(hour);
      changeValues(myHours, myIds);
      console.log("ids:", ids);
      console.log("hours:", hours);
    } else if (myIds.includes(id) && myHours.includes(hour)) {
      myIds = ids.filter(elem => elem != id);
      myHours = hours.filter(elem => elem != hour);
      changeValues(myHours, myIds);
      console.log("idsF:", ids);
      console.log("hoursF:", hours);
    }
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
    //   console.log("Selected:", selected);
    //   setMySelected(selected);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View>
            <Text style={styles.text}> Salario </Text>
            <Text style={styles.data}>{newWalker.walkSalary}</Text>
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
                      {/* <TextHour
                        hour={av[0]}
                        id={av[1]}
                        hours={hours}
                        setHours={setHours}
                        ids={ids}
                        setIds={setIds}
                        setMySelected={setMySelected}
                      /> */}
                    </View>
                  ))}
                </View>
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Martes</Text>
              </CollapseHeader>
              {/* <CollapseBody>
                <AvailabilityFlatList
                  availabilities={availabilitiesGlobal[1]}
                  isChecked={isChecked}
                  globalPos={1}
                  setGlobalList={addAvailability}
                />
              </CollapseBody> */}
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Miércoles</Text>
              </CollapseHeader>
              {/* <CollapseBody>
                <AvailabilityFlatList
                  availabilities={availabilitiesGlobal[2]}
                  isChecked={isChecked}
                  globalPos={2}
                  setGlobalList={addAvailability}
                />
              </CollapseBody> */}
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Jueves</Text>
              </CollapseHeader>
              {/* <CollapseBody>
                <AvailabilityFlatList
                  availabilities={availabilitiesGlobal[3]}
                  isChecked={isChecked}
                  globalPos={3}
                  setGlobalList={addAvailability}
                />
              </CollapseBody> */}
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Viernes</Text>
              </CollapseHeader>
              {/* <CollapseBody>
                <AvailabilityFlatList
                  availabilities={availabilitiesGlobal[4]}
                  isChecked={isChecked}
                  globalPos={4}
                  setGlobalList={addAvailability}
                />
              </CollapseBody> */}
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Sábado</Text>
              </CollapseHeader>
              {/* <CollapseBody>
                <AvailabilityFlatList
                  availabilities={availabilitiesGlobal[5]}
                  isChecked={isChecked}
                  globalPos={5}
                  setGlobalList={addAvailability}
                />
              </CollapseBody> */}
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Domingo</Text>
              </CollapseHeader>
              {/* <CollapseBody>
                <AvailabilityFlatList
                  availabilities={availabilitiesGlobal[6]}
                  isChecked={isChecked}
                  globalPos={6}
                  setGlobalList={addAvailability}
                />
              </CollapseBody> */}
            </Collapse>
          </View>
          <View>
            <Text style={styles.text}>
              {" "}
              ¿Cuál es el número máximo de perros que te gustaría pasear?{" "}
            </Text>
            <Text style={styles.data}>{newWalker.petNumberWalker}</Text>
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
//     console.log("Selected:", selected);
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
