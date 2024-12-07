import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import SellVehicle from '../sell-vehicle'
import { TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import { db } from '../../config/FireBaseConfig'

export default function Sell() {
  return (
    <View >
      <Text style={{
        paddingTop:50,
        paddingHorizontal:20,
        fontFamily:'outfit-bold',
        fontSize:30,
        color:'#d8594f',
        margin:10
      }}>
        Category
      </Text>
      <View style={{  
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      paddingTop:250,
      alignContent:'space-between',
      margin:10
    }}
      >
        <Link href={'/sell-vehicle'}
        style={{
          width:"50%",
          height:50,
          borderWidth:1,
          backgroundColor:Colors.BLUE,
          paddingTop:16,
          paddingLeft:40,
          borderRadius:20
        }}>
          <Text style={{
            fontFamily:'outfit-bold'
          }}>Sell Your Vehicle</Text>
        </Link>
      </View>
    </View>
  )
}