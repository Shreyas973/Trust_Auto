import { View, Text } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../../constants/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor:Colors.PRIMARY
    }}>
        <Tabs.Screen name='home'
        options={{title:'home',
        headerShown:false,
        tabBarIcon:({color})=><FontAwesome name="home" size={24} color={color} />
        }}/>
        <Tabs.Screen name='favorite'
        options={{title:'Favorite',
          headerShown:false,
          tabBarIcon:({color})=><FontAwesome name="heart" size={24} color={color} />
          }}/>
           <Tabs.Screen name='sell'
        options={{title:'Sell',
          headerShown:false,
          tabBarIcon:({color})=><Ionicons name="add-circle-outline" size={34} color={color} />          
        }}/>


        <Tabs.Screen name='inbox'
        options={{title:'Inbox',
          headerShown:false,
          tabBarIcon:({color})=><Entypo name="chat" size={24} color={color} />
          }}/>
        <Tabs.Screen name='profile'
        options={{title:'Profile',
          headerShown:false,
          tabBarIcon:({color})=><MaterialCommunityIcons name="face-man-profile" size={24} color={color} />
          }}/>

    </Tabs>
  )
}