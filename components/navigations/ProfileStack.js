import { createStackNavigator } from "react-navigation-stack";
import ProfileScreen from "../screens/Profile/Profile";
import ProfileWalkerFormScreen from "../screens/Profile/ProfileWalkerForm";
import ProfileAddDogFormScreen from "../screens/Profile/ProfileAddDogForm";
import ProfileLocationFormScreen from "../screens/Profile/ProfileLocationForm";
import ProfileDrawerNavigator from "./ProfileDrawer";
import ShowRequestScreen from "../screens/Profile/ShowRequest";
import PayRequestScreen from "../screens/Profile/PayRequest";
import EditDeleteAccommodationScreen from "../screens/EditDeleteAccommodation";

const ProfileScreenStacks = createStackNavigator({
  ProfileDrawer: {
    screen: ProfileDrawerNavigator,
    navigationOptions: () => ({
      title: "Mis Datos",
      headerTitleAlign: "center"
    })
  },
  ProfileWalkerForm: {
    screen: ProfileWalkerFormScreen,
    navigationOptions: () => ({
      title: "Datos de Paseador",
      headerTitleAlign: "center"
    })
  },
  ProfileAddDogForm: {
    screen: ProfileAddDogFormScreen,
    navigationOptions: () => ({
      title: "Datos del Perro",
      headerTitleAlign: "center"
    })
  },
  ProfileLocationForm: {
    screen: ProfileLocationFormScreen,
    navigationOptions: () => ({
      title: "Escoger Localización",
      headerTitleAlign: "center"
    })
  },
  ShowRequest: {
    screen: ShowRequestScreen,
    navigationOptions: () => ({
      title: "Solicitud",
      headerTitleAlign: "center"
    })
  },
  PayRequest: {
    screen: PayRequestScreen,
    navigationOptions: () => ({
      title: "Pago",
      headerTitleAlign: "center"
    })
  },
  EditDeleteAccommodation: {
    screen: EditDeleteAccommodationScreen,
    navigationOptions: () => ({
      title: "Editar alojamiento",
      headerTitleAlign: "center"
    })
  }
});

export default ProfileScreenStacks;
