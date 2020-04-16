import React, { Component } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { db } from "../population/config.js";
import firebase from "firebase";
import { chatsStyles } from "../styles/chatsStyle";

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      requestID: this.props.navigation.state.params.requestID,
      otherUserID: this.props.navigation.state.params.otherUserID,
    };
  }

  // En el keyboardSpacer se pone un número en función del teléfono

  render() {
    return (
      <SafeAreaView style={chatsStyles.chatsView2}>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.send}
          user={this.props.navigation.state.params}
        />
        <KeyboardSpacer topSpacing={-5000} />
      </SafeAreaView>
    );
  }

  componentDidMount() {
    this.on((message) =>
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }

  componentWillUnmount() {
    this.state.messages = [];
    this.state.requestID = "";
  }

  // Traerse los x últimos mensajes del chat
  on = (callback) =>
    db
      .ref("chats")
      .child(this.state.requestID + "/messages")
      .limitToLast(30)
      .on("child_added", (snapshot) => callback(this.parse(snapshot)));

  // Obtener tiempo actual
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  // Crear mensaje y enviarlo
  send = (messages) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      db.ref("chats/" + this.state.requestID + "/messages")
        .push(message)
        .then(() => {
          db.ref("wauwers")
            .child(this.state.otherUserID)
            .update({ hasMessages: true });
        });
    }
  };

  parse = (snapshot) => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };
}
