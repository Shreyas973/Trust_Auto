import { View, Text, Pressable, Alert,ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { db } from '../../config/FireBaseConfig'
import { useUser } from '@clerk/clerk-expo';
import { deleteDoc, doc, getDocs,where,collection } from 'firebase/firestore';
import { FlatList } from 'react-native';
import VehicleListitem from '../../components/Home/VehicleListitem'
import Colors from '../../constants/Colors';
import { query } from 'firebase/database';

export default function UserPost() {
    const navigation=useNavigation();
    const {user}=useUser();
    const [userPostList,setUserPostList]=useState([]);
    const [loader,setLoader]=useState(true);
    useEffect(()=>{
        navigation.setOptions({
            headerTitle:'User Post'
        })
        user&&GetUserPost();
    },[user]);

    const GetUserPost=async()=>{
        setLoader(true);
        const q=query(collection(db,'Vehicles'),where('email','==',user?.primaryEmailAddress?.emailAddress));
        const querySnapshot=await getDocs(q);

        const posts = [];
        querySnapshot.forEach((doc)=>{
          posts.push({ id: doc.id, ...doc.data() });
        })
        setUserPostList(posts);
        setLoader(false);
    }

    
  const onRefresh = () => {
    GetUserPost();
  };

    const onDeletePost=(docId)=>{
        Alert.alert('Do you want to Delete?','Do you really want to delete this post',[
        {
        text:'Cancel',
        style:'cancel'
        },
        {
        text:'Delete',
        onPress:()=>deletePost(docId),
        }
    ]);
    };

     const deletePost=async(docId)=>{
        await deleteDoc(doc(db,'Vehicles',docId))
        GetUserPost();
    }
  return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30
      }}>UserPost</Text>

{loader ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY} style={{ marginTop: 20,
          alignSelf: 'center'}}/>
      ) : userPostList.length === 0 ? (
        <Text style={{fontSize: 18,
          textAlign: 'center',
          color: 'white',
          marginTop: 20}}>No Post Found</Text>
      ) : (
      <FlatList
      data={userPostList}
      numColumns={userPostList.length === 1 ? 1 : 2}
      refreshing={loader}
      onRefresh={onRefresh}
      keyExtractor={(item) => item.id}
      renderItem={({item,index})=>(
        <View>
        <VehicleListitem  Vehicles={item} key={index}/>
        <Pressable onPress={()=>onDeletePost(item?.id)} 
        style={{
            backgroundColor:Colors.PRIMARY,
            padding:5,
            borderRadius:7,
            marginTop:5,
            marginRight:10
        }}>
            <Text style={{
                fontFamily:'outfit',
                textAlign:'center'
            }}>Delete</Text>
        </Pressable>
        </View>
      )}

      />
    )}
    </View>
  );
}
