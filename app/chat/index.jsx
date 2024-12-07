import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useUser } from '@clerk/clerk-expo';
import { GiftedChat } from 'react-native-gifted-chat';
import { addDoc, collection, onSnapshot,serverTimestamp} from 'firebase/firestore';
import { db } from '../../config/FireBaseConfig';
import { doc,getDoc } from 'firebase/firestore';
import 'react-native-get-random-values';

export default function ChatScreen() {
  const params=useLocalSearchParams();
const navigation=useNavigation();
  const {user}=useUser();

  const [messages,setMessages]=useState([]);

  useEffect(()=>{
    GetUserDetails();

    const unsubscribe = onSnapshot(collection(db,'Chat',params?.id,'Messages'),(snapshot)=>{
      const messageData=snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date() // Ensure createdAt is a JS date
      }))
      setMessages(messageData.sort((a, b) => b.createdAt - a.createdAt)); // Sort messages by time
    });

    return()=>unsubscribe();
  },[]);

  const GetUserDetails=async()=>{
    const docRef=doc(db,'Chat',params?.id);
    const docSnap=await getDoc(docRef);


    const Result=docSnap.data();
    console.log(Result);
    const otherUser=Result?.users.filter(item=>item.email!=user?.primaryEmailAddress?.emailAddress);
    navigation.setOptions({
      headerTitle:otherUser[0]?.name || 'Chat'
    });
  };

   const onSend=async(newMessages=[])=>{
    const messageWithTimestamp = {
      ...newMessages[0],
      createdAt: serverTimestamp(), // Add Firebase server timestamp for accurate time
  };
    setMessages((previousmessage)=>GiftedChat.append(previousmessage,messageWithTimestamp))
    await addDoc(collection(db,'Chat',params.id,'Messages'),messageWithTimestamp);
   };
  return (
    <GiftedChat
    messages={messages}
    onSend={(messages)=>onSend(messages)}
    showUserAvatar={true}
    user={{
      _id:user?.primaryEmailAddress?.emailAddress,
      name:user?.fullName,
      avatar:user?.imageUrl,
    }}
    />
  );
}