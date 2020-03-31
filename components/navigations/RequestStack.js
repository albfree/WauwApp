import { createStackNavigator } from "react-navigation-stack";


import {CreateRequestAccommodationScreen} from "../screens/CreateRequestAccommodation";
import {FormRequestAccommodationScreen} from "../screens/FormRequestAccommodation";



import { CreateRequestScreen } from "../screens/CreateRequestWalk";


const RequestScreenStacks = createStackNavigator({
    CreateRequest: {
       screen: CreateRequestScreen,
       navigationOptions: ()=> ({
           title: "Crear Solicitud",
           headerTitleAlign: "center",
       })
    },
    CreateRequestAccommodation: {
        screen: CreateRequestAccommodationScreen,
        navigationOptions: () => ({
          title: "Crear Solicitud Alojamiento",
          headerTitleAlign: "center"
        })
      },
      FormRequestAccommodation: {
        screen: FormRequestAccommodationScreen,
        navigationOptions: () => ({
          title: "Formualario Solicitud Alojamiento",
          headerTitleAlign: "center"
        })
      }

});

export default RequestScreenStacks;