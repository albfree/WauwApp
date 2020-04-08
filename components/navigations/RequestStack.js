import { createStackNavigator } from "react-navigation-stack";

import { CreateRequestAccommodationScreen } from "../screens/CreateRequestAccommodation";
import { FormRequestAccommodationScreen } from "../screens/FormRequestAccommodation";

import { CreateRequestScreen } from "../screens/CreateRequestWalk";

const morado = "#443099";
const blanco = "white";

const RequestScreenStacks = createStackNavigator({
  CreateRequest: {
    screen: CreateRequestScreen,
    navigationOptions: () => ({
      title: "Crear Solicitud",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: morado,
      },
      headerTitleStyle: {
        color: blanco,
      },
      headerTintColor: blanco,
    }),
  },
  CreateRequestAccommodation: {
    screen: CreateRequestAccommodationScreen,
    navigationOptions: () => ({
      title: "Crear Solicitud Alojamiento",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: morado,
      },
      headerTitleStyle: {
        color: blanco,
      },
      headerTintColor: blanco,
    }),
  },
  FormRequestAccommodation: {
    screen: FormRequestAccommodationScreen,
    navigationOptions: () => ({
      title: "Formualario Solicitud Alojamiento",
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: morado,
      },
      headerTitleStyle: {
        color: blanco,
      },
      headerTintColor: blanco,
    }),
  },
});

export default RequestScreenStacks;
