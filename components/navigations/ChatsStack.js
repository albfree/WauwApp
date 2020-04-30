import { createStackNavigator } from "react-navigation-stack";
import ChatsScreen from "../screens/Chats";
import ChatScreen from "../chat/Chat";

const morado = "#443099";
const blanco = "white";

const ChatsScreenStack = createStackNavigator(
  {
    Chats: {
      screen: ChatsScreen,
      navigationOptions: () => ({
        title: "Conversaciones",
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
    Chat: {
      screen: ChatScreen,
      navigationOptions: () => ({
        title: "Chat",
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
    initialRouteName: "Chats",
  }
);

export default ChatsScreenStack;
