import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Alert, ScrollView,Picker,TouchableOpacity} from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../account/QueriesProfile";
import { CheckBox } from "react-native-elements";
import { Button, Icon } from "react-native-elements";
import { globalStyles } from "../styles/global";

import DateTimePicker from "@react-native-community/datetimepicker";
import _ from "lodash";

function FormFilterByAvailability(props) {
  const { navigation } = props;
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [reloadData, setReloadData] = useState(false);

  const [availabilities, setAvailabilities] = useState([]);
  const [newAvailability, setNewAvailability] = useState(null);
  const [newInterval, setNewInterval] = useState(null);

  
  let id;
  db.ref("wauwers")
  .orderByChild("email")
  .equalTo(email)
  .on("child_added", snap => {
    id = snap.val().id;
  });


  useEffect(() => {
    const query = db.ref("availabilities-wauwers");
    query.on("value", snap => {
    //  const allData = [];
      const allAvailability = [];
      const allIds = [];
      snap.forEach(child => {
    if (child.val().wauwer.id != id) {
    //allData.push(child.val().wauwer);
    query
      .child(child.val().wauwer.id)
      .child("availabilities")
      .on("value", (child) => {
        child.forEach(kid=>{
          if(!allIds.includes(kid.val().id)){
            allAvailability.push(kid.val());
            allIds.push(kid.val().id);
          }
        }); 
      });
  }
});
//setData(allData);
setAvailabilities(allAvailability);

});

 setReloadData(false);
 setLoading(false)
 
}, [reloadData]);

const funct = value => {
  console.log(value);
  setNewAvailability(value.id);
  setNewInterval(
    value.day + " " + value.startTime + "h - " + value.endDate + "h"
    );
  
    let formData = {
      availability: newAvailability
     };
     setLoading(true);
        navigation.navigate("SearchWalk", {
          formData: formData
        });


}

  // const sendForm = () => {
  //   let formData = {
  //    availability: newAvailability
  //   };

  //   if ("") {
     
  //   } else {
     
  //       setIsLoading(true);
  //       navigation.navigate("SearchWalk", {
  //         formData: formData
  //       });
  //     }
    
  // };

  return (
    <SafeAreaView style={globalStyles.safeMyRequestsArea}>
  <ScrollView>
     <Text style={globalStyles.walkTxt2}>
        {"¿Cuándo quiere que pasee a su perro?"}
      </Text>
     <Picker
        selectedValue={newInterval}
        onValueChange={value => funct(value)}
      >
        {availabilities.map(item => (
          <Picker.Item
            label={
              item.day + " " + item.startTime + "h - " + item.endDate + "h"
            }
            value={item}
          />
        ))}
      </Picker> 
      {/* <Button
          buttonStyle={globalStyles.accommodationBtn}
          containerStyle={globalStyles.accommodationBtnCnt}
          title="Buscar"
          onPress={sendForm}
          icon={
             <Icon
              type="material-community"
              name="content-save"
              size={20}
              color="white"
              marginLeft={10}
                  />
                }
          titleStyle={globalStyles.editAccommodationEditDateTittle}
         /> */}
    </ScrollView>
    
    </SafeAreaView>
  );
}

export default withNavigation(FormFilterByAvailability);


  
