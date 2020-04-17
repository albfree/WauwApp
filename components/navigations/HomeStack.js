import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/Home";
import AnimalSheltersScreen from "../screens/AnimalShelters";
import PagoScreen from "../screens/Pago";
import NewsScreen from "../screens/News";

const morado = "#443099";
const blanco = "white";

const HomeScreenStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: "Inicio",
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
  AnimalShelters: {
    screen: AnimalSheltersScreen,
    navigationOptions: () => ({
      title: "Protectoras",
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
  Pago: {
    screen: PagoScreen,
    navigationOptions: () => ({
      title: "Pago",
      headerStyle: {
        backgroundColor: morado,
      },
      headerTitleStyle: {
        color: blanco,
      },
      headerTintColor: blanco,
    }),
  },
  News: {
    screen: NewsScreen,
    navigationOptions: () => ({
      title: "Protectoras",
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

export default HomeScreenStack;
