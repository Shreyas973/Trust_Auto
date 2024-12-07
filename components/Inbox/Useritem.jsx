import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import Colors from '../../constants/Colors'
import { Link } from 'expo-router'

export default function Useritem({userInfo}) {
  return (
    <Link href={'/chat?id='+userInfo.docId} style={{
      paddingTop:15
    }}
    >
    <View style={{
        marginVertical:7,
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center'
    }}>
        <Image source={{uri:userInfo?.imageUrl}}
        style={{
        width:40,
        height:40,
        borderRadius:99
        }}/>

        <Text style={{
            fontFamily:'outfit',
            fontSize:20
        }}>{userInfo?.name}</Text>
      
    </View>
      

    </Link>
  )
}