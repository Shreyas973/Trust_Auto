import { View, Text, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import {query, collection, getDocs, where } from 'firebase/firestore'
import { db } from './../../config/FireBaseConfig'
import { useUser } from '@clerk/clerk-expo'
import Useritem from '../../components/Inbox/Useritem';

export default function Inbox() {

  const {user}=useUser();
  const [userList,setUserList]=useState([]);
  const [loader,setLoader]=useState(false);

  useEffect(()=>{
    
    user&&GetUserList();
    
  },[user]);

  const GetUserList=async()=>{
    setLoader(true);
    setUserList([]);
    const q=query(collection(db,'Chat'),
    where('userIds','array-contains',user?.primaryEmailAddress?.emailAddress));
    const querySnaphot=await getDocs(q);

    querySnaphot.forEach(doc=>{
        setUserList(prevList=>[...prevList,doc.data()]);
    });

    setLoader(false);
  };
    //filter the list of other user in one state 

    const MapOtherUserList=()=>{
      const list=[];
      userList.forEach((record)=>{
        const otherUser=record.users?.filter(user=>user?.email!=user?.primaryEmailAddress?.emailAddress);
        if (otherUser && otherUser.length > 0) {
          const result={
          docId:record.id,
          ...otherUser[0],
        };
        list.push(result)
      }
      });
      return list;
    }
  
  return (
    <View style={{
      padding:20,
      marginTop:20
    }}>
      <Text style={{
        fontSize:30
      }}>Inbox</Text>
      <FlatList 
      data={MapOtherUserList()} 
      refreshing={loader}
      onRefresh={GetUserList}
      style={{
        marginTop:20
      }}
      renderItem={({item,index})=>(
        
        <Useritem userInfo={item} key={index}/>
      )}
      />
    </View>
  )
}