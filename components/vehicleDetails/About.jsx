import { View, Text, Pressable ,Image} from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors'
import Ownerinfo from './Ownerinfo'
export default function About({Vehicles}) {
    const [readMore,setReadMore]=useState(true)
  return (
    <View style={{
        padding:20,
        paddingTop:0

    }}>
      <Text style={{
        fontSize:20,
        fontFamily:'outfit',
        paddingBottom:10
      }}>Description</Text>

      <Text  numberOfLines={readMore?3:50} style={{
        fontSize:18,
        fontFamily:'outfit-medium',
        color:Colors.GRAY
      }}
      >{Vehicles?.Description}</Text>
       {readMore&&
       <Pressable onPress={()=>setReadMore(false)}>
        <Text style={{fontSize
        :14,
        color:Colors.BLUE
       }}>Read More</Text></Pressable>} 

  </View>
  )
}