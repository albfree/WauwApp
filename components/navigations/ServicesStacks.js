import { createStackNavigator } from "react-navigation-stack";
import ServicesScreen from "../screens/Services";
import SearchAccommodationsScreen from "../screens/SearchAccommodations";
import ChangeAvailabilityScreen from "../screens/ChangeAvailability";
import CreateAccommodationScreen from "../screens/CreateAccommodation";
import SearchWalksScreen from "../screens/SearchWalks";
import PublicProfileScreen from "../account/PublicProfile";
import CreateRequestWalkScreen from "../screens/CreateRequestWalk";
import FormFilterByAvailabilityScreen from "../screens/FormFilterByAvailability";
import CreateRequestAccommodationScreen from "../screens/CreateRequestAccommodation";
import FormRequestAccommodationScreen from "../screens/FormRequestAccommodation";
import FormFilterByDateScreen from "../screens/FormFilterByDate";
import PagarScreen from "../screens/Pagar";

const morado = "#443099";
const blanco = "white";

const ServicesScreenStacks = createStackNavigator(
  {
    Services: {
      unmountOnBlur: true,
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
      unmountOnBlur: true,
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
      unmountOnBlur: true,
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
      unmountOnBlur: true,
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
      unmountOnBlur: true,
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
      unmountOnBlur: true,
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
      unmountOnBlur: true,
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
      unmountOnBlur: true,
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
      unmountOnBlur: true,
      screen: PublicProfileScreen,
      navigationOptions: () => ({
        title: "Perfil",
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

    FormFilterByAvailability: {
      unmountOnBlur: true,
      screen: FormFilterByAvailabilityScreen,
      navigationOptions: () => ({
        title: "Filtrar Paseos",
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
    FormFilterByDate: {
      unmountOnBlur: true,
      screen: FormFilterByDateScreen,
      navigationOptions: () => ({
        title: "Filtrar Alojamientos",
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
    Pagar: {
      unmountOnBlur: true,
      screen: PagarScreen,
      navigationOptions: () => ({
        title: "Recibir dinero por servicio",
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
  },
  {
    initialRouteName: "Services",
  }
);

export default ServicesScreenStacks;
