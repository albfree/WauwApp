import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Button
} from "react-native";
import { db } from "../../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../../account/QueriesProfile";
import { anonEmail } from "../../account/QueriesProfile";
import { globalStyles } from "../../styles/global";
import { FontAwesome } from "@expo/vector-icons";
import { Icon } from "react-native-elements";
import firebase from "firebase";

function ProfileDeleteData(props) {
    const {navigation} = props;

    const [loading, setLoading] = useState(true);
    const [requestsWorkerList, setRequestWorkerList] = useState([]);
    const [requestsOwnerList, setRequestOwnerList] = useState([]);
    const [user, setUser] = useState();
    const [anonUser, setAnonUser] = useState();
    const [reloadData, setReloadData] = useState(false);

    let wauwerId;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", snap => {
      wauwerId = snap.val().id;
    });

    let anonWauwerId;
    db.ref("wauwers")
    .orderByChild("email")
    .equalTo(anonEmail)
    .on("child_added", snap => {
      anonWauwerId = snap.val().id;
    });


    useEffect(() => {
      db.ref("requests")
        .orderByChild("worker")
        .equalTo(wauwerId)
        .on("value", (snap) => {
          const requests = [];
          snap.forEach((child) => {
            requests.push(child.val());
          });
          setRequestWorkerList(requests);
        });
        setLoading(false);
        setReloadData(false);
      }, []);

      useEffect(() => {
        db.ref("requests")
          .orderByChild("owner")
          .equalTo(wauwerId)
          .on("value", (snap) => {
            const requestsO = [];
            snap.forEach((child) => {
              requestsO.push(child.val());
            });
            setRequestOwnerList(requestsO);
          });
          setLoading(false);
          setReloadData(false);
        }, []);

        useEffect(() => {
          db.ref("users")
            .orderByChild("gmail")
            .equalTo(email)
            .on("value", (snap) => {
              snap.forEach((child) => {
                setUser(child.val());
              });
            });

            setLoading(false);
            setReloadData(false);
          }, []);

          useEffect(() => {
            db.ref("wauwers")
              .orderByChild("id")
              .equalTo(anonWauwerId)
              .on("value", (snap) => {
                snap.forEach((child) => {
                  setAnonUser(child.val());
                });
              });
  
              setLoading(false);
              setReloadData(false);
            }, []);

  const aviso = () => {
    Alert.alert(
        "Aviso",
        "Aviso. Estás a punto de borrar tus datos de esta aplicación. Para volver a usar la aplicación deberás registrarte de nuevo",
        [
            {
             text: "Vale",
            onPress: validateAndDelete, 
            },
            {
            text: "Cancelar",
            style: "cancel",
            },
        ],
        { cancelable: false }
      );
  };

  const validateAndDelete = () =>  {

    var requestWorkerOk = true;
    var requestOwnerOk = true;

    if(requestsWorkerList && requestsWorkerList.length) {
      for (let i = 0; i < requestsWorkerList.length; i++) {
        if(requestsWorkerList[i].pending == false) {
          if(requestsWorkerList[i].isFinished == false || requestsWorkerList[i].isPayed == false || requestsWorkerList[i].isRated == false) {
            requestWorkerOk = false;
            Alert.alert("Lo sentimos, pero tienes alguna solicitud pendiente de finalización, pago o valoración.");
            break;
          } else {
            if (requestWorkerOk == true) {
              let idWorker = {
                worker: anonWauwerId
              };
              db.ref("requests/" + requestsWorkerList[i].id).update(idWorker);
              db.ref("chats/"+ requestsWorkerList[i].id).remove();
            }
          }
        } else {
          db.ref("requests/" + requestsWorkerList[i].id).update({pending: false, isCanceled: true, worker: anonWauwerId});
        }
      }
      
    } else {
      
      if(requestsOwnerList && requestsOwnerList.length) {
        for (let i = 0; i < requestsOwnerList.length; i++) {
          if(requestsOwnerList[i].pending == false) {
            if(requestsOwnerList[i].isFinished == false || requestsOwnerList[i].isPayed == false || requestsOwnerList[i].isRated == false) {
              requestOwnerOk = false;
              Alert.alert("Lo sentimos, pero tienes alguna solicitud pendiente de finalización, pago o valoración.");
              break;
            } else {
              if (requestOwnerOk == true) {
                let idOwner = {
                  owner: anonWauwerId
                };
                db.ref("requests/" + requestsOwnerList[i].id).update(idOwner);
                db.ref("chats/" + requestsOwnerList[i].id).remove();
              }
            }
          } else {
            db.ref("request/" + requestsOwnerList[i].id).remove();
          }
        } 
      } 
    }

    if(requestWorkerOk && requestOwnerOk) {
      deleteData(wauwerId);
    }
    
  };


    return(
      <View>
        <TouchableOpacity
        style={globalStyles.drawerMenuView}
        onPress={navigation.openDrawer}
      >
        <View>
          <View style={globalStyles.drawerTitle}>
            <Text style={globalStyles.drawerTxt}>Eliminar datos</Text>
          </View>
          <View style={globalStyles.drawerIcon}>
            <FontAwesome name="bars" size={24} color="#161924" />
          </View>
        </View>
      </TouchableOpacity>
        <Button
        buttonStyle={globalStyles.addDogBtn}
        containerStyle={globalStyles.addDogBtnContainer}
        title="Eliminar datos"
        onPress={aviso}
        />
      </View>
    );
}

function deleteData(props) {

  let wauwerId = props;
  
  var user = [];
  db.ref("users")
  .orderByChild("gmail")
  .equalTo(email)
  .on("value", (snap) => {
    snap.forEach((child) => {
     user.push(child.val());
    });
  });
 

  if (!user[0].hasOwnProperty("last_logged_in")) {
    Alert.alert("Lo sentimos. Para poder eliminar la cuenta debe haber iniciado sesión más de una vez");
  } else {
    let fechaUltimaConexion = new Date(user[0].last_logged_in);
    let fechaActual = new Date();
    
    if(fechaUltimaConexion.getFullYear() == fechaActual.getFullYear()
        && fechaUltimaConexion.getMonth() == fechaActual.getMonth()
        && fechaUltimaConexion.getDate() == fechaActual.getDate()
      ) {
        if(Math.abs(fechaActual.getMinutes() - fechaUltimaConexion.getMinutes()) > 10 || Math.abs(fechaActual.getHours() - fechaUltimaConexion.getHours()) > 1) {
          Alert.alert("Por razones de seguridad, necesitamos que vuelvas a iniciar sesión en esta cuenta para poder eliminarla.");
        } else {
        //BORRADO DE MASCOTAS
  
        db.ref("pet/"+ wauwerId).remove();

        //BORRADO DE ALOJAMIENTOS
    
        db.ref("accommodation")
        .orderByChild("worker")
        .equalTo(wauwerId)
        .on("value", (snap) => {
          snap.forEach((child) => {
            child.ref.remove();
          });
        });

          //BORRADO DE REVIEWS

        db.ref("reviews/" + wauwerId).remove();  
  
          //BORRADO DE DISPONIBILIDADES DEL WAUWER
    
        db.ref("availabilities-wauwers/" + wauwerId).remove();

          //BORRADO DE USER Y WAUWER

        var currentUser = firebase.auth().currentUser;
        var userUid = currentUser.uid;
        currentUser.delete().then(function() {
          db.ref("users/"+userUid).remove();
          db.ref("wauwers/"+wauwerId).remove();
          Alert.alert(
            "Éxito",
            "Su cuenta y toda la información relacionada han sido eliminados.",
            [
              {
                text: "Ok",
                style: "cancel", 
              },
            ],
            { cancelable: false }
          );
        });
      }
    }
  }
}

export default withNavigation(ProfileDeleteData);