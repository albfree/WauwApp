import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Alert,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Loading from "./../../Loading";
import { db } from "../../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../../account/QueriesProfile";
import _ from "lodash";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import Toast from "react-native-easy-toast";
import { globalStyles } from "../../styles/global";
import { walkerFormStyles } from "../../styles/walkerFormStyle";

function ProfileWalkerForm(props) {
  const { navigation } = props;
  const toastRef = useRef();
  const [reloadData, setReloadData] = useState(false);
  const [ids, setIds] = useState([]);
  const [hours, setHours] = useState([]);
  const [update, setUpdate] = useState(false);
  const [isVisibleLoading, setIsVisibleLoading] = useState(true);
  const [globales, setGlobales] = useState([]);
  const [sueldo, setSueldo] = useState(0);
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
          const hourPrice = [];
          let hour =
            child.val().availability.day +
            ": " +
            child.val().availability.startTime +
            " - " +
            child.val().availability.endDate;
          let id = child.val().availability.id;
          const price = Math.round(((child.val().price / 1.3) * 10) / 10);
          resulIds.push(id);
          hourPrice.push(hour);
          hourPrice.push(price);
          resulHours.push(hourPrice);
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
    let availability;
    db.ref("availability")
      .child(id)
      .on("value", (snap) => {
        availability = snap.val();
      });

    const money = Math.round(sueldo * 1.3 * 10) / 10;
    const walkData = {
      availability: availability,
      price: money,
    };

    db.ref(
      "availabilities-wauwers/" +
        userInfo.id +
        "/availabilities/" +
        availability.id
    )
      .set(walkData)
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
      if (sueldo >= 5) {
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
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView keyboardShouldPersistTaps={false}>
        <View style={globalStyles.viewFeed}>
          <View style={globalStyles.viewFlex1}>
            <Text style={walkerFormStyles.walkerFormTxt}> Salario </Text>
            <Text style={walkerFormStyles.walkerFormTxt3}>
              {" "}
              (precio / hora){" "}
            </Text>
            <TextInput
              style={walkerFormStyles.walkerFormImput}
              keyboardType={"numeric"}
              onChange={(val) => {
                let precio;
                if (val.nativeEvent.text !== "") {
                  precio = parseInt(val.nativeEvent.text);
                } else {
                  precio = 0;
                }
                const salary = Math.round(precio * 1.3 * 10) / 10;

                db.ref("wauwers/" + userInfo.id)
                  .update({
                    price: salary,
                    walkSalary: precio,
                  })
                  .then(() => {
                    setSueldo(precio);
                  });
              }}
            >
              {sueldo}
            </TextInput>

            <Collapse style={walkerFormStyles.walkerFormList2}>
              <CollapseHeader style={walkerFormStyles.walkerFormList}>
                <Text style={walkerFormStyles.walkerFormTxt2}>
                  ↓ Mi disponibilidad ↓
                </Text>
              </CollapseHeader>
              <CollapseBody>
                <View style={walkerFormStyles.walkerFormView}>
                  {hours.map((hour, index) => (
                    <View key={index} style={walkerFormStyles.walkerFormView2}>
                      <TouchableOpacity
                        onPress={() => confirmDelete(ids[hours.indexOf(hour)])}
                      >
                        <Text>{hour[0]}</Text>
                        <Text>Salario: {hour[1]}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </CollapseBody>
            </Collapse>

            <Text style={walkerFormStyles.walkerFormTxt}>
              Disponibilidades semanales
            </Text>

            {rangos.map((rango) => (
              <Collapse key={rango[0]}>
                <CollapseHeader style={walkerFormStyles.walkerFormList3}>
                  <Text style={walkerFormStyles.walkerFormTxt2}>
                    {rango[0]}
                  </Text>
                </CollapseHeader>
                <CollapseBody>
                  <View style={walkerFormStyles.walkerFormView}>
                    {globales.slice(rango[1], rango[1] + 16).map((av) => (
                      <TouchableOpacity
                        key={av[1]}
                        onPress={() => isAdded(av[1])}
                      >
                        <View style={walkerFormStyles.walkerFormView2}>
                          <Text>{av[0]}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </CollapseBody>
              </Collapse>
            ))}
          </View>
        </View>
      </ScrollView>
      <Loading isVisible={isVisibleLoading} text={"Un momento..."} />
      <Toast ref={toastRef} position="center" opacity={0.8} />
    </SafeAreaView>
  );
}

export default withNavigation(ProfileWalkerForm);
