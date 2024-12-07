import { View, Text, Image,StyleSheet, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Profile(){
  const Menu=[
    {
      id:1,
      name:'Add new Vehicle',
      icon:'add-circle',
      path:'/sell-vehicle'
    },
    {
      id:5,
      name:'My Post',
      icon:'bookmark',
      path:'/../userpost'
    },
    {
      id:2,
      name:'Favorites',
      icon:'heart',
      path:'/(tabs)/favorite'
    },
    {
      id:3,
      name:'Inbox',
      icon:'chatbubble',
      path:'/(tabs)/inbox'
    },
    {
      id:4,
      name:'Logout',
      icon:'exit',
      path:'logout'
    }
  ];
  const {user}=useUser();
  const router=useRouter();
  const {signOut}=useAuth();

  const onPressMenu=(menu)=>{
    if(menu.id===4)
    {
      signOut();
      router.push('/login'); // Redirect to login page after logout
      return ;
    }
    router.push(menu.path)
  }
  return (
    <View style={{
      padding:10,
      marginTop:10
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:38,
        margin:20,
        paddingTop:10
      }}>Profile</Text>

      <View style={{
        display:'flex',
        alignItems:'center',
        marginVertical:0
      }}>
        <Image source={{uri:user?.imageUrl}} style={{
        width:70,
        height:70,
        borderRadius:99
        }}/>
        <Text style={{
          fontFamily:'outfit-bold',
          fontSize:20,
          marginTop:5
        }}>{user?.fullName}</Text>
        <Text style={{
          fontFamily:'outfit',
          fontSize:16,
          color:Colors.GRAY
        }}>{user?.primaryEmailAddress?.emailAddress}</Text>

      </View>

      <FlatList
      data={Menu}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item})=>(
        <TouchableOpacity  onPress={()=>onPressMenu(item)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 15,
          paddingHorizontal: 15,
          marginVertical: 8,
          backgroundColor: 'white', // Menu item background color
          borderRadius: 10, // Smooth corners for the boxes
          shadowColor: '#000', // Subtle shadow effect to create a card-like look
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5, // Adds shadow on Android
        }}>
          <Ionicons name={item.icon} size={30} color={Colors.PRIMARY}
          style={{
            padding:10,
            backgroundColor:Colors.GRAY,
            borderRadius:10
          }} />
          <Text style={{
            fontFamily:'outfit',
            fontSize:20,
            margin:10
          }}>{item.name}</Text>
          </TouchableOpacity>
  )}/>
    </View>
  )
}