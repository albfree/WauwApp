import { createStackNavigator } from "react-navigation-stack";
import ProfileScreen from "../screens/Profile/Profile";
import ProfileWalkerFormScreen from "../screens/Profile/ProfileWalkerForm";
import ProfileAddDogFormScreen from "../screens/Profile/ProfileAddDogForm";
import ProfileLocationFormScreen from "../screens/Profile/ProfileLocationForm";
import ProfileDrawerNavigator from "./ProfileDrawer";
import ShowRequestScreen from "../screens/Profile/ShowRequest";
import PayRequestScreen from "../screens/Profile/PayRequest";
import EditDeleteAccommodationScreen from "../screens/EditDeleteAccommodation";
import AddReviewServiceScreen from "../screens/Profile/AddReviewService";
import ShowWalkScreen from "../screens/Profile/ShowWalk";
import UserDataScreen from "../screens/GRPD/UserData";
import RequestToMyAccommodationListScreen from "../screens/Profile/ProfileRequestsToMyAccommodationList";
import DisplayFinishRequestScreen from "../screens/Profile/ProfileDisplayFinishRequest";
import AdminPanelScreen from "../screens/Profile/AdminPanel";
import UserListScreen from "../screens/Administrator/UserList";
import BroadcastMsgScreen from "../screens/Administrator/AdminBroadcastForm";
import PagarScreen from "../screens/Pagar";

const morado = "#443099";
const blanco = "white";

const ProfileScreenStacks = createStackNavigator({
  ProfileDrawer: {
    screen: ProfileDrawerNavigator,
    navigationOptions: () => ({
      title: "Mis Datos",
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
  ProfileWalkerForm: {
    screen: ProfileWalkerFormScreen,
    navigationOptions: () => ({
      title: "Datos de Paseador",
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
  ProfileAddDogForm: {
    screen: ProfileAddDogFormScreen,
    navigationOptions: () => ({
      title: "Datos del Perro",
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
  ProfileLocationForm: {
    screen: ProfileLocationFormScreen,
    navigationOptions: () => ({
      title: "Escoger Localización",
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
  ShowRequest: {
    screen: ShowRequestScreen,
    navigationOptions: () => ({
      title: "Solicitud",
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
  ShowWalk: {
    screen: ShowWalkScreen,
    navigationOptions: () => ({
      title: "Paseo",
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
  PayRequest: {
    screen: PayRequestScreen,
    navigationOptions: () => ({
      title: "Pago",
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
  EditDeleteAccommodation: {
    screen: EditDeleteAccommodationScreen,
    navigationOptions: () => ({
      title: "Editar alojamiento",
      headerTitleAlign: "center",
    }),
  },
  UserData: {
    screen: UserDataScreen,
    navigationOptions: () => ({
      title: "Ver información recopilada",
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
  UserList: {
    screen: UserListScreen,
    navigationOptions: () => ({
      title: "Lista de usuarios",
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
  AddReviewService: {
    screen: AddReviewServiceScreen,
    navigationOptions: () => ({
      title: "Formulario Rating",
      headerTitleAlign: "center",
    }),
  },
  RequestToMyAccommodationList: {
    screen: RequestToMyAccommodationListScreen,
    navigationOptions: () => ({
      title: "Solicitudes a mi alojamiento",
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
  DisplayFinishRequests: {
    screen: DisplayFinishRequestScreen,
    navigationOptions: () => ({
      title: "Solicitud a mi alojamiento",
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
  AdminPanel: {
    screen: AdminPanelScreen,
    navigationOptions: () => ({
      title: "Panel de Administración",
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
    screen: PagarScreen,
    navigationOptions: () => ({
      title: "Pagar",
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
  Blocked: {
    screen: BannedSwitchNavigator,
  },
  BroadcastMsg: {
    screen: BroadcastMsgScreen,
    navigationOptions: () => ({
      title: "Mensaje a todos los usuarios",
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

export default ProfileScreenStacks;
