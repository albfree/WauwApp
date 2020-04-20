import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "../screens/LoginScreen";
import TermsAndConditionsScreen from "../screens/TermsAndConditions";
import { hide } from "expo/build/launch/SplashScreen";

const morado = "#443099";
const blanco = "white";

const LoginStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      header: hide,
    }),
  },
  Terms: {
    screen: TermsAndConditionsScreen,
    navigationOptions: () => ({
      title: "Términos y condiciones de uso",
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

export default LoginStack;
