import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "../screens/LoginScreen";
import TermsAndConditionsScreen from "../screens/TermsAndConditions";

const LoginStack = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Terms: {
    screen: TermsAndConditionsScreen,
    navigationOptions: () => ({
      title: "Términos y condiciones de uso",
      headerTitleAlign: "center"
    })
  }
});

export default LoginStack;
