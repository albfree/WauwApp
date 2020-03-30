import { createStackNavigator } from "react-navigation-stack";
import ServicesScreen from "../screens/Services";
import SearchAccommodationsScreen from "../screens/SearchAccommodations";
import ChangeAvailabilityScreen from "../screens/ChangeAvailability";
import CreateAccommodationScreen from "../screens/CreateAccommodation";
import SearchWalksScreen from "../screens/SearchWalks";

import CreateRequestAccommodationScreen from "../screens/CreateRequestAccommodation";
import FormRequestAccommodationScreen from "../screens/FormRequestAccommodation";

const ServicesScreenStacks = createStackNavigator({
  Services: {
    screen: ServicesScreen,
    navigationOptions: () => ({
      title: "Elige un Servicio",
      headerTitleAlign: "center"
    })
  },
  SearchWalks: {
    screen: SearchWalksScreen,
    navigationOptions: () => ({
      title: "Buscar Paseos",
      headerTitleAlign: "center"
    })
  },
  SearchAccommodations: {
    screen: SearchAccommodationsScreen,
    navigationOptions: () => ({
      title: "Buscar Alojamientos",
      headerTitleAlign: "center"
    })
  },
  ChangeAvailability: {
    screen: ChangeAvailabilityScreen,
    navigationOptions: () => ({
      title: "Cambiar Disponibilidad",
      headerTitleAlign: "center"
    })
  },
  //     CreateRequest: {
  //       screen: CreateRequestScreen,
  //       navigationOptions: () => ({
  //         title: "Crear Solicitud",
  //         headerTitleAlign: "center"
  //   })
  // },
  CreateAccommodation: {
    screen: CreateAccommodationScreen,
    navigationOptions: () => ({
      title: "Crear Alojamiento",
      headerTitleAlign: "center"
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
      title: "Formulario Solicitud Alojamiento",
      headerTitleAlign: "center"
    })
  }
});

export default ServicesScreenStacks;
