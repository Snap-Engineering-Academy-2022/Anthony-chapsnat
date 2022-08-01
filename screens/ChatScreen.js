import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import db from "../firebase";
import firebase from "firebase/app";
import { doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { useAuthentication } from "../utils/hooks/useAuthentication";


export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const { user, userData } = useAuthentication();

    useEffect(() => {
    let unsubscribeFromNewSnapshots = onSnapshot(doc(db, "Chats", "myfirstchat"), (snapshot) => {
      console.log(user, '<----- user', userData, '<----- userData');
      console.log("New Snapshot! ", snapshot.data().messages);
      setMessages(snapshot.data().messages);
    });
  
    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
    };
  }, [user, userData]);

  const onSend = useCallback(async (messages = []) => {
    await updateDoc(doc(db, "Chats", "myfirstchat"), {
      messages: arrayUnion(messages[0])
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        // current "blue bubble" user
        _id: user ? user.uid : '2',
        name: userData ? userData.username : 'Anonymous',
        avatar: userData ? userData.avatar : "https://placeimg.com/140/140/any",
      }}
      inverted={true}
      showUserAvatar={true}
      renderUsernameOnMessage={true}
    />
  );
}