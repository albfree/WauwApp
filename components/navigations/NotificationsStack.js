import { createStackNavigator } from "react-navigation-stack";
import NotificationsScreen from "../screens/Notifications";

const morado = "#443099";
const blanco = "white";

const NotificationsScreenStack = createStackNavigator({
  Notifications: {
    screen: NotificationsScreen,
    navigationOptions: () => ({
      title: "Notificaciones",
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

export default NotificationsScreenStack;
