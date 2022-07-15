import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import RandomImage from './assets/unsplash.jpg';
import db from "./firebase";
import { collection, getDocs, setDoc, doc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';

export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let unsubscribeFromNewSnapshots = onSnapshot(doc(db, "Chats", "myfirstchat"), (snapshot) => {
      console.log("New Snapshot! ", snapshot.data().messages);
      setMessages(snapshot.data().messages);
    });
  
    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
    };
  }, []);

  const onSend = useCallback(async (messages = []) => {
    await updateDoc(doc(db, "Chats", "myfirstchat"), {
      messages: arrayUnion(messages[0])
    });
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
}, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <GiftedChat
        showUserAvatar={true}
        renderUsernameOnMessage={true}
        alwaysShowSend={true}
        messages={messages}
        onSend={messages => onSend(messages)}
        placeholder="Press enter or send"
        user={{
          _id: "1",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

