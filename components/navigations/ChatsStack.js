import { createStackNavigator } from "react-navigation-stack";
import ChatsScreen from "../screens/Chats";
import ChatScreen from "../chat/Chat";

const ChatsScreenStack = createStackNavigator({
  Chats: {
    screen: ChatsScreen,
    navigationOptions: () => ({
      title: "Conversaciones",
      headerTitleAlign: "center"
    })
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: () => ({
      title: "Chat",
      headerTitleAlign: "center"
    })
  }
});

export default ChatsScreenStack;
