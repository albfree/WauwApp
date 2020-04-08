import { createStackNavigator } from "react-navigation-stack";
import ServicesScreen from "../screens/Services";
import SearchAccommodationsScreen from "../screens/SearchAccommodations";
import ChangeAvailabilityScreen from "../screens/ChangeAvailability";
import CreateAccommodationScreen from "../screens/CreateAccommodation";
import SearchWalksScreen from "../screens/SearchWalks";
import PublicProfileScreen from "../account/PublicProfile";

import CreateRequestWalkScreen from "../screens/CreateRequestWalk";

import CreateRequestAccommodationScreen from "../screens/CreateRequestAccommodation";
import FormRequestAccommodationScreen from "../screens/FormRequestAccommodation";

const morado = "#443099";
const blanco = "white";

const ServicesScreenStacks = createStackNavigator({
  Services: {
    screen: ServicesScreen,
    navigationOptions: () => ({
      title: "Elige un Servicio",
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
  SearchWalks: {
    screen: SearchWalksScreen,
    navigationOptions: () => ({
      title: "Buscar Paseos",
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
  SearchAccommodations: {
    screen: SearchAccommodationsScreen,
    navigationOptions: () => ({
      title: "Buscar Alojamientos",
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
  ChangeAvailability: {
    screen: ChangeAvailabilityScreen,
    navigationOptions: () => ({
      title: "Cambiar Disponibilidad",
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
  CreateRequestWalk: {
    screen: CreateRequestWalkScreen,
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
  CreateAccommodation: {
    screen: CreateAccommodationScreen,
    navigationOptions: () => ({
      title: "Crear Alojamiento",
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
      title: "Solicitud de Alojamiento",
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
      title: "Solicitud de Alojamiento",
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
  PublicProfile: {
    screen: PublicProfileScreen,
    navigationOptions: () => ({
      title: "Perfil público",
      headerTitleAlign: "center"
    })
  }
});

export default ServicesScreenStacks;
