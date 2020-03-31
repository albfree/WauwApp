import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/Home";
import AnimalSheltersScreen from "../screens/AnimalShelters";
import PagoScreen from '../screens/Pago';

const HomeScreenStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: "Inicio",
      headerTitleAlign: "center"
    })
  },
  AnimalShelters: {
    screen: AnimalSheltersScreen,
    navigationOptions: () => ({
      title: "Protectoras",
      headerTitleAlign: "center"
    })
  },
  Pago: {
    screen: PagoScreen,
    navigationOptions: () => ({
      title: "Pago"
    })
  }
});

export default HomeScreenStack;
