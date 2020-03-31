import React, { useState } from "react";
import { View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import Modal from "./Modal";
import ChangeNameForm from "./ChangeNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangeDescriptionForm from "./ChangeDescriptionForm";
import { globalStyles } from "../styles/global";

export default function AccountOptions(props) {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const { userInfo, setReloadData } = props;

  const menuOptions = [
    {
      title: "Cambiar nombre",
      iconType: "material-community",
      iconNameLeft: "rename-box",
      iconColorLeft: "#443099",
      iconNameRight: "chevron-right",
      iconColorRight: "#443099",
      onPress: () => selectedComponent("name")
    },
    {
      title: "Cambiar descripción",
      iconType: "material-community",
      iconNameLeft: "lead-pencil",
      iconColorLeft: "#443099",
      iconNameRight: "chevron-right",
      iconColorRight: "#443099",
      onPress: () => selectedComponent("description")
    }
  ];

  const selectedComponent = form => {
    switch (form) {
      case "name":
        setRenderComponent(
          <ChangeNameForm
            id={userInfo.id}
            name={userInfo.name}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
          />
        );
        setIsVisibleModal(true);
        break;
      case "description":
        setRenderComponent(
          <ChangeDescriptionForm
            id={userInfo.id}
            desc={userInfo.description}
            setIsVisibleModal={setIsVisibleModal}
            setReloadData={setReloadData}
          />
        );
        setIsVisibleModal(true);
        break;
      default:
        break;
    }
    setIsVisibleModal(true);
  };

  return (
    <View style={globalStyles.accountItems}>
      {menuOptions.map((menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight
          }}
          onPress={menu.onPress}
          containerStyle={globalStyles.accountItem}
        />
      ))}

      {renderComponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}
